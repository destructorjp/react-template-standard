import { applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-js'; // eslint-disable-line import/no-extraneous-dependencies

import reducers from '../reducers';

const logger = createLogger({
  collapsed: true
});

const middleware = [thunk, logger];

/* istanbul ignore next */
export default function configureStore(initialState = {}) {
  const enhancer = compose(applyMiddleware(...middleware));

  const store = Reactotron.createStore(reducers, initialState, enhancer);

  const persistor = persistStore(store);

  return { store, persistor };
}
