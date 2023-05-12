/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { ReactSVG } from 'react-svg';

import { useProgressStore, useClickCounterStore } from '../Store';

import styled from '@emotion/styled';

export type DiffSvgProps = {
  id: string,
  srcPath: string,
  paintingName: string,
  isComplete?: boolean
}

export const DiffSvg: React.FC<DiffSvgProps> = ({id, srcPath, paintingName, isComplete}) => {
  const {paintings, clickDifference} = useProgressStore();
  const paintingDiffs = paintings[paintingName].differenceIds ? paintings[paintingName].differenceIds : {};

  const styleCallback = (svg: SVGElement) => {
    const newStyle = `
      opacity: 30%;
    `;

    Object.keys(paintingDiffs).forEach((diffId) => {
      const suitablePaths = svg.getElementsByClassName(diffId);
      for (let i = 0; i < suitablePaths.length; i++) {
        const clickedPath = suitablePaths[i];

        clickedPath.setAttribute('style', newStyle);
        clickedPath.setAttribute('stroke', 'white')
        clickedPath.setAttribute('stroke-width', '2')
      }
    })
  }

  const correctClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    const target = e?.target;
    if(!target || !(target instanceof SVGPathElement)){
      return;
    }
    
    const classList = target.classList;
    if (classList == undefined) {
      return;
    }

    //If the target is not a DiffPath then stop
    if (!classList.contains('DiffPath')) {
      return;
    }

    const pathClassName = target.className.baseVal;

    clickDifference(paintingName, pathClassName);
  }

  const {increment} = useClickCounterStore();

  //(dev) Currently unused - was going to keep track of number of clicks as a 'score'
  const countClick = () => {
    increment();
  }

  function combineClickHandlers(e: React.MouseEvent) {
    countClick();

    if(!isComplete){
      correctClickHandler(e);
    }
  }

//   //(dev) Not sure how to deal with this type error
  const StyledReactSVG = styled(ReactSVG as any)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;

  .DiffPath{
    opacity: 0%;
    transition: opacity 0.5s;
    !(dev) Enable this filter if you want to change color.... filter: invert(94%) sepia(22%) saturate(300%) hue-rotate(3deg) brightness(95%) contrast(86%);
  }`


  return (
    <StyledReactSVG
      id={id}
      stroke='yellow'
      className='DiffSvg'
      src={srcPath}
      onClick={combineClickHandlers}
      beforeInjection={styleCallback}
    />
  );
}


