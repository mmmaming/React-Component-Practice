/**
 * Created on 2018/2/6.
 */
// library
import React from 'react';
//component

// style
import './switch.css';
export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {checked: props.checked}
  }

  componentWillReceiveProps(props) {
    this.setState({checked: props.checked});
  }

  onChange = () => {
    this.setState({checked: !this.state.checked}, () => this.props.onChange(this.state.checked));

  }
  render() {
    return (
        <label className="switch">
          <input onChange={this.onChange} checked={this.state.checked} type="checkbox" className="switch-wrapper" />
          <div className="switch-circle"></div>
        </label>
    )
  }
}
