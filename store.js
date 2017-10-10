import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

const logger = createLogger();
const middleware = applyMiddleware(thunk, logger);

export default createStore(reducers, middleware);
