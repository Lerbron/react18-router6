
const fillStyles=['#FF4612', '#647DFF', '#FFC814', '#B9C7D0']

const getFillStyle = (count) => {
  if (count > 25) {
    return fillStyles[3]
  } else if (count > 17) {
    return fillStyles[2]
  } else if (count > 8) {
    return fillStyles[1]
  } else {
    return fillStyles[0]
  }
}

const getFontStyle= count => {
  if (count > 15) {
    return fillStyles[0]
  } else if (count > 10) {
    return fillStyles[1]
  } else if (count > 5) {
    return fillStyles[2]
  } else {
    return fillStyles[3]
  }
}

export function createData(nodeCount, edgeCount) {
  const nodes = []
  const edges = []
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  
  while (nodes.length <= nodeCount) {
    const fillStyle= getFillStyle(nodes.length)
    // const fontStyle= getFontStyle(nodes.length)
    nodes.push({
      x: randomInt(screenWidth * 0.2, screenWidth * 0.8),
      y: randomInt(screenHeight * 0.1, screenHeight * 0.9),
      id: nodes.length,
      value: randomInt(10, 30),
      label: `${nodes.length}-graph`,
      fillStyle,
      // fontStyle
      // nodeLabel: `label ${nodes.length}`
    })
  }
  while (edges.length <= edgeCount) {
    edges.push({
      sourceId: randomInt(0, nodeCount),
      targetId: randomInt(0, nodeCount)
    })
  }
  return {
    nodes,
    edges
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export default {
  nodes: [
    {
      x: 100,
      y: 100,
      id: 1
    },
    {
      x: 200,
      y: 200,
      id: 2
    },
    {
      x: 800,
      y: 500,
      id: 3
    },
    {
      x: 600,
      y: 100,
      id: 4
    }
  ],
  edges: [
    {
      targetId: 1,
      sourceId: 2
    },
    {
      targetId: 1,
      sourceId: 3
    },
    {
      sourceId: 1,
      targetId: 4
    }
  ]
}