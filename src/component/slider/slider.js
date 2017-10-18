/**
 * Created by Ma Ming on 2017/10/16.
 */
// library
import React from 'react';
import PropTypes from 'prop-types';
// style
import './slider.css';
import style from './style'

// component
import SliderItem from './slider-item';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeDistance: 0,
      activeIndex: props.activeIndex
    }
  }

  componentDidMount() {
    this.setState({
      swipeDistance: '-' + 100 / this._count * this.state.activeIndex + '%'
    })
  }

  // 子元素个数
  _count = React.Children.count(this.props.children);

  // 手指滑动距离
  _swipeDistance = 0;

  // 移动组件
  swipe = () => {
    this.setState({
      swipeDistance: this._swipeDistance + '%'
    })
  };

  swipeEnd = (direction) => {
    switch(direction) {
      case 1:
        break;
      case -1:
        break;
      default:
        break;
    }
  }

  // 坐标及方向对象
  _touchObject = {};
  // 触摸事件
  getTouchEvents = () => {
    var self = this;
    return {
      onTouchStart(e) {
        const startX = e.nativeEvent.changedTouches[0].clientX;
        Object.assign(self._touchObject, {startX: startX});
        self.ticker = setInterval(self.swipe, 50);
      },
      onTouchMove(e) {
        const direction = self.getDirection(self._touchObject.startX, e.nativeEvent.changedTouches[0].clientX);
        const endX = e.nativeEvent.changedTouches[0].clientX;
        Object.assign(self._touchObject, {direction: direction, endX: endX});
        self.setSwipeDistance();
      },
      onTouchEnd(e) {
        const endX = e.nativeEvent.changedTouches[0].clientX;
        Object.assign(self._touchObject, {endX: endX});

        clearInterval(self.ticker);

        // 当移动距离超过一半时，滑动到下一个item，否则退回原item
        const needSwipe = Math.abs(endX - self._touchObject.startX) >= (self.refs.ul.offsetWidth / self._count / 2);
        if (needSwipe) {

        }
      },
      onTouchCancel(e) {
        console.log(123);
      }
    }
  };



  /*
   * 方向:
   * 1 : prev
   * -1: next
   * 0 : 没有移动
   * */
  getDirection = (startX, endX) => {
    let direction = endX - startX;
    if(direction > 0) {
      return 1;
    }
    if(direction < 0) {
      return -1;
    }
    return 0;
  }

  // 获取滑动距离
  setSwipeDistance = () => {
    //当前显示宽度占总宽度的百分比
    const displayPercentage = 100 / this._count;
    // 当前移动距离占显示宽度的百分比
    const swipePercentage = Math.abs(this._touchObject.endX - this._touchObject.startX) / (this.refs.ul.offsetWidth / this._count);
    // 目前已经移动过的百分比 + 移动时transform的移动百分比
    this._swipeDistance = (displayPercentage * this.props.activeIndex) + swipePercentage * displayPercentage * this._touchObject.direction;
  };

  render() {
    return (
        <div style={style.sliderWrapper}>
          <ul
              ref="ul"
              style={{
                transform: `translate3d(${this.state.swipeDistance}, 0, 0)`,
                width: this._count * 100 + '%',
                ...style.sliderUl}}
              {...this.getTouchEvents()}
          >
            {this.props.children}
          </ul>
        </div>
    )
  }
}

Slider.propTypes = {
  activeIndex: PropTypes.number
};

Slider.defaultProps = {
  activeIndex: 0
}

Slider.Item = SliderItem;

export default Slider;