// style
import './one-arm-bandit.css'
// library
import React from 'react'

const ST = (...values) => values.reduce((acc, value) => {
  acc = {...acc, ...value};
  return acc;
});

const cancel_frame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
const ticker_frame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
                     window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


let stop = false;
let duration = 1 * 1000;
let velocity = 0;
let acceleration = -0.10;
let speed_up = true;

const frame_hooks = [];  
const enter_frame = () => {
  const hook_nums = frame_hooks.length;

  let index = 0;
  while(index < hook_nums) {
    frame_hooks[index](velocity);
    index++;
  }

  if(speed_up) {
    // console.log(1);
    if(Math.abs(velocity) > 10) {
      // console.log(11111111111111111111);
      if(acceleration < 1e-4) {
        acceleration = 0;
        setTimeout(() => {
          acceleration = 0.01;
          speed_up = false;
        }, duration);
      } else {
        acceleration *=  0.8; 
      }
    }
  } else {
    // console.log(2);
    if(Math.abs(velocity) < 0.5) {
      // console.log(222222222222222222222222);

      if(acceleration < 1e-2) {
        acceleration = 0;
        velocity = 0;
        stop = true;
        console.log('stop');
      } else {
        acceleration *=  0.8;
      }
    }
  }

  if(!stop){
    velocity += acceleration;
    ticker_frame(enter_frame);
  }
};

const nums = 8;
const size = 150;

class Box extends React.Component {

  position = 0;

  constructor(props) {
    super(props);
    this.position = 0 + props.offsetY;
    this.reset_position = nums * size;
    console.log(this.reset_position);
  }

  componentDidMount() {
    frame_hooks.push((velocity) => {
      const position = this.position;
      const next_position = position < -size ? position + this.reset_position : position + velocity;
      this.element.style.transform = `matrix(1, 0, 0, 1, 0, ${next_position})`;
      this.position = next_position;
    });
  }

  render() {
    const translateY = this.position;
    const style = ST(
      { height: size },
      { transform: `matrix(1, 0, 0, 1, 0, ${translateY})` }
    );
    return <div ref={ele => this.element = ele} className="fly-box" style={style}>fly box : {this.props.id}</div>;
  }
  
}

export default class OneArmBandit extends React.Component {
  renderBox(nums) {
    const boxs = [];
    for(let i = 0; i < nums; i++){
      boxs.push(<Box offsetY={i * size} key={i} id={i}/>);
    }
    return boxs;
  }

  toggle_take_frame(taking) {
    if(taking) {
      this.takeID = ticker_frame(enter_frame);
    } else {
      this.takeID && cancel_frame(this.takeID);
      this.takeID = null;
    }
  }

  componentDidMount() {
    this.toggle_take_frame(true);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() { 
    return (
      <div className="one-arm-bandit" style={{ height: 2 * size }}>
        {this.renderBox(nums)}
      </div>
    )
  }

  componentWillUnmount() {
    this.toggle_take_frame(false);
  }
}
