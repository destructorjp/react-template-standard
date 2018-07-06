require('dotenv').config();

const env = process.env;

const config = Object.keys(env).reduce((acc, key) => {
  const reg = new RegExp(`^REACT_APP_(.+)`);

  if (key.match(reg)) {
    return {
      ...acc,
      [key.match(reg)[1]]: env[key]
    };
  }

  return acc;
}, {});

export default config;
