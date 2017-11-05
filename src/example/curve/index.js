/**
 * Created by Ma Ming on 2017/11/1.
 */
// library
import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
// component
import {
    Curve
} from '../../component';

@observer
export default class CurveExample extends React.Component {
  renderPoints = (item) => {

    if (item.type === 'gift') {
      return item.isOpen ? <div style={{width:'37px',height: '37px',border: '1px solid red'}}>{item.index}</div> : <div style={{width:'37px',height: '37px',border: '1px solid grey'}}>{item.index}</div>;
    }
    if (item.type === 'sign') {
      return item.isOpen ? <div style={{width:'37px',height: '37px',border: '1px solid black'}}>{item.index}</div> : <div style={{width:'37px',height: '37px',border: '1px solid grey'}}>{item.index}</div>;
    }
  }
  render() {
    const list = [{type: 'gift', isOpen: true, index: 1}, {type: 'gift', isOpen: false, index: 2},
      {type: 'sign', isOpen: false, index: 3},{type: 'sign', isOpen: true, index: 4},
      {type: 'gift', isOpen: true, index: 5}, {type: 'gift', isOpen: false, index: 6},
      {type: 'gift', isOpen: true, index: 7}, {type: 'gift', isOpen: false, index: 8},
      {type: 'gift', isOpen: true, index: 9}, {type: 'gift', isOpen: false, index: 10},
      {type: 'gift', isOpen: true, index: 11}, {type: 'gift', isOpen: false, index: 12},
      {type: 'sign', isOpen: true, index: 13}, {type: 'sign', isOpen: true, index: 14},
      {type: 'sign', isOpen: true, index: 15}, {type: 'sign', isOpen: true, index: 16},
      {type: 'sign', isOpen: true, index: 17}, {type: 'sign', isOpen: true, index: 18},
      {type: 'sign', isOpen: true, index: 19}, {type: 'sign', isOpen: true, index: 20},
      {type: 'sign', isOpen: true, index: 21}, {type: 'sign', isOpen: true, index: 22},
      {type: 'sign', isOpen: true, index: 23}, {type: 'sign', isOpen: true, index: 24},
      {type: 'sign', isOpen: true, index: 25}, {type: 'sign', isOpen: true, index: 26}];
    return (
        <div style={{height: '3000px', width: '1000px'}}>
          <Curve list={list} itemSize={37} renderPoints={this.renderPoints} columnNum={6} lineWidth={280} colGap={60} padding={50}/>
        </div>
    )
  }
}