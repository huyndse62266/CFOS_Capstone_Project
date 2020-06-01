import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './configStore';

const getLocale = () => ({ locale: 'en', messages: {} });
const app = (
  <Provider store={store}>
    <IntlProvider {...getLocale()}>
      <HashRouter>
        <App />
      </HashRouter>
    </IntlProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
