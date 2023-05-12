
import React, { useEffect, useState } from 'react'
import PaintingPanel, {PaintingPanelProps, PaintingPosition} from './PaintingPanel';
import {Counters} from './Counters/Counters';
import {SidePanel} from './SidePanel';

import { usePaintingNameStore} from './Store';
import paintingsLibrary from '../resources/paintingsLibrary';
import { EuiFlexGroup, useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

const App: React.FC = () => {
  const { euiTheme } = useEuiTheme();
  const [paintingPosition, setPaintingPosition] = useState<PaintingPosition>({
    zoomRatio: 1,
    xFraction: 0,
    yFraction: 0
  })
  const {paintingName} = usePaintingNameStore();

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

  const paintingAspectRatio = paintingsLibrary[paintingName].aspectRatio;
  const [windowAspectRatio, setWindowAspectRatio] = useState(window.innerWidth / window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowAspectRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect only runs once on mount and unmount



  const calulateIsVertical = (paintingAspectRatio: number, windowAspectRatio: number): boolean => {
    return paintingAspectRatio > windowAspectRatio;
  }

  const isVertical = calulateIsVertical(paintingAspectRatio, windowAspectRatio);

  const panelOneProps: PaintingPanelProps = {
    isDiff: false,
    isVertical,
    paintingImgStyle,
    zoomPainting,
    createFollowMouseOnPainting
  }

  const panelTwoProps: PaintingPanelProps = {
    isDiff: true,
    isVertical,
    paintingImgStyle,
    zoomPainting,
    createFollowMouseOnPainting
  }

  const panelOne = <PaintingPanel {...panelOneProps} />
  const panelTwo = <PaintingPanel {...panelTwoProps} />

  const counters = <Counters isVertical={isVertical}/>

  return (
    <>
      <EuiFlexGroup
        id='main-container'
        justifyContent='center'
        alignItems='center'
        css={css({
          background: euiTheme.colors.lightestShade,
          position: "absolute",
          transform: "translate(-50%, -50%)",
          height: "100%",
          width: "100%",
        })}
      >
        <EuiFlexGroup 
          id='panel-container'
          direction={isVertical ? 'column' : 'row'}
          justifyContent='spaceAround'
          alignItems='center'
          css={css({
            width: "100%",
            height: "100%"
          })}
          >
          {panelOne}
          {panelTwo}
        </EuiFlexGroup>
      </EuiFlexGroup>
      {counters}
      <SidePanel/>
    </>
  )
}

export default App
