import React from 'react';
import logo from './logo.svg';
import './App.css';
import CanvasDraw from "react-canvas-draw";
let name={};
function App() {
  let start={"x":272.7999832084339,"y":443.80183314212593};
  let end={"x":300.37165164258187,"y":220.0181007035567};
  let points=[start,end] 
  let diagram={"lines": [{"points":points,"brushColor":"#444","brushRadius":2}],"width":1500,"height":720}    
  return (
    <div className="App">
        <CanvasDraw ref={canvasDraw => {name = canvasDraw}} brushRadius={2} canvasWidth={1500} canvasHeight={720}/>

    <button
            onClick={() => {
              // console.log(name.getSaveData())
              let data=name.getSaveData();
              data=JSON.parse(data)
              let line_data=data.lines[0]
              let start=line_data.points[0]
              let end=line_data.points[line_data.points.length-1]
              let diagram={"lines": [{"points":[start,end],"brushColor":"#444","brushRadius":2}],"width":1500,"height":720}
              name.loadSaveData(JSON.stringify(diagram),true)
            }}
          >Save</button>
           <button
            onClick={() => {
              console.log(name.clear())
            }}
          >Clear</button>
           <button
            onClick={() => {
            //  console.log(name.undo())
              name.loadSaveData(JSON.stringify(diagram),true)
            }}
          >undo</button>
    </div>
  );
}

export default App;
