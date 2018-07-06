import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import React from 'react';

import Home from './routes/home';
import configureStore from './store/configureStore';

// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

const { persistor, store } = configureStore();

export default class App extends React.Component {
  /** Gets fired when the route changes.
   *  @param {Object} event   "change" event from [preact-router](http://git.io/preact-router)
   *  @param {string} event.url The newly routed URL
   */

  render() {
    return (
      <div id="app">
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <Switch>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}
