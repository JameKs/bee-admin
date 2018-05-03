import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'stores';
import Routers from 'routers';
import registerServiceWorker from 'registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
