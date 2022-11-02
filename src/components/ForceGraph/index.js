import { vec2 } from 'gl-matrix'
import Node from './Node'
import Edge from './Edge'

import {
  ELASTICITY,
  ATTRACTIVE,
  DAMPING,
  EDGE_LENGTH,
  REPULSION,
  MAX_ITERATIVE,
  MAX_MULTIPLE,
  DEFAULT_NODE_VALUE,
  DEFAULT_NODE_MIN_VALUE
} from './constant'


const canvasCenter = vec2.create()
let lastTime= Date.now()

const throttle = (func, delay) => {
  let timer = null;
  let startTime = Date.now();
  return function () {
    let curTime = Date.now();
    let remaining = delay - (curTime - startTime);
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, remaining);
    }
  }
}


class ForceGraph{
  constructor({
    container,
    data= {nodes: [], edges: []},
    nodeValue,
    nodeLabel,
    linkStyle,
    fontStyle,
    centerNode,
    nodeClick
  }) {
    this.container= container || document.body
    this.canvas= null
    this.ctx= null
    this.nodes= []
    this.edges= []
    this.params = {
      // 拉力系数
      elasticity: ELASTICITY,

       // 中心吸引系数
      attractive: ATTRACTIVE,

      // 斥力系数
      repulsion: REPULSION,

      // 阻尼系数
      damping: DAMPING, 

       // 连线自然长度
      edgeLength: EDGE_LENGTH,
    }

    // 中心点node
    this.centerNode= centerNode

    // node大小
    this.nodeValue= nodeValue

    // node显示的文案
    this.nodeLabel= nodeLabel

    // edge 颜色
    this.linkStyle= linkStyle

    // label 字体颜色
    this.fontStyle= fontStyle

    // requestAnimationFrame渲染的次数
    this.renderCount= 0

    this.data= data

    // 鼠标按下后松开，拖动结束
    this.mouseIsUp= false

    // 鼠标按下，记录开始的位置
    this.startPosition= {
      x: 0,
      y: 0
    }

    // 鼠标move的距离
    this.translateDistance= {
      x: 0,
      y: 0
    }

    // 移动的总距离

    this.totalTranslateDistance= {
      x: 0,
      y: 0
    }

    // 缩放的比例
    this.ratio= 1

    // 上一次的缩放比例
    this.lastRatio= 1

    // 鼠标滚动的方向
    this.wheelDirection= 1
    
    // 触控时，两点的距离
    this.curDistance= 0

    // 触控时，上一次两点的距离
    this.preDistance= 0

    // 暂停重复渲染
    this.pauseRequestAnimationFrame= false

    // nodeClick 节点点击回调
    this.nodeClick= nodeClick

    this.offsetLeft= 0
    this.offsetTop= 0

    this.initCavas()
    this.handleEvent()
    this.updateCanvasSize()
    this.initNodes()
    this.initEdges()
    this.render()
    this.getOffsetInfo(this.container)
  }
  getClientRect = () => {
    let width = document.body.clientWidth || document.documentElement.clientWidth,
      height = document.body.clientHeight || document.documentElement.clientHeight
    return { width, height }
  }

  getDomRect = (dom) => {
    if (!dom) {
      return getClientRect()
    }

    let width = dom.offsetWidth,
      height = dom.offsetHeight
    return { width, height }
  }
  createHDCanvas = ({ width = 300, height = 150 } = {}) => {
    const canvas = document.createElement('canvas');
    canvas.width = width * devicePixelRatio; // 实际渲染像素
    canvas.height = height * devicePixelRatio; // 实际渲染像素
    canvas.style.width = `${width}px`; // 控制显示大小
    canvas.style.height = `${height}px`; // 控制显示大小
    canvas.getContext('2d').setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    return canvas;
  }
  initCavas() {
    let canvasInfo= this.getDomRect(this.container)
    this.canvas= this.createHDCanvas(canvasInfo)
    this.ctx = this.canvas.getContext('2d')
    this.container.appendChild(this.canvas)
  }

  initNodes() {
    this.data.nodes.forEach((item, index) => {
      // 处理node大小，当node中没有nodeValue字段，但外部有传获取nodeValue
      let nodeValue= DEFAULT_NODE_VALUE, nodeLabel= index
      if (!item.nodeValue && this.nodeValue) {
        if (this.nodeValue instanceof Function) {
          let _nodeValue= this.nodeValue(item)
          if (Number.isFinite(_nodeValue)) nodeValue= _nodeValue
        } else if ( typeof(this.nodeValue) === 'number') {
          nodeValue= this.nodeValue
        }
      } else if (item.nodeValue != undefined){
        nodeValue= item.nodeValue
      }
      item.nodeValue= Math.max(DEFAULT_NODE_MIN_VALUE, nodeValue)

      // 设置node id
      if (!item.id) item.id= index

      // 处理node显示的文案, node中没有nodeLabel字段，但在外部有传nodeLabel
      if (!item.nodeLabel && this.nodeLabel) {
        if ( typeof(this.nodeLabel) === 'string') {
          nodeLabel= this.nodeLabel
        } else if (this.nodeLabel instanceof Function) {
          nodeLabel= this.nodeLabel(item)
        }
      } else if (item.nodeLabel != undefined){
        nodeLabel= item.nodeLabel
      }
      item.nodeLabel= nodeLabel

      // 设置node label 字体颜色
      if (!item.fontStyle && this.fontStyle) {
        let fontStyle= ''
        if ( typeof(this.fontStyle) === 'string') {
          fontStyle= this.fontStyle
        } else if (this.fontStyle instanceof Function) {
          fontStyle= this.fontStyle(item)
        }
        item.fontStyle= fontStyle
      }

      const node = new Node(item)
      let x= item.x, y= item.y
      if (this.centerNode != undefined && node.id == this.centerNode) {
        x= this.container.offsetWidth * devicePixelRatio / 2
        y= this.container.offsetHeight * devicePixelRatio / 2
      }
      vec2.set(node.coordinate, x, y)
      this.nodes.push(node)
    })
  }

  initEdges() {
    this.data.edges.forEach(item => {
      const sourceNode = this.nodes.find(node => node.id === item.sourceId)
      const targetNode = this.nodes.find(node => node.id === item.targetId)
      if (sourceNode && targetNode && sourceNode !== targetNode) {
        const edge = new Edge(targetNode, sourceNode, this.linkStyle)
        sourceNode.edges.push(edge)
        targetNode.edges.push(edge)
        this.edges.push(edge)
      }
    })
  }

  /**
   * 校验是否为同一个node
  */
  checkIsSameNode(id1, id2) {
    return id1 === id2
  }


  /**
   * 获取容器的偏移
  */
  getOffsetInfo = (dom) => {
    let offsetLeft = dom.offsetLeft || 0,
      offsetTop= dom.offsetTop || 0
    let node = dom.offsetParent;
    while (node != null) {
      offsetLeft += node.offsetLeft;
      offsetTop += node.offsetTop;
      node = node.offsetParent;
    }

    this.offsetLeft= offsetLeft
    this.offsetTop= offsetTop
    return {
      offsetLeft,
      offsetTop
    }
  }

  /**
   * 获取画布平移的距离
  */
  getDeltaPostion = () => {
    let width = this.canvas.width,
      height = this.canvas.height,
      deltaX = width * (1 - this.ratio) / devicePixelRatio / 2,
      deltaY = height * (1 - this.ratio) / devicePixelRatio / 2

    return {
      deltaX,
      deltaY
    }
  }

  /**
   * 
   * 获取点缩放平移后的坐标
  */
  getNodePosition(point) {
    let { x, y }= point
    let { deltaX, deltaY }= this.getDeltaPostion()
    x = x * this.ratio + deltaX + this.totalTranslateDistance.x
    y = y * this.ratio + deltaY + this.totalTranslateDistance.y
    return {
      x,
      y
    }
  }


  /**
   * 
   * @returns 校验点是否在node节点内
  */
  checkPointInNode(point) {
    let { x: pointX, y: pointY }= point
    pointX -= this.offsetLeft
    pointY -= this.offsetTop
    let intersectNode= this.nodes.find(node => {
      let {coordinate, radius }= node

      let [x, y]= coordinate

      let {x: _x, y: _y}= this.getNodePosition({x, y})


      let dis= Math.sqrt((pointX * devicePixelRatio - _x) ** 2 + (pointY * devicePixelRatio - _y) ** 2)
      return dis <= radius * this.ratio
    })
    return intersectNode
  }

  render() {
    if (++this.renderCount > MAX_ITERATIVE) return null
    this.onClearRect()
    const now = Date.now()
    const deltaTime = now - lastTime
    lastTime = now
    // 计算节点受力
    this.computeForce(this.nodes, canvasCenter, this.params)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.edges.forEach(edge => edge.render(this.ctx))
    this.nodes.forEach(node => {
      node.update(deltaTime)
      node.render(this.ctx)
    })
    requestAnimationFrame(() => this.render())
  }

  
  /**
   * 计算节点的合力
   * @param nodes 
   * @param canvasCenter 
   */
  computeForce(nodes, canvasCenter, params) {
    nodes.forEach(node => {
      let isZoomNode= this.checkIsSameNode(this.centerNode, node.id)
      vec2.set(node.force, 0, 0)
      /**
       * 1.节点间的库仑力（斥力）
       * F = (Q1 * Q2) / (distance ** 2) * k 
       */
      nodes.forEach(target => {
        // 需要固定中心点node时，不处理中心点node的受力
        if (node === target || (isZoomNode && this.centerNode !== undefined)) return
        const k = params.repulsion
        let distance = vec2.distance(node.coordinate, target.coordinate)
        distance = distance < EDGE_LENGTH ? EDGE_LENGTH : distance
        // 大小
        let size = node.Q * target.Q / distance ** 2 * k

        // 处理需要固定中心点node时，作用力 * 2
        if (this.checkIsSameNode(target.id === this.centerNode)) size= size * 2
       
        // 方向
        const direction = vec2.create()
        vec2.subtract(direction, node.coordinate, target.coordinate)
        vec2.normalize(direction, direction)
        // 库仑力
        const coulombForce = vec2.create()
        vec2.scale(coulombForce, direction, size)
        // 叠加
        vec2.add(node.force, node.force, coulombForce)

      })

      /**
       * 2.拉力
       * F = L * K
       */
      node.edges.forEach(edge => {
        if (isZoomNode && this.centerNode !== undefined) return null
        const target = edge.targetNode === node ? edge.sourceNode : edge.targetNode
        const distance = vec2.distance(node.coordinate, target.coordinate)
        const L = distance > EDGE_LENGTH ? distance - EDGE_LENGTH : 0
        const k = this.params.elasticity
        // 大小
        let size = L * k
        if (this.checkIsSameNode(target.id === this.centerNode)) size= size * 2
        // 方向
        const direction = vec2.create()
        vec2.subtract(direction, target.coordinate, node.coordinate)
        vec2.normalize(direction, direction)
        const pullForce = vec2.create()
        vec2.scale(pullForce, direction, size)
        // 叠加
        vec2.add(node.force, node.force, pullForce)

      })
  
      /**
       * 3.聚向画布中心的力
       * F = d * K
       */
      {
        const distance = vec2.distance(node.coordinate, canvasCenter)
        const k = this.params.attractive
        // 大小
        const size = distance * k
        // 方向
        const direction = vec2.create()
        vec2.subtract(direction, canvasCenter, node.coordinate)
        vec2.normalize(direction, direction)
        const force = vec2.create()
        vec2.scale(force, direction, size)
        // 叠加
        vec2.add(node.force, node.force, force)
      }
  
      /**
       * 4.阻尼力
       * F = -V * K
       */
      {
        const k = this.params.damping
        const size = vec2.length(node.velocity) * k
        const direction = vec2.create()
        vec2.negate(direction, node.velocity)
        vec2.normalize(direction, direction)
        const dampingForce = vec2.create()
        vec2.scale(dampingForce, direction, size)
        vec2.add(node.force, node.force, dampingForce)
      }
  
    })
  }
  updateCanvasSize() {
    this.canvas.width = this.container.offsetWidth * devicePixelRatio
    this.canvas.height = this.container.offsetHeight * devicePixelRatio
    this.canvas.style.width= this.container.offsetWidth + 'px'
    this.canvas.style.height= this.container.offsetHeight + 'px'
    vec2.set(canvasCenter, this.container.offsetWidth * devicePixelRatio / 2, this.container.offsetHeight * devicePixelRatio / 2)
    this.renderCount= 0
    this.render()
  }

  _onMouseMove(e) {
    if (this.mouseIsUp) return null
    let x = e.clientX, y = e.clientY

    this.translateDistance.x = this.startPosition.x - x
    this.translateDistance.y = this.startPosition.y - y

    this.translate(-this.translateDistance.x, -this.translateDistance.y);
    this.startPosition= {
      x,
      y
    }
  }

  onMouseUp(e) {
    this.mouseIsUp = true
    this.container.removeEventListener('mousemove', this.onMouseMove)
    this.container.removeEventListener('mouseup', this.onMouseUp)
    this.startPosition.x = 0
    this.startPosition.y = 0
    this.translateDistance.x= 0
    this.translateDistance.y= 0
  }

  onMouseMove = throttle(this._onMouseMove, 30)

  onMouseDown(e) {
    this.mouseIsUp = false
    let x = e.clientX, y = e.clientY
    this.startPosition.x = x
    this.startPosition.y = y

    this.container.addEventListener('mousemove', e => this.onMouseMove(e))
    this.container.addEventListener('mouseup', e => this.onMouseUp(e))
  }


  _onTouchMove = e => {
    const t = e.touches[0];
    if (e.touches && e.touches.length == 1) {

      if (this.mouseIsUp) return null
      let x = t.clientX, y = t.clientY

      this.translateDistance.x = this.startPosition.x - x
      this.translateDistance.y = this.startPosition.y - y

      this.translate(-this.translateDistance.x, -this.translateDistance.y);
      this.startPosition= {
        x,
        y
      }

    } else if (e.touches && e.touches.length == 2) {
      const c1 = e.touches[0];
      const c2 = e.touches[1];

      this.curDistance = Math.hypot(c2.clientX - c1.clientX, c2.clientY - c1.clientY)

      this.wheelDirection = this.curDistance > this.preDistance ? 1 : -1
      
      if (this.wheelDirection < 0) {
        if (this.ratio < 0.1) return null
      } else {
        if (this.ratio > MAX_MULTIPLE) return null
      }

      this.ratio += this.wheelDirection * 0.05
      this.ratio = Number(this.ratio.toFixed(2))
      this._onZoom()
      this.preDistance = this.curDistance
    }
  }

  onTouchMove = throttle(this._onTouchMove, 100)

  onTouchEnd= e => {
    this.mouseIsUp = true
    this.container.removeEventListener('touchmove', this.onTouchMove)
    this.container.removeEventListener('touchend', this.onTouchEnd)
    this.startPosition.x = 0
    this.startPosition.y = 0
    this.translateDistance.x = 0
    this.translateDistance.y = 0
  }

  onTouchStart(e){
    if (e.touches && e.touches.length == 1) {
      const c = e.touches[0];
      this.mouseIsUp = false
      let x = c.clientX, y = c.clientY
      this.startPosition.x = x
      this.startPosition.y = y
    } else {
      const c1 = e.touches[0];
      const c2 = e.touches[1];
      this.preDistance = Math.hypot(c2.clientX - c1.clientX, c2.clientY - c1.clientY)
    }
    this.container.addEventListener('touchmove', e => this.onTouchMove(e))
    this.container.addEventListener('touchend', e => this.onTouchEnd(e))

  }

  getDeltaPostion = () => {
    let width = this.canvas.width,
      height = this.canvas.height,
      deltaX = width * (1 - this.ratio) / 2,
      deltaY = height * (1 - this.ratio) / 2

    return {
      deltaX,
      deltaY
    }
  }


  _onZoom = () => {
    this.onClearRect()
    this.ctx.save()
    let { deltaX, deltaY } = this.getDeltaPostion()
    this.ctx.translate(deltaX, deltaY)
    this.ctx.scale(this.ratio, this.ratio)
    this.reRender()
    this.ctx.restore()
    this.lastRatio= this.ratio
  }


  onZoom = throttle((e) => {
    e = e || window.event
    if (e.wheelDelta) {
      this.wheelDirection = e.wheelDelta > 0 ? -1 : 1
    } else {
      this.wheelDirection = e.detail > 0 ? -1 : 1
    }
    if (this.wheelDirection < 0) {
      if (this.ratio < 0.1) return null
    } else {
      if (this.ratio > MAX_MULTIPLE) return null
    }

    this.ratio += this.wheelDirection * 0.05
    this.ratio = Number(this.ratio.toFixed(2))
    this._onZoom()
  }, 100)


  onClick(e) {
    if (this.nodeClick && this.nodeClick instanceof Function) {
      let {clientX, clientY} = e
      let intersectNode= this.checkPointInNode({x: clientX, y: clientY})
      intersectNode && this.nodeClick(intersectNode)

    }

  }

  _mouseMoveCanvas(e) {
    let {clientX, clientY} = e
    let intersectNode= this.checkPointInNode({x: clientX, y: clientY})
    if (intersectNode) {
      document.body.style.cursor= 'pointer'
    } else {
      document.body.style.cursor= 'auto'
    }
  }

  mouseMoveCanvas= throttle(this._mouseMoveCanvas, 30)

  handleEvent() {
    window.addEventListener('resize', () =>this.updateCanvasSize())
    // document.addEventListener('visibilitychange', () => {
    //   if (document.hidden === false) {
    //     lastTime = Date.now()
    //   }
    // })
    this.container.addEventListener('mousedown', e => this.onMouseDown(e))
    this.container.addEventListener('touchstart', e => this.onTouchStart(e))
    this.container.addEventListener('mouseleave', e => this.onMouseUp(e))
    this.container.addEventListener('mousewheel', e => this.onZoom(e))
    this.canvas.addEventListener('click', e => this.onClick(e))
    this.canvas.addEventListener('mousemove', e => this.mouseMoveCanvas(e))
  }

  translate(x, y) {
   
    this.totalTranslateDistance.x += x
    this.totalTranslateDistance.y += y
    this.onClearRect()
    this.ctx.translate(x, y)
    this.reRender()
  }

  reRender() {
    this.onClearRect()
    this.edges.forEach(edge => edge.render(this.ctx))
    this.nodes.forEach(node => {
      node.render(this.ctx)
    })
  }

  onClearRect() {
    this.ctx.clearRect(-this.canvas.width, -this.canvas.height, 3 * this.canvas.width, 3 * this.canvas.height)
  }
}


export default ForceGraph



