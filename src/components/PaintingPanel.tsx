import React from 'react'
import './PaintingPanel.css'
import shape1 from '../assets/paintings/test/shape_0.svg'
import shape2 from '../assets/paintings/test/shape_1.svg'
import shape3 from '../assets/paintings/test/shape_2.svg'

import { useProgressStore } from './Store';

export type PaintingPosition = {
  zoomRatio: number;
  xFraction: number;
  yFraction: number;
}

export type PaintingPanelProps = {
  paintingName: string,
  isDiff: boolean,
  paintingImgStyle: React.CSSProperties,
}

const PaintingPanel: React.FC<PaintingPanelProps> = ({paintingName, isDiff, paintingImgStyle, zoomPainting, createFollowMouseOnPainting}) => {

  const paintingId = isDiff ? 'panel-2' : 'panel-1';
  const paintingPath = `paintings/${paintingName}/${paintingName}${isDiff ? '-diff' : ''}.png`;

  const followMouseOnPainting = createFollowMouseOnPainting(paintingId);

  return (
    <span className='PaintingPanel' id={paintingId} onWheel={zoomPainting} onMouseMove={followMouseOnPainting}>
      <div className='PaintingImgContainer' style={paintingImgStyle}>
        <img className = 'PaintingImg' src={paintingPath} />
        <img className={'shape'} src={shape1}/>
        <img className={'shape'} src={shape2}/>
        <img className={'shape'} src={shape3}/>
      </div>
    </span>
  )
}
export default PaintingPanel;