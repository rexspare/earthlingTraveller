import reducer from './reducer';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
export const store = createStore(reducer, devToolsEnhancer());