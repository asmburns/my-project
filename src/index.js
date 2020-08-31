import React from 'react';
import {render} from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware} from 'redux';
import {rootReducer} from './redux/rootRedcer';
import {Provider} from 'react-redux';
import { sessionService } from 'redux-react-session';
import thunk from  'redux-thunk';
import { forbiddenWordsMiddlewear } from './redux/middleware';
import createSagaMiddleware from 'redux-saga';
import { sagaWatcher } from './redux/sagas';
import './index.css'


const saga = createSagaMiddleware()


const store = createStore(rootReducer, compose(
    applyMiddleware(thunk,forbiddenWordsMiddlewear,saga),  
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

sessionService.initSessionService(store,{driver:'COOKIES'});

saga.run(sagaWatcher)

const app = (
  <Provider store={store}>
    <App></App>
  </Provider>
)

render(app,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
