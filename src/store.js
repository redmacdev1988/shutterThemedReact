import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import photoReducer from './services/Gallery/reducers'

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(combineReducers({
    photoReducer
}), composeEnhancers(applyMiddleware(thunk)));

export default store;
