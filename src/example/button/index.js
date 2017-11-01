/**
 * Created by Ma Ming on 2017/10/27.
 */
// library
import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
// component
import {
    Button
} from '../../component';

@observer
export default class ButtonExample extends React.Component {

  render() {
    return (
        <div>
          <Button type="primary" hollow={false}>呵呵</Button>
          <br/>
          <Button type="primary" hollow={true}>哈哈</Button>
        </div>
    )
  }
}
