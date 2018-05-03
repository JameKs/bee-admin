import { combineReducers } from 'redux';
import frames from './frames';
import layouts from './layouts';
import routes from './routes';
import error from './error';

const rootReducer = combineReducers({ frames, layouts, routes, error });
export default rootReducer;
