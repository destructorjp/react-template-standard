import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

export default persistCombineReducers(
  {
    key: 'root',
    storage,
    whitelist: []
  },
  {}
);
