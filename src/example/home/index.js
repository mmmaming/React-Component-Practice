/**
 * Created by Ma Ming on 2017/10/16.
 */
// library
import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
        <div>
          <ul>
            <li>
              <a href="#/slider">轮播图</a>
            </li>
            <li>
              <a href="#/button">按钮</a>
            </li>

            <li>
              <a href="#/curve">曲线</a>
            </li>
          </ul>
        </div>
    )
  }
}