
import React, { useState } from 'react'
import PaintingPanel, {PaintingPanelProps, PaintingPosition} from './PaintingPanel';
import {Counters} from './Counters';
import {SidePanel} from './SidePanel';
import { EuiCollapsibleNavGroup, EuiPinnableListGroup} from '@elastic/eui';

import { useEuiTheme } from '@elastic/eui';

const App: React.FC = () => {

  const { euiTheme } = useEuiTheme();

  const [paintingPosition, setPaintingPosition] = useState<PaintingPosition>({
    zoomRatio: 1,
    xFraction: 0,
    yFraction: 0
  })

  const paintingName = 'sunday-afternoon';

  const zoomPainting = (e: React.WheelEvent<HTMLSpanElement>): void =>{
    const minZoomRatio = 1.0;
    const maxZoomRatio = 2.4;
    
    const newPaintingPosition = {...paintingPosition}

    const nextZoomRatio = newPaintingPosition.zoomRatio + -e.deltaY/1000;

    newPaintingPosition.zoomRatio = Math.min(Math.max(nextZoomRatio, minZoomRatio), maxZoomRatio)

    setPaintingPosition(newPaintingPosition)
  }

  function createFollowMouseOnPainting(panelId: string) {
    return (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      const newPaintingPosition = {...paintingPosition}

      //Containing panel element
      const paintingPanel = document.getElementById(panelId);

      if (!paintingPanel) {
        return;
      }

      const rect = paintingPanel.getBoundingClientRect();

      //Panel element dimensions (un-zoomed painting dimensions)
      const targetWidth = paintingPanel.clientWidth;
      const targetHeight = paintingPanel.clientHeight;

      newPaintingPosition.xFraction = (e.clientX - rect.left)/targetWidth
      newPaintingPosition.yFraction = (e.clientY - rect.top)/targetHeight

      setPaintingPosition(newPaintingPosition)
    }
  }

  //Translate the position of the mouse to a tranasform value for the painting (linear interpolation)
  const xTransform = 100*((0.5 - paintingPosition.xFraction) * (1-(1/paintingPosition.zoomRatio)));
  const yTransform = 100*((0.5 - paintingPosition.yFraction) * (1-(1/paintingPosition.zoomRatio)));

  const paintingImgStyle: React.CSSProperties = {
    transform: `scale(${paintingPosition.zoomRatio}) translateX(${xTransform}%) translateY(${yTransform}%)`,
  }

  const panelOneProps: PaintingPanelProps = {
    paintingName: paintingName,
    isDiff: false,
    paintingImgStyle,
    zoomPainting,
    createFollowMouseOnPainting
  }

  const panelTwoProps: PaintingPanelProps = {
    paintingName: paintingName,
    isDiff: true,
    paintingImgStyle,
    zoomPainting,
    createFollowMouseOnPainting
  }

  const panelOne = <PaintingPanel {...panelOneProps} />
  const panelTwo = <PaintingPanel {...panelTwoProps} />

  const counters = <Counters {...{paintingName}} />


  return (
    <>
      <div 
        id='panel-container'
        css={{
          background: euiTheme.colors.lightShade,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        >
        {panelOne}
        {panelTwo}
      </div>
      {counters}
      {/* <SidePanel/> */}
      <EuiCollapsibleNavGroup
        title="Kibana"
        iconType="logoKibana"
        isCollapsible={true}
        initialIsOpen={true}
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 9999,
          left: 0,
        }}
        >
        <EuiPinnableListGroup
          aria-label="Kibana"
          listItems={[
            { label: 'Discover' },
            { label: 'Visualize' }
          ]}
          onPinClick={() => {}}
          maxWidth="none"
          color="subdued"
          gutterSize="none"
          size="s"
        />
      </EuiCollapsibleNavGroup>
    </>
  )
}

export default App
