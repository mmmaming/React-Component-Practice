/**
 * Created by Ma Ming on 2017/10/16.
 */
// library
import React from 'react';

// style
import style from './style'

class SliderItem extends React.Component {
  render() {
    return (
        <li style={{...style.sliderLi}}>
          {this.props.children}
        </li>
    )
  }
}

export default SliderItem;