import React from 'react'
import './PaintingPanel.css'
import { DiffSvg } from './DiffSvg';
import { useClickCounter } from './Store';

export type PaintingPosition = {
  zoomRatio: number;
  xFraction: number;
  yFraction: number;
}

export type PaintingPanelProps = {
  paintingName: string,
  isDiff: boolean,
  paintingImgStyle: React.CSSProperties,
  zoomPainting: (e: React.WheelEvent<HTMLSpanElement>) => void,
  createFollowMouseOnPainting: (panelId: string) => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
}

const PaintingPanel: React.FC<PaintingPanelProps> = ({paintingName, isDiff, paintingImgStyle, zoomPainting, createFollowMouseOnPainting}) => {

  const panelId = isDiff ? 'panel-2' : 'panel-1';
  const paintingPath = `paintings/${paintingName}/${paintingName}${isDiff ? '-diff' : ''}.png`;

  const diffsPath = `./diff-svgs/`;

  const diffSvg = <DiffSvg 
    key={paintingName + 'diffSvg' + '-' +  panelId}
    id={paintingName + 'diffSvg' + '-' +  panelId} 
    srcPath={diffsPath  + 'diff-' + paintingName + '.svg'} 
    paintingName={paintingName}
  />

  const followMouseOnPainting = createFollowMouseOnPainting(panelId);

  return (
    <span className='PaintingPanel' id={panelId} onWheel={zoomPainting} onMouseMove={followMouseOnPainting}>
      <div className='PaintingImgContainer' style={paintingImgStyle}>
        <img className = 'PaintingImg' src={paintingPath} />
        {diffSvg}
      </div>
    </span>
  )
}
export default PaintingPanel;

