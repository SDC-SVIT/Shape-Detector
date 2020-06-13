import React from 'react'
import { generateTriangle, calculateMidPoints, calculateVertices } from "../logic/dataFunctions";

function BottomButtonBar(props) {
    return (
        <>
            {/* Button to save the contents of the canvas*/}
            <button
                onClick={() => {
                    console.log(props.canvasRef.getSaveData())
                }}
            >Save</button>


            {/* Button to convert the contents of the canvas into a line */}
            <button onClick={() => {
                let data = props.canvasRef.getSaveData();
                data = JSON.parse(data)
                let line_data = data.lines[0]
                let start = line_data.points[0]
                let end = line_data.points[line_data.points.length - 1]
                let diagram = { "lines": [{ "points": [start, end], "brushColor": "#444", "brushRadius": 2 }], "width": 1500, "height": 720 }
                props.canvasRef.loadSaveData(JSON.stringify(diagram), true)
            }}
            >Lineate</button>


            {/* Button to convert the contents of the canvas into a triangle */}
            <button
                onClick={() => {
                    // console.log(props.canvasRef.getSaveData())
                    let data = props.canvasRef.getSaveData();
                    data = JSON.parse(data)
                    let line_data = data.lines[0]
                    let vertices = calculateVertices(line_data)
                    console.log(vertices)
                    let diagram = generateTriangle(vertices[0], vertices[1], vertices[2])
                    props.canvasRef.loadSaveData(JSON.stringify(diagram), true)
                }}
            >Triangulate</button>


            {/* Button to draw a simple triangle with fixed points on the canvas */}
            <button
                onClick={() => {
                    let start = { "x": 271.7999832084339, "y": 443.80183314212593 };
                    let end = { "x": 400.37165164258187, "y": 220.0181007035567 };
                    let middle = { "x": 685.37165164258187, "y": 300.0181007035567 };
                    let middlepoints1 = calculateMidPoints(start, middle, end);
                    let middlepoints2 = calculateMidPoints(middle, end, start);
                    console.log(JSON.stringify(middlepoints2))
                    let points = [start, ...middlepoints1, ...middlepoints2, start]
                    let diagramCustom = { "lines": [{ "points": points, "brushColor": "#444", "brushRadius": 2 }], "width": 1500, "height": 720 }
                    console.log(diagramCustom)
                    props.canvasRef.loadSaveData(JSON.stringify(diagramCustom), true)
                }}
            >SampleTriangle</button>


            {/* Button to clear the canvas */}
            <button
                onClick={() => {
                    console.log(props.canvasRef.clear())
                    // console.log(isNaN(1/0))
                }}
            >Clear</button>


            {/* Button to undo the last action of drawing */}
            <button
                onClick={() => {
                    console.log(props.canvasRef.undo())
                }}
            >Undo</button>
        </>
    )
}

export default BottomButtonBar