import React from 'react';
import ReactDOM from 'react-dom';



import App from './App';

import {Provider} from "react-redux";
import store from "./store";
import {useNavigate} from "react-router";

ReactDOM.render(
  <Provider store={store}>

      <App />

  </Provider>,
  document.getElementById('root')
);

