import React from 'react'

import { DiffSvg } from './DiffSvg';
import { usePaintingNameStore, useProgressStore } from './Store';

import { useEuiTheme } from '@elastic/eui';


export type PaintingPosition = {
  zoomRatio: number;
  xFraction: number;
  yFraction: number;
}

export type PaintingPanelProps = {
  isDiff: boolean,
  isVertical: boolean,
  paintingImgStyle: React.CSSProperties,
  zoomPainting: (e: React.WheelEvent<HTMLSpanElement>) => void,
  createFollowMouseOnPainting: (panelId: string) => (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void,
}

const PaintingPanel: React.FC<PaintingPanelProps> = ({isDiff, isVertical, paintingImgStyle, zoomPainting, createFollowMouseOnPainting}) => {
  const {paintingName} = usePaintingNameStore();
  const {euiTheme} = useEuiTheme();

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

  // const isComplete = paintings[paintingName].isComplete;

  const isComplete = false;

  // (dev) could potentially remake this using Eui components
  return (
    <span 
      className='PaintingPanel' 
      id={panelId} 
      onWheel={zoomPainting} 
      onMouseMove={followMouseOnPainting}
      css ={{
        height: "auto",
        maxHeight: "95%",
        width: "auto",
        background: euiTheme.colors.darkShade,
        overflow: "hidden",
        userSelect: "none",
        border: euiTheme.border.thick,
        borderColor: euiTheme.colors.mediumShade,

        transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
        transform: isComplete ? `translate${isVertical ? 'Y':'X'}(${isDiff ? '-' : ''}53%)` : '',
        opacity: isDiff && isComplete ? '0%' : '100%'
    }}>
      <div 
        className='PaintingImgContainer'
        style={paintingImgStyle}>
        <img 
          className = 'PaintingImg'
          src={paintingPath}
          css={isVertical ? {
          
            display: "block",
            maxHeight: "47.5vh",
          } : {
            display: "block",
            maxWidth: "47.5vw"
          }}
        />
        {diffSvg}
      </div>
    </span>
  )
}
export default PaintingPanel;

