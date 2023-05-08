import React from 'react'

import { DiffSvg } from './DiffSvg';
// import { useClickCounter } from './Store';

import { useEuiTheme } from '@elastic/eui';

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

  const {euiTheme} = useEuiTheme();

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
        userSelect: "none"
    }}>
      <div 
        className='PaintingImgContainer'
        style={paintingImgStyle}
        css={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "100%",
          border: euiTheme.border.thin,
        }}>
        <img 
          className = 'PaintingImg'
          src={paintingPath}
          css={{
            width: "auto",
            height: "auto",
          
            display: "block",
            maxWidth: "47.5vw",
          }}
        />
        {diffSvg}
      </div>
    </span>
  )
}
export default PaintingPanel;

