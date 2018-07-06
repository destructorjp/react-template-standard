require('dotenv').config();

const env = process.env;

const { NODE_ENV } = env;

const config = Object.keys(env).reduce((acc, key) => {
  const reg = new RegExp(`^REACT_APP_${NODE_ENV.toUpperCase()}_(.+)`);

  if (key.match(reg)) {
    return {
      ...acc,
      [key.match(reg)[1]]: env[key]
    };
  }

  return acc;
}, {});

export default config;
