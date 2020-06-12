import React from 'react';
// import logo from './logo.svg';
import './App.css';
import CanvasDraw from "react-canvas-draw";
import { generateTriangle, calculateMidPoints, calculateVertices } from "./dataFunctions";

let name={};
function App() {
  let start={"x":271.7999832084339,"y":443.80183314212593};
  let end={"x":400.37165164258187,"y":220.0181007035567};
  let middle={"x":685.37165164258187,"y":300.0181007035567};
  let middlepoints1 = calculateMidPoints(start,middle,end);
  let middlepoints2 = calculateMidPoints(middle,end,start);
  console.log(JSON.stringify(middlepoints2))
  let points=[start, ...middlepoints1, ...middlepoints2,start] 
  let diagramCustom={"lines": [{"points":points,"brushColor":"#444","brushRadius":2}],"width":1500,"height":720}    
  return (
    <div className="App">
        <CanvasDraw lazyRadius={1} ref={canvasDraw => {name = canvasDraw}} brushRadius={2} canvasWidth={1500} canvasHeight={720}/>

    <button
            onClick={() => {
              console.log(name.getSaveData())
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
              // console.log(name.getSaveData())
              let data=name.getSaveData();
              data=JSON.parse(data)
              let line_data=data.lines[0]
              let vertices = calculateVertices(line_data)
              console.log(vertices)
              let diagram=generateTriangle(vertices[0],vertices[1],vertices[2])
              name.loadSaveData(JSON.stringify(diagram),true)
            }}
          >triangulate</button>

           <button
            onClick={() => {
              console.log(name.clear())
              // console.log(isNaN(1/0))
            }}
          >Clear</button>
           <button
            onClick={() => {
             console.log(diagramCustom)  //name.undo()
              name.loadSaveData(JSON.stringify(diagramCustom),true)
            }}
          >undo</button>
    </div>
  );
}

export default App;
