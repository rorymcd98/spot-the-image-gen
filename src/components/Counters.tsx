import React from 'react'
import { useProgressStore, useClickCounter } from './Store'
import { EuiIcon, EuiText} from "@elastic/eui";

type PaintingsJson = {
  [key: string]: any;
};
import paintingsJsonUntyped from '../resources/paintings.json';

const paintingsJson: PaintingsJson = paintingsJsonUntyped;

type CountersProps = {
  paintingName: string
}

export const  Counters: React.FC<CountersProps> = ({paintingName}) => {
  const numDiffsClicked = getDiffClicks(paintingName);
  const totalNumDiffs = getTotalNumDiffs(paintingName);
  const totalClicks = getTotalClicks();

  return (
      <div className='Counters'
        css={
          {
            position: "absolute",
            display: "inline-flex",
            flexDirection: "column",
            textAlign: "justify",
            top: "0px",
            right: "0px",
            width: "auto",
            paddingInline: "1rem",
          }
        }>
        <EuiText size='m' color='subdued'>
          <EuiIcon type="bullseye" size="m"/>
          <span> {numDiffsClicked} / {totalNumDiffs} </span>
        </EuiText>
        <EuiText size='m' color='subdued'>
          <EuiIcon type="shard" size="m"/>
          <span> {totalClicks} </span>
        </EuiText>
      </div>
  )
}

const getDiffClicks = (paintingName: string): number => {
  const {paintings} = useProgressStore();

  const paintingDiffs = paintings[paintingName] ? paintings[paintingName] : {};

  const numDiffsClicked = Object.keys(paintingDiffs).length;

  return numDiffsClicked;
}



const getTotalNumDiffs = (paintingName: string): number => {
  const totalDiffs = paintingsJson[paintingName].totalDiffs;

  return totalDiffs;
}

const getTotalClicks = (): number => {
  const {clicks} = useClickCounter();
  return clicks;
}