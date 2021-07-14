import React from 'react';
import ReactDOM from 'react-dom';

//import App from './App';

import CustomRoutes from './Routes';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CustomRoutes />, document.getElementById('root'));
registerServiceWorker();
