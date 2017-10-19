/**
 * Created by Ma Ming on 2017/10/16.
 */

// library
import React from 'react';
// style
import style from './style'
export default class Dots extends React.Component {
  render() {
    const icon = [];
    for (let i = 0; i < this.props.count; i++) {
      icon.push(<div key={i} style={{
        background  : this.props.active === i ? "#ff6f22" : 'rgba(255,111,34,0.30',
        width       : "7px",
        height      : "7px",
        borderRadius: "100%",
        float       : 'left',
        margin      : '4px',
      }}></div>)
    }
    return (
        <div style={style.dots}>{icon}</div>
    )
  }
}
