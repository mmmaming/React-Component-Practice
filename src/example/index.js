/**
 * Created by Ma Ming on 2017/10/16.
 */
// library
import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createHashHistory';

// component
import Home from './home';
import SliderExample from './slider';
import ButtonExample from './button';
import CurveExample from './curve';
import SustainedCarouselExample from './sustained-carousel';
import OneArmBanditExample from './one-arm-bandit';
import AreaSelectorExample from './area-selector';
import SwitchExample from './switch';
const history  = createBrowserHistory();
export default class App extends React.Component {
  render() {
    return (
        <Router history={history}>
           <div>
             <Route exact path="/" component={Home} />
             <Route path="/slider" component={SliderExample} />
             <Route path="/button" component={ButtonExample} />
             <Route path="/curve" component={CurveExample} />
             <Route path="/carousel" component={SustainedCarouselExample} />
             <Route path="/oneArmBandit" component={OneArmBanditExample} />
             <Route path="/areaSelector" component={AreaSelectorExample} />
             <Route path="/switch" component={SwitchExample} />
           </div>
         </Router>
    )
  }
}
