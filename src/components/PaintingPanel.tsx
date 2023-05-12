import React, {useState} from 'react'

import { DiffSvg } from './DiffSvg';
import { usePaintingNameStore, useProgressStore } from './Store';
import { EuiIcon, EuiPanel, EuiText, useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';
import paintingsLibrary from '../resources/paintingsLibrary'; 

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
  const diffPaintingPath = `paintings/${paintingName}/${paintingName}-diff.png`;
  const normalPaintingPath = `paintings/${paintingName}/${paintingName}.png`;
  const paintingPath = isDiff ? diffPaintingPath : normalPaintingPath;

  const diffsPath = `./diff-svgs/`;



  const followMouseOnPainting = createFollowMouseOnPainting(panelId);


  //Handle what happens when the painting is complete
  //The panels appear to merge, main panel becomes toggleable between the 'diff' and ordinary view

  // const isComplete = paintings[paintingName].isComplete;
  const isComplete = false;

  const diffSvg = <DiffSvg 
  key={paintingName + 'diffSvg' + '-' +  panelId}
  id={paintingName + 'diffSvg' + '-' +  panelId} 
  srcPath={diffsPath  + 'diff-' + paintingName + '.svg'} 
  paintingName={paintingName}
  isComplete={isComplete}
/>


  const midPercent = 25;
  
  //function of midpoint
  const transfromPercent = isDiff ? `-${100-midPercent}%` : `${midPercent}%`; 
  const transformPainting = isComplete ? `translate${isVertical ? 'Y':'X'}(${transfromPercent})` : ''

  const [endPaintingVisible, setEndPaintingVisible] = useState(true);

  const togglePaintingVisible = () => {
    if (isComplete && !isDiff) {
      setEndPaintingVisible(!endPaintingVisible);
    }
  }

  const paintingInfo = paintingsLibrary[paintingName];
  const paintingText = [ 
  <h4 key={'painting-info-name'}>
    {paintingInfo.name}
  </h4>,

  <h5 key={'painting-info-artist'}>
    {paintingInfo.artist + ' (' + paintingInfo.year + ')'}
  </h5>,

  <p key={'painting-description'}>
    {paintingInfo.description}
  </p>,

  <h5 key={'painting-info-time'}>
    <EuiIcon type='clock'/> Time taken: {useProgressStore.getState().paintings[paintingName].timeSpent_seconds}
  </h5>,
]

  // (dev) could potentially remake this using Eui components
  return (
    <span 
      className='PaintingPanel' 
      id={panelId} 
      onWheel={zoomPainting} 
      onMouseMove={followMouseOnPainting}
      onClick={togglePaintingVisible}
      css ={{
        height: "auto",
        maxHeight: "95%",
        width: "auto",
        background: euiTheme.colors.darkShade,
        // overflow: "hidden",
        userSelect: "none",
        border: euiTheme.border.thick,
        borderColor: euiTheme.colors.mediumShade,

        transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
        transform: transformPainting,
        opacity: isDiff && isComplete ? '0%' : '100%',
        //Critical css for the end of the game
        zIndex: isDiff && isComplete ? '0' : '1'
    }}>
      <div
        css={css({
          overflow: "hidden",
        })
        }
      >
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
            //Only active at the end of the game
          />
          {diffSvg}
          
          {!isDiff && isComplete && <img 
            className = 'PaintingImg'
            src={diffPaintingPath}
            css={
            isVertical ? {
              position: "absolute",
              top: "0%",
              display: "block",
              maxHeight: "47.5vh",
              opacity: endPaintingVisible ? '0%' : '100%',
              transition: "opacity 0.5s ease-in-out",
            } : {
              position: "absolute",
              top: "0%",
              display: "block",
              maxWidth: "47.5vw",
              opacity: endPaintingVisible ? '0%' : '100%',
              transition: "opacity 0.5s ease-in-out",
            }}
          />}
        </div>
      </div>

      {!isDiff && isComplete && <EuiPanel
          css={isVertical ? 
            css({
              position: "absolute",
              bottom: '-'+euiTheme.size.m,
              transform: "translateY(100%)",
              width: "100%",
              height: "auto",
  
            }) :
            css({
            position: "absolute",
            top: "50%",
            right: '-'+euiTheme.size.m,
            transform: "translateX(100%) translateY(-50%)",
            width: "clamp(15vw, 40rem, 30vw)",
            height: "auto",

            display: "flex",
            alignItems: "center",
          }) 
        }
        >
          <EuiText
            size= 'm'
            color='subdued'
          >
            {paintingText}
          </EuiText>
        </EuiPanel>}
    </span>
  )
}
export default PaintingPanel;

