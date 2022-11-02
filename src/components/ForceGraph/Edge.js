import {
  DEFAULT_LINK_STYLE
} from './constant'

export class Edge {
  constructor(targetNode, sourceNode, linkStyle = DEFAULT_LINK_STYLE) {
    this.targetNode = targetNode
    this.sourceNode = sourceNode
    this.linkStyle = linkStyle || DEFAULT_LINK_STYLE
  }
  render(ctx) {
    const {
      targetNode,
      sourceNode
    } = this
    const [tx, ty] = targetNode.coordinate
    const [sx, sy] = sourceNode.coordinate
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(tx, ty)
    ctx.lineWidth = devicePixelRatio
    ctx.strokeStyle = this.linkStyle
    ctx.stroke()
  }
}

export default Edge