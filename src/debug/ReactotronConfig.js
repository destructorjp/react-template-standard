import Reactotron from 'reactotron-react-js'; // eslint-disable-line import/no-extraneous-dependencies
import packagejson from '../../package.json';
import { reactotronRedux } from 'reactotron-redux'; // eslint-disable-line import/no-extraneous-dependencies

Reactotron.configure({ name: packagejson.name })
  .use(reactotronRedux())
  .connect();
