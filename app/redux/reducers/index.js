import { combineReducers } from 'redux';
import userReducer from '../slices/userSlices';
import shopReducer from '../slices/ShopSlice'; 
import categoryReducers from './categoryData';
import favoriteShopsReducer from '../slices/favoriteShopsSlice';


const rootReducer = combineReducers({
  user: userReducer,
  shop:shopReducer,
  category:categoryReducers,
  favoriteShops: favoriteShopsReducer,
});

export default rootReducer;
  