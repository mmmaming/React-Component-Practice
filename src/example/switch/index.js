/**
 * Created on 2018/2/6.
 */
// library
import React from 'react';
// component
import {
    Switch
} from '../../component';

export default class SwitchExample extends React.Component {
  onChange = (arg) => {
    console.log(arg);
  }
  render() {
    return (
        <div>
          <Switch onChange={this.onChange}/>
        </div>
    )
  }
}
