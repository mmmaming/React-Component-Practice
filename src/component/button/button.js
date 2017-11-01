/**
 * Created by Ma Ming on 2017/10/27.
 */
// library
import React from 'react';
import PropTypes from 'prop-types';

// style
import './index.css';

// util
import {
    classnames
} from '../../utils';

export default class Button extends React.Component {

  getClassSet() {
    const {type, hollow} = this.props;
    const classes = {};
    if (type) {
      hollow ? classes[`button-${type}-hollow`] = true : classes[`button-${type}`] = true;
    }
    return classes;
  }
  render() {
    const {children} = this.props;
    return (
        <div className={classnames('button', this.getClassSet())}>
          {children}
        </div>
    )
  }
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  hollow: PropTypes.bool,
  customStyle: PropTypes.string,
  type: PropTypes.string
};