import { combineReducers } from 'redux';
import favoriteShopsReducer from './favoriteShopsSlice';

const rootReducer = combineReducers({
  favoriteShops: favoriteShopsReducer,
});

export default rootReducer;
