// import { useState } from 'react'
import React, { useState } from 'react'
import './App.css'
import {PaintingPanel, PaintingPanelProps, PanelPosition} from './PaintingPanel';


const App: React.FC = () => {

  const [panelPosition, setPanelPosition] = useState<PanelPosition>({
    zoomPercent: 100,
    xPercent: 0,
    yPercent: 0
  })

  const paintingName = 'test';

  const panelOneProps: PaintingPanelProps = {
    paintingName: paintingName,
    isDiff: false,
    paintingPos: panelPosition,
    setPaintingPos: () => setPanelPosition(panelPosition)
  }

  const panelTwoProps: PaintingPanelProps = {
    paintingName: paintingName,
    isDiff: true,
    paintingPos: panelPosition,
    setPaintingPos: () => setPanelPosition(panelPosition)
  }


  return (
    <>
    <div id='panel-container'>
      <span className='PaintingPanel' id='panel-1'>
        <img src='paintings/test/test.png' />
      </span>
      <span className='PaintingPanel' id='panel-2'>
        <img src='paintings/test/test-diff.png' />
      </span>
    </div>
    </>
  )
}

export default App
