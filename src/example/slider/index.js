/**
 * Created by Ma Ming on 2017/10/16.
 */
// library
import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
// component
import {
    Slider
} from '../../component';

@observer
export default class SliderExample extends React.Component {

  @observable list = [];
  addData = () => {
    this.list.push('cc','ed','ff');
  }
  render() {
    return (
        <div>
          <div style={{width: '220px', height: '100px', marginLeft: '50px', marginTop: '200px'}}>
            <Slider activeIndex={0}>
              <Slider.Item>
                000000000000000000
              </Slider.Item>
              <Slider.Item>
                11111111111111111
              </Slider.Item>
              <Slider.Item>
                22222222222222222
              </Slider.Item>
              {
                this.list.map((v, i) => <Slider.Item key={i}>{v}</Slider.Item>)
              }
            </Slider>
          </div>
          <button onClick={this.addData}>添加数据</button>
        </div>
    )
  }
}
