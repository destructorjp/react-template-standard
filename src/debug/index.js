/* istanbul ignore else  */

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  require('./ReactotronConfig');
}
/* eslint-enable */

export default {};
