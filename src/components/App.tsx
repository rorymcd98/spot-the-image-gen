// import { useState } from 'react'
import React, { useState } from 'react'
import './App.css'
import PaintingPanel, {PaintingPanelProps, PaintingPosition} from './PaintingPanel';


const App: React.FC = () => {

  const [paintingPosition, setPaintingPosition] = useState<PaintingPosition>({
    zoomRatio: 1,
    xFraction: 0,
    yFraction: 0
  })

  const paintingName = 'test';

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



  return (
    <>
    <div id='panel-container'>
      {panelOne}
      {panelTwo}
    </div>
    </>
  )
}

export default App
