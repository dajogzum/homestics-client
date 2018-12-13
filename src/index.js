import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import reducers from './reducers';
import {MainScreen} from './components/MainScreen'
import {Navigation} from './components/Navigation'
import './index.css';

const store = createStore(reducers);

ReactDOM.render(<Provider store={store}>
  <MainScreen/>
</Provider>, document.getElementById('MainContainer'));
ReactDOM.render(<Provider store={store}>
  <Navigation/>
</Provider>, document.getElementById('TabBar'));

serviceWorker.register();
