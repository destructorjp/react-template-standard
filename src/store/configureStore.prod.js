import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const middleware = [thunk];

/* istanbul ignore next */
export default function configureStore(initialState = {}) {
  const enhancer = compose(applyMiddleware(...middleware));

  const store = createStore(reducers, initialState, enhancer);

  const persistor = persistStore(store);

  return { store, persistor };
}
