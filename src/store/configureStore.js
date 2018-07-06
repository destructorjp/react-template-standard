let configureStore;

/* istanbul ignore else  */

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  configureStore = require('./configureStore.dev').default;
} else {
  configureStore = require('./configureStore.prod').default;
}
/* eslint-enable */

module.exports = configureStore;
