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

  state = { show: false, text: [] }

  open = () => {
    this.setState({show: true})
  }

  cancel = () => {
    this.setState({show: false})
  }

  confirm = (text, index) => {
    this.setState({show: false, text})
  }
  render() {

    return (
        <div>
          <button onClick={this.open}>open</button>
          {this.state.text.join('')}
          <AreaSelector show={this.state.show}
                        onChange={this.confirm}
                        onCancel={this.cancel}
          />
        </div>
    )
  }
}
