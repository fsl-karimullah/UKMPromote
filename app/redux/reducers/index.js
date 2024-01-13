import { combineReducers } from 'redux';
import userReducer from '../slices/userSlices';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
 