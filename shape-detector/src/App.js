import React,{ useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import CanvasDraw from "react-canvas-draw";
import BottomButtonBar from './components/BottomButtonBar'
function App() {
  const [canvasRef,setCanvasRef] = useState(null)
  return (
    <div className="App">
      <CanvasDraw lazyRadius={1} ref={canvasDraw => { setCanvasRef(canvasDraw) }} brushRadius={2} canvasWidth={1500} canvasHeight={720} />
          
      <BottomButtonBar canvasRef={canvasRef} />
    </div>
  );
}

export default App;
