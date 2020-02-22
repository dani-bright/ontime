import {loadState, saveState} from "./localStorage";
import {createStore} from "redux";
import routeReducer from "./reducers";
import {throttle} from 'lodash';

//add to store for dev
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(routeReducer, loadState());


//Wrapping the callback in a throttle ensures that the inner function that is passed in is not going to be called more often than the number of milliseconds that is specified
store.subscribe(throttle(() => {
    saveState({
        user: store.getState().user,
    });
}, 1000));

