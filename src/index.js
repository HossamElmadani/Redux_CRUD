import React from "react";
import ReactDOM from "react-dom";

import store from './Redux_CRUD/app/Store';

import { Provider } from 'react-redux';

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  rootElement
);






