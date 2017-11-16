// style
import './one-arm-bandit-3d.css'
// library
import React from 'react'
import { HGroup, VGroup } from 'v-block.lite/layout'

// frame loop

const cancel_frame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
const ticker_frame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
                     window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let frame_loop;
const frame_hooks = [];
const enter_frame = () => {
  const hook_nums = frame_hooks.length;
  
  let index = 0;
  while(index < hook_nums) {
    frame_hooks[index]();
    index++;
  }

  frame_loop = ticker_frame(enter_frame);
};

// tools

const RAD = deg => deg *  Math.PI / 180;

class Number3D {
  x = 0;
  y = 0;
  z = 0;
  constructor(x:Number, y:Number, z:Number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

// box

class Box extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  
  render() {
    const {id, transform, mark} = this.props;
    const style = mark ? { width: 5, height: 5, background: 'red', transform } : { width: '95%', height: size, transform };
    return <div className="fly-box-3d" style={style}>{mark ? '': 'fly box : ' + id}</div>;
  }
  
}

const nums = 8; // box number
const size = 150; // box height

// main
export default class OneArmBandit3D extends React.Component {
  state = { rotateX: 0, rotateY: 0 }

  toggle_take_frame(taking) {
    if(taking) {
      frame_loop = ticker_frame(enter_frame);
    } else {
      frame_loop && cancel_frame(frame_loop);
      frame_loop = null;
    }
  }

  handleTouchStart = evt => {
    evt.preventDefault();
    this.toggle_take_frame(true);
    this.__touched__ = evt.changedTouches[0];
    this.target.className = "one-arm-bandit-3d no-delay";
  }

  handleTouchMove = evt => {
    const { pageX, pageY } = this.__touched__;
    const { pageX: nextPageX, pageY: nextPageY } = evt.changedTouches[0];

    this._diffX_ = nextPageX - pageX;
    this._diffY_ = nextPageY - pageY;
  }

  handleTouchEnd = evt => {
    this.target.className = "one-arm-bandit-3d";
    this.toggle_take_frame(false);
  }

  handleRollingClick = () => {
    this.handleTouchEnd();
    this.setState({ rotateX: this.state.rotateX + (360 * 3) });
  }

  handleRotateClick = (flag) => () => {
    this.handleTouchEnd();
    this.setState({ rotateY: flag === 0 ? 0 : this.state.rotateY + (10 * flag) });
  } 

  componentDidMount() {
    frame_hooks.push(() => {
      const diffX = this._diffX_;
      const diffY = this._diffY_;
      const transform = [`translate3d(0, 0, ${this.Z_R}px)`];

      Math.abs(diffX) > 0 && transform.push(`rotateY(${diffX}deg)`);
      Math.abs(diffY) > 0 && transform.push(`rotateX(${-diffY}deg)`);

      this.target.style.transform = transform.join(' ');
    });
  }

  renderBoxs(nums) {
    const step    = 360 / nums;
    const half_h  = size * 0.5
    const Z_R      = half_h / Math.sin(RAD(step * 0.5)) - 9;
    const center  = new Number3D(0, 0, 0);

    this.Z_R = 0;

    const boxs = [];

    let flot = 0;
    for(let i = 0; i < nums; i++) {
      const radius = RAD(flot);
      const x = center.x;
      const y = Math.sin(radius) * Z_R + center.y;
      const z = Math.cos(radius) * Z_R + center.z;
      const transform = [
        `translate3d(${x}px, ${y}px, ${z}px)`,
        `rotateX(-${flot}deg)`
      ];
      boxs.push(<Box key={i} id={i} transform={transform.join(' ')}/>);
      flot += step;
    }
    return boxs;
  }

  render() { 
    const boxs = this.renderBoxs(nums);
    const { rotateX, rotateY }  = this.state;
    const transform = [
      `translate3d(0, 0, ${this.Z_R}px)`,
      `rotateY(${rotateY}deg)`,
      `rotateX(${rotateX}deg)`
    ].join(' ');
    return (
      <VGroup width="100%" horizontalAlign="stretch" verticalAlign="center" gap={20}>
        <VGroup className="mask-box" horizontalAlign="center" verticalAlign="center" height={size * 3 * 0.7}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}>
          <div ref={element => this.target = element} 
               className="one-arm-bandit-3d" style={{ transform, flex: '1 0', transformOrigin: `50% 50% ${this.Z_R}px` }}>
            {boxs}
          </div>
        </VGroup>
        <VGroup horizontalAlign="stretch" verticalAlign="center" gap={30} padding="0 30px">
          <HGroup horizontalAlign="space-between" verticalAlign="center" free>
            <button onClick={this.handleRotateClick(-1)}>- ROTATE Y</button>
            <button onClick={this.handleRotateClick(0)}>RESET ROTATE Y</button>
            <button onClick={this.handleRotateClick(+1)}>+ ROTATE Y</button>
          </HGroup>
          <button onClick={this.handleRollingClick}>ROLLING</button>
        </VGroup>
      </VGroup>
    )
  }
}