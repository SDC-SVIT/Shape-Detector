import React from 'react';
import logo from './logo.svg';
import './App.css';
import CanvasDraw from "react-canvas-draw";
let name="XYZ";
function App() {
  return (
    <div className="App">
        <CanvasDraw ref={canvasDraw => {name = canvasDraw}} brushRadius={2} canvasWidth={1500} canvasHeight={720}/>
    <button
            onClick={() => {
              console.log(name.getSaveData())
            }}
          >Save</button>
           <button
            onClick={() => {
              console.log(name.clear())
            }}
          >Clear</button>
           <button
            onClick={() => {
              console.log(name.undo())
            }}
          >undo</button>
    </div>
  );
}

export default App;
