/* eslint-disable */
// style
import './one-arm-bandit-3d.css'
// library
import React from 'react'

// tools 角度转弧度
const RAD = deg => deg *  Math.PI / 180;

class Number3D {
  x = 0;
  y = 0;
  z = 0;
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class LotteryTicketItem extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
		return false;
  }

	render() {
		const {transform, index} = this.props;
    return (
				<div style={{transform: transform,
          width: '90%',
          height: '103px',
          background: 'lightblue',
          position: 'absolute',
          border: '2px solid white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {index}
				</div>
		)
	}
}

export default class OneArmBandit extends React.Component {

	state = { rotateX: 0, rotateY: 0 };
	size = 103;
	// 是否已经处于抽奖状态
	isRaffling = false;

	// 转动圈数
	numOfTurns = 4;

  start = () => {
		if (!this.isRaffling) {
				this.setState({ pressButton: true, rotateX: this.state.rotateX + this.numOfTurns * 360});
      this.isRaffling = true;
			}
  };

	end = () => {
		this.isRaffling = false;
	}

	left = () => {
    this.setState({
      rotateY: this.state.rotateY + 10
    });
  }

  right = () => {
    this.setState({
      rotateY: this.state.rotateY - 10
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.rotateX !== nextState.rotateX ||
        this.props.list.length !== nextProps.list.length ||
        this.state.rotateY !== nextState.rotateY) {
      return true;
    }
    return false;
  }

  renderBoxs(list) {
		const angle    = 360 / list.length;
    const half_height  = this.size * 0.5;
    const radius      = half_height / Math.tan(RAD(angle * 0.5));
    const boxs = [];
		const center  = new Number3D(0, 0, 0);
		let itemRotateX = 0;

		for(let i = 0, len = list.length; i < len; i++) {
			const radian = RAD(itemRotateX);
			const x = center.x;
      // item相对于自己的y轴偏移量
			const y = Math.sin(radian) * radius + center.y;
      // item相对于自己的Z轴偏移量
			const z = Math.cos(radian) * radius + center.z;
			const transform = [
				`translate3d(${x}px, ${y}px, ${z}px)`,
				`rotateX(-${itemRotateX}deg)`
			];
			boxs.push(<LotteryTicketItem key={i} index={i} transform={transform.join(' ')}/>);
			itemRotateX += angle;
		}

    return boxs;
  }

  render() {
    const {list} = this.props;
		const boxs = this.renderBoxs(list);
		const { rotateX, rotateY }  = this.state;
		const transform = [
			`translate3d(0, 0, 0px)`,
			`rotateY(${rotateY}deg)`,
			`rotateX(${rotateX}deg)`
		].join(' ');

		return (
				<div>
          <h1 className="h1">嗨皮老虎机</h1>
          <div className="oneArmBanditWrapper">
            <div ref={(mask) => this.mask = mask} className="maskBox">
              <div onTransitionEnd={this.end} className="oneArmBandit" style={{ transform }}>
                {boxs}
              </div>
            </div>
          </div>
         <div className="btnGroup">
           <button onClick={this.left} className="button">turn left</button>
           <button onClick={this.start} className="button">动起来</button>
           <button onClick={this.right} className="button">turn right</button>
         </div>
				</div>
    )
  }
}
