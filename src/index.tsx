import {ThemeProvider} from "@mui/material";

import {configureStore} from "@reduxjs/toolkit";
import {blueprintReducer, CREATE_NEW_CANVAS_ACTION, PREPARE_FOR_NEW_CANVAS_ACTION} from "lib/redux/state/blueprintState";
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {darkTheme} from "usage/theme/sampleThemes";
import App from './App';
import './index.css';

import reportWebVitals from './reportWebVitals';
import './wdyr';

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [CREATE_NEW_CANVAS_ACTION, PREPARE_FOR_NEW_CANVAS_ACTION],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
  reducer: blueprintReducer
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <App/>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
