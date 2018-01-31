/**
 * Created on 2018/1/31.
 */

// library
import React from 'react';
// component
import {
    AreaSelector
} from '../../component';


export default class AreaSelectorExample extends React.Component {

  state = { show: false }

  open = () => {
    this.setState({show: true})
  }

  cancel = () => {
    console.log(1111);
    this.setState({show: false})
  }

  confirm = () => {
    console.log(222);
    this.setState({show: false})
  }
  render() {

    return (
        <div>
          <button onClick={this.open}>open</button>
          {this.state.show ? 'true' : 'false'}
          <AreaSelector show={this.state.show}
                        onChange={this.confirm}
                        onCancel={this.cancel}
          />
        </div>
    )
  }
}
