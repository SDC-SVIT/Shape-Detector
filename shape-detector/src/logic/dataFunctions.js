/**
 * This file contains various functions and their descriptions used for calculations in the canvas for shape recognization
 * 
 * Made by: Team AI udd
 * 
 */



/**
 *  Function for calculating the vertice points of the shape.
 *  @param [{x,y},{x,y}] pointsArray ----------> The array of points of the shape made by the user.
 *  @returns [{x,y},{x,y},{x,y}] Vertices -----> The array of vertices calculated by the function
 *
 */
export function calculateVertices(pointsArray) {

    /**
     * Primarily, Calculating the gradients between the set of points
     * 
     */
    // console.log("pointsArray is:");console.log(pointsArray)
    let intial_gradients_object = { gradients: [], prev_point: {} }

    let gradient_list = pointsArray.points.reduce(
        (grads_and_prev_point, current_point, current_index) => {
            if (current_index === 0) grads_and_prev_point.prev_point = current_point

            // Calculating the gradient using current_point and prev_point

            // Firstly, We calculated approximately the current gradient in approx_current_grad. 
            // If it is a NaN then the current_gradient will be the previous gradient if it exists, else the current_gradient would be 0.
            // If it is not a NaN then the approx_current_grad would be okay as the current_gradient of that point.

            let prev_grads_array = grads_and_prev_point.gradients;
            let prev_grad_last_index = prev_grads_array.length-1;
            let last_grad = prev_grads_array[prev_grad_last_index];
            let approx_current_grad = (current_point.y - grads_and_prev_point.prev_point.y) / (current_point.x - grads_and_prev_point.prev_point.x);
            let current_gradient = isNaN( approx_current_grad ) ? ( ( last_grad != 0 ) && ( prev_grad_last_index + 1  != 0) ? last_grad: 0) : approx_current_grad;  
            // let current_gradient = (current_point.y - grads_and_prev_point.prev_point.y) / (current_point.x - grads_and_prev_point.prev_point.x)
            return {
                gradients: [
                    ...grads_and_prev_point.gradients,
                    current_gradient
                ],
                prev_point: current_point
            }
        },
        intial_gradients_object
    ).gradients

    /**
     * gradient_list contains the gradients between the points given in the array.
     * Based on the gradients, Calculating the vertices
     */
    let vertices = gradient_list.reduce((previous_value, current_point, current_index) => {
        if (
            (current_point > 0 && previous_value.prev_point <= 0) ||
            (current_point < 0 && previous_value.prev_point >= 0)
        ) {
            previous_value.vertices.push(current_index)
        }
        previous_value.prev_point = current_point
        return previous_value
    },{ vertices: [], prev_point: gradient_list[0] }
    )
    
    console.log("entering vertices_trial")
    /**
     * Trying recognization of vertices with window
     */
    let gradient_trial = gradient_list.reduce((prev_avg_gradients,current_gradient,current_index,all_gradients)=>{
if(current_index < all_gradients.length-10)
{let avg_grad = all_gradients.slice(current_index,current_index+10).reduce((accumulator, cuurent_value)=>accumulator+cuurent_value)/10;
        console.log(prev_avg_gradients)
        prev_avg_gradients.push(avg_grad)
        return prev_avg_gradients}
        else{
            return prev_avg_gradients
        }
        
    },[])
    let  vertices_trial=gradient_trial.reduce((previous_value, current_point, current_index) => {

        if (
            (current_point > 0 && previous_value.prev_point <= 0) ||
            (current_point < 0 && previous_value.prev_point >= 0)
        ) {
            previous_value.vertices.push(current_index)
        }
        previous_value.prev_point = current_point
        return previous_value
    },{ vertices: [], prev_point: gradient_list[0] }
    )
   let return_obj=[
    pointsArray.points[0],
    pointsArray.points[vertices_trial[1]],
    pointsArray.points[vertices_trial[(vertices_trial.length - 1)]]
]
console.log("In calculate vertices ")
console.log(return_obj)


    // returning the vertices
   return return_obj
}




/**
 * Function created to get the necessary points to draw a triangle in react-canvas-draw
 * @param {x,y} point1 ---->  Vertice 1
 * @param {x,y} point2 ---->  Vertice 2
 * @param {x,y} point3 ---->  Vertice 3
 * @returns {lines,width,height} triangleDiagram ----> react-canvas-draw load object
 */
export function generateTriangle(point1, point2, point3) {
    /**
     *        Consider the following triangle:
     * 
     *                point2
     *                   .
     *                  / \
     *                /    \
     *     line a <- /      \ -> line b
     *              /________\
     *        point1   |    point3
     *                 ˇ
     *             line c
     *                
     *      Here, 
     *      Line a -> Line 1
     *      Line b -> Line 2
     *      Line c -> Line 3
     */

    /*  Intermediate points near point 2 of the triangle  */
    let middlepoints1 = calculateMidPoints(point1, point2, point3)
    /*  Intermediate points near point 3 of the triangle  */
    let middlepoints2 = calculateMidPoints(point2, point3, point1)

    // Generate the set of points needed for the triangle
    let points = [point1, ...middlepoints1, ...middlepoints2, point1]
    console.log(points)
    //Create the drawing Object input to react-canvas-draw load function
    let traingleDiagram = {
        lines: [{ points: points, brushColor: '#444', brushRadius: 2 }],
        width: 1500,
        height: 720
    }
    return traingleDiagram
}



/**
 * This function calculates the points near point2 lying on line 1 and line 2 and return a continuous set of points
 * @param {x,y} point1 Vertice 1
 * @param {x,y} point2 Vertice 2
 * @param {x,y} point3 Vertice 3
 * @returns [{x,y},{x,y}] midpoints
 */
export function calculateMidPoints(point1, point2, point3) {
    // Constants
    let delta = 0.00007
    let NEARPOINTS = 1

    // Array of resultant points
    let midpoints = []

    //Calculate line constants
    let { m1, c1, m2, c2 } = calculateLineParamtersForVertice(point1, point2, point3)

    /**
     * Calculating and adding the points before the vertice point
     * These points will lie between the vertex point 1 and vertex point 2 on line 1.
     */
    console.log('Points between:' + JSON.stringify(point1) + ' and ' + JSON.stringify(point2))
    for (let index = 1; index < NEARPOINTS + 1; index++) {
        let calculatedPoint = {
            x: point2.x - index * delta,
            y: m1 * (point2.x - index * delta) + c1
        }
        midpoints.push(calculatedPoint)
    }


    // Pushing the vertice point into the Result array
    midpoints.push(point2)


    /**
     *  Calculating and adding the points after the vertice point
     *  These points will lie between the vertex point 2 and vertex point 3 on line 2.
     */
    for (let index = 1; index < NEARPOINTS + 1; index++) {
        // console.log("m2=" + m2)
        let calculatedPoint = {
            x: point2.x + index * delta,
            y: m2 * (point2.x + index * delta) + c2
        }
        midpoints.push(calculatedPoint)
    }

    console.log("The Final set of midpoints are:");console.log(midpoints)
    return midpoints
}



/**
 * This function calculates line parameters for 2 lines line 1 and line 2
 * @param {x,y} point1 Vertice 1
 * @param {x,y} point2 Vertice 2
 * @param {x,y} point3 Vertice 3
 * @returns {m1,c1,m2,c2} parameters
 */
function calculateLineParamtersForVertice(point1, point2, point3) {
    // for line 1  
    let line1 = calculateLineVariables(point1, point2)

    // for line 2
    let line2 = calculateLineVariables(point2, point3)

    return { m1: line1.m, c1: line1.c, m2: line2.m, c2: line2.c }
}


/**
 * Calculates and return paramters if a single line
 * @param {x,y} point1 Vertice 1
 * @param {x,y} point2 Vertice 2
 * @returns {m,c} parameters 
 * where, m: slope,
 *        c: y-intercept
 */
function calculateLineVariables(point1, point2) {
    /**********************************************************************
      Equation of the line: y = m*x + c
      where m: slope of the line
            c: y-intercept
  
      therefore using 2 points,
      m = Δy/Δx
      i.e. m = (y2 - y1)/(x2 - x1)
  
      and,
      c = y2 - m*x2           [∵ y2 = m*x2 + c]
  
    ************************************************************************/

    //slope of line 
    let m = point2.x - point1.x !== 0 /* && point2.y - point1.y !== 0*/
        ? (point2.y - point1.y) / (point2.x - point1.x)
        : Number.MAX_SAFE_INTEGER

    //shift of line 
    let c = point2.y - point2.x * m

    return { m, c }
}