import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import history from './history';
import common from '../features/common/redux/commonSlice';
import wallet from '../features/home/redux/walletSlice';

const reducerMap = {
  router: connectRouter(history),
  common,
  wallet,
};

export default combineReducers(reducerMap);
