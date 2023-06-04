/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { ReactSVG } from 'react-svg';

import { useProgressStore } from '../../../../state-management/Store';

import styled from '@emotion/styled';

export type DiffSvgProps = {
  id: string;
  srcPath: string;
  paintingName: string;
  isComplete: boolean;
};

export const DiffSvg: React.FC<DiffSvgProps> = ({
  id,
  srcPath,
  paintingName,
  isComplete,
}) => {
  const { paintings, clickDifference } = useProgressStore();
  const paintingDiffs = paintings[paintingName].differenceIds
    ? paintings[paintingName].differenceIds
    : {};

  const styleCallback = (svg: SVGElement) => {
    const newStyle = `
      opacity: 30%;
    `;

    Object.keys(paintingDiffs).forEach((diffId) => {
      const suitablePaths = svg.getElementsByClassName(diffId);
      for (let i = 0; i < suitablePaths.length; i++) {
        const clickedPath = suitablePaths[i];

        clickedPath.setAttribute('style', newStyle);
        clickedPath.setAttribute('stroke', 'white');
        clickedPath.setAttribute('stroke-width', '2');
      }
    });
  };

  const correctClickHandler = (e: React.MouseEvent) => {
    if (isComplete) {
      return;
    }
    e.stopPropagation();

    const target = e?.target;
    if (!target || !(target instanceof SVGPathElement)) {
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
  };

  type ReactSvgProps = {
    id: string;
    stroke: string;
    className: string;
    src: string;
    onMouseDown: (e: React.MouseEvent) => void;
    beforeInjection: (svg: SVGElement) => void;
  };

  const ReactSVGWrapper = (props: ReactSvgProps) => {
    return <ReactSVG {...props} />;
  };

  //(dev) Not sure how to deal with this type error
  const StyledReactSVG = styled(ReactSVGWrapper)`
    position: absolute;
    width: 100%;
    top: 0px;
    ${isComplete ? 'opacity: 0%;' : ''}

    .DiffPath{
      opacity: 0%;
      transition: opacity 0.5s;
      !(dev) Enable this filter if you want to change color.... filter: invert(94%) sepia(22%) saturate(300%) hue-rotate(3deg) brightness(95%) contrast(86%);
    }`;

  return (
    <StyledReactSVG
      id={id}
      stroke="yellow"
      className="DiffSvg"
      src={srcPath}
      onMouseDown={correctClickHandler}
      beforeInjection={styleCallback}
    />
  );
};
