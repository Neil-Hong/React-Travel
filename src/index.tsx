import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "antd/dist/antd.css"
import './index.css';
import App from './App';
import "./i18n/configs"
import rootStore from "./redux/store"
import {PersistGate} from "redux-persist/integration/react"


ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

