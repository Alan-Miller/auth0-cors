import { createStore, applyMiddleware } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reducer from './users';

export default createStore(reducer, undefined, applyMiddleware(reduxPromiseMiddleware()));