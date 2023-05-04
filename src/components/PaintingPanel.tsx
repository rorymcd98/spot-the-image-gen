import React from 'react'

export type PanelPosition = {
  zoomPercent: number;
  xPercent: number;
  yPercent: number;
}

export type PaintingPanelProps = {
  paintingName: string,
  isDiff: boolean,
  paintingPos: PanelPosition,
  setPaintingPos: () => void
}

const PaintingPanel: React.FC<PaintingPanelProps> = ({paintingName, isDiff, paintingPos}) => {
  return (
    <div>PaintingPanel</div>
  )
}
export default PaintingPanel;