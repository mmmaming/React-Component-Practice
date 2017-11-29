import React from 'react';
import ReactDOM from 'react-dom';
import App from './example';

import registerServiceWorker from './registerServiceWorker';
import Perf from 'react-addons-perf'
window.Perf = Perf;
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
