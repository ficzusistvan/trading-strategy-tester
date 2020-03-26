import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';

import { setLanguage } from 'redux-polyglot/dist/actions';

//import roPhrases from './roPhrases.json';
import enPhrases from './enPhrases.json';
import { HashRouter } from 'react-router-dom';
//store.dispatch(setLanguage('ro', roPhrases));
store.dispatch(setLanguage('en', enPhrases));

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
