import * as React from 'react';
import { ReactSVG } from 'react-svg';
import './DiffSvg.css';
import { useProgressStore, useClickCounter } from './Store';


export type DiffSvgProps = {
  id: string,
  srcPath: string,
  paintingName: string
}

export const DiffSvg: React.FC<DiffSvgProps> = ({id, srcPath, paintingName}) => {
  const {paintings, clickDifference} = useProgressStore();
  const paintingDiffs = paintings[paintingName] ? paintings[paintingName] : {};

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

  const {clicks, increment} = useClickCounter();

  const countClick = () => {
    console.log('here')
    increment();
  }

  function combineClickHandlers(e: React.MouseEvent) {
    countClick();
    correctClickHandler(e);
  }

  return (
    <ReactSVG
      id={id}
      className='DiffSvg'
      src={srcPath}
      onClick={combineClickHandlers}
      beforeInjection={styleCallback}
    />
  );
}


