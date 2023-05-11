/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { ReactSVG } from 'react-svg';

import { useProgressStore, useClickCounterStore } from './Store';

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
    const newStyle = "filter: invert(48%);";

    Object.keys(paintingDiffs).forEach((diffId) => {
      const suitableChildren = svg.getElementsByClassName(diffId);
      for (let i = 0; i < suitableChildren.length; i++) {
        const child = suitableChildren[i];
        child.setAttribute('style', newStyle);
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

  //(dev) Currently unused
  const countClick = () => {
    increment();
  }

  function combineClickHandlers(e: React.MouseEvent) {
    countClick();
    if(!isComplete){
      correctClickHandler(e);

    }
  }

  //(dev) Not sure how to deal with this type error
  const StyledReactSVG = styled(ReactSVG as any)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;

  .DiffPath {
    opacity: 50% !important;
  }
`;

  return (
    <StyledReactSVG
      id={id}
      className='DiffSvg'
      src={srcPath}
      onClick={combineClickHandlers}
      beforeInjection={styleCallback}
    />
  );
}


