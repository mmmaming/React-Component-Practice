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
const history  = createBrowserHistory();
export default class App extends React.Component {
  render() {
    return (
        <Router history={history}>
           <div>
             <Route exact path="/" component={Home} />
             <Route path="/slider" component={SliderExample} />
           </div>
         </Router>
    )
  }
}