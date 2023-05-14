import React from 'react'
import { EuiFlexGroup, useEuiTheme} from "@elastic/eui";
import { css } from '@emotion/react'
import {ClickCounter} from './ClickCounter'
import {ClockCounter} from './ClockCounter'
import { usePaintingNameStore, useProgressStore } from '../../../../../state-management/Store';

type CountersProps = {
  isVertical: boolean
}

export const  Counters: React.FC<CountersProps> = ({isVertical}) => {
  const { euiTheme } = useEuiTheme();
  const {paintingName} = usePaintingNameStore();
  const {paintings} = useProgressStore();
  const isComplete = paintings[paintingName].isComplete;

  const baseCss = {
    background: euiTheme.colors.mediumShade,
    borderRadius: euiTheme.border.radius.medium,
    opacity: isComplete ? '37%' : '100%',
  }

  const verticalCss = css({
    ...baseCss,
    position: "absolute",
    right: "0.5rem",
    top: "0.5rem",
    width: "auto",
    paddingInline: euiTheme.size.s,
  })

  const horizontalCss = css({
    ...baseCss,
    position: "absolute",
    top: "0.5rem",
    width: "auto",
    paddingInline: "1rem",
    transform: "translateX(-50%)",
  })

  return (
    <EuiFlexGroup className='Counters'
      direction={isVertical ? 'column' : 'row'}
      gutterSize='m'
      justifyContent='center'

      css={isVertical ? verticalCss : horizontalCss}
    >
      <ClickCounter/>
      <ClockCounter/>
    </EuiFlexGroup>
  )
}