
import React, { useEffect, useState } from 'react'
import PaintingPanel, {PaintingPanelProps, PaintingPosition} from './components/PaintingPanel/PaintingPanel';
import {Counters} from './components/SidePanel/Counters/Counters';
import {SidePanel} from './components/SidePanel/SidePanel';

import { usePaintingNameStore, useKnowsZoomStore} from '../../state-management/Store';
import paintingsLibrary from '../../resources/paintingsLibrary';
import { EuiCallOut, EuiFlexGroup, useEuiTheme } from '@elastic/eui';
import { css } from '@emotion/react';

const Home: React.FC = () => {
  const {knowsZoom, setKnowsZoom} = useKnowsZoomStore();

  const { euiTheme } = useEuiTheme();
  const [paintingPosition, setPaintingPosition] = useState<PaintingPosition>({
    zoomRatio: 1,
    xFraction: 0,
    yFraction: 0
  })
  const {paintingName, setPaintingName} = usePaintingNameStore();

  const zoomPainting = (e: React.WheelEvent<HTMLSpanElement>): void =>{
    const minZoomRatio = 1.0;
    const maxZoomRatio = 2.4;

    if (!knowsZoom) {
      setKnowsZoom(true);
    }
    
    const newPaintingPosition = {...paintingPosition}

    const nextZoomRatio = newPaintingPosition.zoomRatio + -e.deltaY/1000;

    newPaintingPosition.zoomRatio = Math.min(Math.max(nextZoomRatio, minZoomRatio), maxZoomRatio)

    setPaintingPosition(newPaintingPosition)
  }

  function createFollowMouseOnPainting(panelId: string) {
    return (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      const newPaintingPosition = {...paintingPosition}

      //Containing panel element
      const paintingPanel = document.getElementById(panelId+'-painting');

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

  //Effectively means that the mouse stops having an effect near the border (higher value means this regions grows)
  const xRange = 1.50;
  const yRange = 1.50;

  const constrain = (value: number): number => {
    return Math.min(Math.max(value, 0), 1);
  }

  const xNormalized = constrain(0.5 + xRange*(paintingPosition.xFraction - 0.5));
  const yNormalized = constrain(0.5 + yRange*(paintingPosition.yFraction - 0.5));

  //Translate the position of the mouse to a tranasform value for the painting (linear interpolation)
  const xTransform = 100*((0.5 - xNormalized) * (1-(1/paintingPosition.zoomRatio)));
  const yTransform = 100*((0.5 - yNormalized) * (1-(1/paintingPosition.zoomRatio)));

  const paintingImgStyle: React.CSSProperties = {
    transform: `scale(${paintingPosition.zoomRatio}) translateX(${xTransform}%) translateY(${yTransform}%)`,
  }

  const endGameMaskStyling: React.CSSProperties = {
    width: `${paintingPosition.xFraction*100}%`,
  }

  //In case we somehow have a undefined painting name we go back to the default
  if (paintingsLibrary[paintingName] == undefined){
    setPaintingName('sunday-afternoon');
  }

  //Here we use aspect ratios to determine whether we should display the paintings vertically or horizontally
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

  //Assemble the panels
  const panelOneProps: PaintingPanelProps = {
    isDiff: false,
    isVertical,
    paintingImgStyle,
    zoomPainting,
    createFollowMouseOnPainting,
    endGameMaskStyling
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
      {!knowsZoom && <EuiCallOut
        size="s"
        title="Scroll to zoom in."
        iconType="magnifyWithExclamation"
        style={{
          position: "absolute",
          bottom: euiTheme.size.xs,
          transform: "translateX(-50%)",
          zIndex: 100,
        }}
      />}
    </>
  )
}

export default Home
