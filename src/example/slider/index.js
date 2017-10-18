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

  render() {
    console.log(this.list);
    return (
        <div style={{width: '220px', height: '100px', marginLeft: '50px', marginTop: '200px'}}>
          <Slider activeIndex={1}>
            <Slider.Item>
              abc
            </Slider.Item>
            <Slider.Item>
              def
            </Slider.Item>
            <Slider.Item>
              ghi
            </Slider.Item>
            {
              this.list.map((v, i) => <Slider.Item key={i}>{v}</Slider.Item>)
            }
          </Slider>
        </div>
    )
  }
}
