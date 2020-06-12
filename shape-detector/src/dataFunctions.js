export function calculateVertices (pointsArray) {
  console.log("pointsArray is:")
    console.log(pointsArray)
  let return_object = { gradients: [], current_point: {} }
  let points_diff = pointsArray.points.reduce(
    (previous_value, current_value, current_index) => {
      if (current_index === 0) previous_value.current_point = current_value

      return {
        gradients: [
          ...previous_value.gradients,
          (current_value.y - previous_value.current_point.y) /
            (current_value.x - previous_value.current_point.x)
        ],
        current_point: current_value
      }
    },
    return_object
  )
  console.log("points_diff is:")
  console.log(points_diff)
  let vertices = points_diff.gradients.reduce(
    (previous_value, current_point, current_index) => {
      if (
        (current_point >= 0 && previous_value.prev_point <= 0) ||
        (current_point <= 0 && previous_value.prev_point >= 0)
      ) {
        previous_value.vertices.push(current_index)
      }
      previous_value.prev_point = current_point
      return previous_value
    },
    { vertices: [], prev_point: points_diff.gradients[0] }
  )
  console.log("Vertices are:")
  console.log(pointsArray.points[vertices.vertices[parseInt(vertices.vertices.length/2)]])
  return [
      pointsArray.points[0],
      pointsArray.points[vertices.vertices[0]],
      pointsArray.points[vertices.vertices[parseInt(vertices.vertices.length-1)]]
  ]
}

export function generateTriangle (point1, point2, point3) {
  let middlepoints1 = calculateMidPoints(point1, point2, point3)
  let middlepoints2 = calculateMidPoints(point2, point3, point1)
  console.log(JSON.stringify(middlepoints2))
  let points = [point1, ...middlepoints1, ...middlepoints2, point1]
  let diagramCustom = {
    lines: [{ points: points, brushColor: '#444', brushRadius: 2 }],
    width: 1500,
    height: 720
  }
  return diagramCustom
}

export function calculateMidPoints (point1, point2, point3) {
  let delta = 0.00007
  let NEARPOINTS = 1
  let midpoints = []
  // for line 1
  let m1 =
    point2.x - point1.x !== 0 /* && point2.y - point1.y !== 0*/
      ? (point2.y - point1.y) / (point2.x - point1.x)
      : Number.MAX_SAFE_INTEGER
  let c1 = point2.y - point2.x * m1
  // for line 2
  let m2 =
    point3.x - point2.x !== 0 /*&& point2.y - point1.y !== 0*/
      ? (point3.y - point2.y) / (point3.x - point2.x)
      : Number.MAX_SAFE_INTEGER
  let c2 = point2.y - point2.x * m2
  // points before the vertice point
  console.log(
    'Points between:' +
      JSON.stringify(point1) +
      ' and ' +
      JSON.stringify(point2)
  )
  for (let index = 1; index < NEARPOINTS + 1; index++) {
    let calculatedPoint = {
      x: point2.x - index * delta,
      y: m1 * (point2.x - index * delta) + c1
    }
    console.log(calculatedPoint)
    midpoints.push(calculatedPoint)
  }
  // vertice point
  midpoints.push(point2)
  //Points after the vertice point
  console.log(
    'Points between:' +
      JSON.stringify(point2) +
      ' and ' +
      JSON.stringify(point3)
  )
  for (let index = 1; index < NEARPOINTS + 1; index++) {
    let calculatedPoint = {
      x: point2.x + index * delta,
      y: m2 * (point2.x + index * delta) + c2
    }
    console.log(calculatedPoint)
    midpoints.push(calculatedPoint)
  }
  console.log(midpoints)
  return midpoints
}
