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
        1,2,3,4,5,6,7
    ];
    return (
        <div>
          <OneArmBandit list={list}/>
        </div>
    )
  }
}