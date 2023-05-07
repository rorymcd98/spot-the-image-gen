import React from 'react'
import { useProgressStore, useClickCounter } from './Store'
import './Counters.css'

type CountersProps = {
  paintingName: string
}

export const  Counters: React.FC<CountersProps> = ({paintingName}) => {
  const numDiffsClicked = getDiffClicks(paintingName);
  const totalNumDiffs = getTotalNumDiffs();
  const totalClicks = getTotalClicks();
  
  return (
    <div className='Counters'>
      <div className='correctCounter'> Score {numDiffsClicked} / {totalNumDiffs} </div>
      <div className='totalCounter'> Clicks {totalClicks} </div>
    </div>
  )
}

const getDiffClicks = (paintingName: string): number => {
  const {paintings} = useProgressStore();

  const paintingDiffs = paintings[paintingName] ? paintings[paintingName] : {};

  const numDiffsClicked = Object.keys(paintingDiffs).length;

  return numDiffsClicked;
}

const getTotalNumDiffs = (): number => {
  const firstDiffSvg = document.getElementsByClassName('DiffSvg');
  
  if(firstDiffSvg.length === 0){
    return 0;
  }

  const firstDiffSvgElement = firstDiffSvg[0];

  const diffPaths = firstDiffSvgElement.getElementsByClassName('DiffPath');

  const numTotal = diffPaths.length;

  return numTotal;
}

const getTotalClicks = (): number => {
  const {clicks} = useClickCounter();
  return clicks;
}