import {createStore} from "redux";
import reducers from '../reducers'

const store = createStore(reducers);

// Enable debugging store only on development
if (process.env.NODE_ENV === 'development') {
    window.store = store;
}

export default store
