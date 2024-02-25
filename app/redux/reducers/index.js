import { combineReducers } from 'redux';
import userReducer from '../slices/userSlices';
import shopReducer from '../slices/ShopSlice'; 
import categoryReducers from './categoryData';


const rootReducer = combineReducers({
  user: userReducer,
  shop:shopReducer,
  category:categoryReducers
});

export default rootReducer;
 