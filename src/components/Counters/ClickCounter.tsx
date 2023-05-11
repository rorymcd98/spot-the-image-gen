import React from 'react'
import { useProgressStore, usePaintingNameStore } from '../Store'
import { EuiFlexGroup, EuiIcon, EuiText} from "@elastic/eui";

import paintingsLibrary from '../../resources/paintingsLibrary';

export const  ClickCounter: React.FC = () => {
  const {paintingName} = usePaintingNameStore();

  const numDiffsClicked = getDiffClicks(paintingName);
  const totalNumDiffs = getTotalNumDiffs(paintingName);

  return (
    <EuiFlexGroup justifyContent='center' alignItems='center' gutterSize='s'>
      <EuiText size='relative' color='text'>
        {numDiffsClicked} / {totalNumDiffs}
      </EuiText>
      <EuiIcon type="bullseye" size="l"/>
    </EuiFlexGroup>
  )
}

const getDiffClicks = (paintingName: string): number => {
  const {paintings} = useProgressStore();

  const paintingDiffs = paintings[paintingName].differenceIds ? paintings[paintingName].differenceIds : {};

  const numDiffsClicked = Object.keys(paintingDiffs).length;

  return numDiffsClicked;
}



const getTotalNumDiffs = (paintingName: string): number => {
  const totalDiffs = paintingsLibrary[paintingName].totalDiffs;
  return totalDiffs;
}