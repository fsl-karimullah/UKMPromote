import { combineReducers } from 'redux';
import userReducer from '../slices/userSlices';
import shopReducer from '../slices/ShopSlice'; 


const rootReducer = combineReducers({
  user: userReducer,
  shop:shopReducer
});

export default rootReducer;
 