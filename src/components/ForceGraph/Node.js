import {
  vec2
} from 'gl-matrix'
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_FILL_STYLE,
  DEFAULT_FONT_STYLE
} from './constant'
// import Edge from './Edge'

export class Node {
  radius = 20
  /**
   * 位置坐标
   */
  coordinate = vec2.create()
  /**
   * 速度
   */
  velocity = vec2.create()
  /**
   * 加速度
   */
  accelerate = vec2.create()
  /**
   * 受力
   */
  force = vec2.create()
  /**
   * 有中心点时，中心点与各点的受力
  */
  zoomForce= vec2.create()
  /**
   * 质量
   */
  M = 1 * devicePixelRatio
  /**
   * 电荷量
   */
  Q = 128 * devicePixelRatio
  edges = []
  constructor({
    id,
    nodeValue,
    nodeLabel,
    fillStyle = DEFAULT_FILL_STYLE,
    fontStyle = DEFAULT_FONT_STYLE,
    fontSize = DEFAULT_FONT_SIZE,
    ...restProps
  }) {
    this.id = id
    this.radius = nodeValue
    this.nodeLabel = nodeLabel
    this.fillStyle = fillStyle || DEFAULT_FILL_STYLE
    this.fontStyle = fontStyle || DEFAULT_FONT_STYLE
    this.fontSize = fontSize || DEFAULT_FONT_SIZE
    if (restProps) {
      Object.keys(restProps)?.forEach(key => {
        this[`${key}`] = restProps[`${key}`]
      })
    }
  }

  update(time) {
    // 计算加速度
    vec2.scale(this.accelerate, this.force, 1 / this.M)
    // 计算速度
    const deltaVelocity = vec2.create()
    vec2.scale(deltaVelocity, this.accelerate, time / 1000)
    vec2.add(this.velocity, this.velocity, deltaVelocity)
    // 计算位移
    const translation = vec2.create()
    vec2.scale(translation, this.velocity, time / 1000)
    vec2.add(this.coordinate, this.coordinate, translation)
  }

  render(ctx) {
    const [x, y] = this.coordinate
    ctx.beginPath()
    ctx.arc(x, y, this.radius * devicePixelRatio, 0, Math.PI * 2, false)
    ctx.fillStyle = this.fillStyle
    ctx.fill()
    ctx.font = `${this.fontSize * devicePixelRatio}px Microsoft YaHei`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = this.fontStyle
    ctx.fillText(this.nodeLabel.toString(), x, y)
  }
}

export default Node