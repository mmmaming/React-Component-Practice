/**
 * Created by Ma Ming on 2017/11/10.
 */
import React from 'react';
import PropTypes from 'prop-types';


class Item extends React.Component {
  render() {
    const {name, style} = this.props;
    return (
        <li ref="li" style={{padding: '0', margin: '0',boxSizing: 'border-box',float: 'left', height: '100%', border:'1px solid red', display: 'flex', justifyContent: 'center', alignItems: 'center', ...style}}>{name}</li>
    )
  }
}

export default class SustainedCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemOffset: 0,
      index: 0
    }
  }
  componentDidMount() {
    // console.log(this.refs.lii.offsetWidth);
    this.setState({
      itemOffset: this.refs.liItem.refs.li.offsetWidth
    })
  }
  render() {
    const {list} = this.props;
    const listLength = list.length;
    const liWidth = 1 / listLength * 100 + "%";

    setTimeout(() => {
      if (this.state.index == 3) {
        this.setState({
          index: 0
        });
      } else {
        this.setState({
          index: this.state.index + 1
        });
      }
    }, 2000);

    return (
        <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
         <ul style={{transform: `translateX(${-this.state.index * this.state.itemOffset}px)`,  listStyle:'none',padding: '0', margin: '0', width: `${listLength}00%`}}>
           {
             list.map((item, key) => {
                 return <Item ref="liItem" style={{width: liWidth}} name={item} key={key}/>
               })
           }
         </ul>
        </div>
    )
  }
}

