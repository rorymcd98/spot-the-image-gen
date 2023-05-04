// import { useState } from 'react'
import './App.css'

function App() {

  const paintingName = 'test';

  const panelOnePainting = [];
  const panelTwoPainting = [];

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
