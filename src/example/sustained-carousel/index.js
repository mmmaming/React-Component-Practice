/**
 * Created by Ma Ming on 2017/11/10.
 */
/**
 * Created by Ma Ming on 2017/10/27.
 */
// library
import React from 'react';
import {observer} from 'mobx-react';
// component
import {
    SustainedCarousel
} from '../../component';

@observer
export default class SustainedCarouselExample extends React.Component {

  render() {
    const list = ['1-500积分', '2-200优惠券', '3-三张代金券', '4-6次抽奖机会'];

    return (
        <div style={{width: '600px', height: '200px'}}>
          <SustainedCarousel list={list}/>
        </div>
    )
  }
}
