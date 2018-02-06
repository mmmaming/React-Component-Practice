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
            <li>
              <a href="#/carousel">持续轮播</a>
            </li>
            <li>
              <a href="#/oneArmBandit">老虎机</a>
            </li>
            <li>
              <a href="#/areaSelector">地区选择器</a>
            </li>
            <li>
              <a href="#/switch">Switch</a>
            </li>
          </ul>
        </div>
    )
  }
}