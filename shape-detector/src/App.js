import React from 'react';
import logo from './logo.svg';
import './App.css';
import CanvasDraw from "react-canvas-draw";
function App() {
  return (
    <div className="App">
        <CanvasDraw brushRadius={2} canvasWidth={1500}canvasHeight={720}/>
    </div>
  );
}

export default App;
