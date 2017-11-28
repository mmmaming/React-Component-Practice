/**
 * Created by Ma Ming on 2017/11/22.
 */
import React from 'react';
import {
    OneArmBandit
} from '../../component';
export default class OneArmBanditExample extends React.Component {
  render() {
   const list = [
        1,2,3,4,5,
    ];
    return (
        <div>
          <div style={{
            position: 'absolute',
            transform: 'translate(-50%)',
            left: '50%',
            top: '143px',
            width: '300px'
          }}>
            <OneArmBandit list={list}/>
          </div>
        </div>
    )
  }
}