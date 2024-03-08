const initialState = {
  shops: [],
  loading: false,
  error: null,
  allShops:[]
};

export default function shopReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_SHOPS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_SHOPS_SUCCESS':
      return {
        ...state,
        loading: false,
        shops: action.payload,
      };
    case 'FETCH_SHOPS_SUCCESS_ALL':
      return {
        ...state,
        loading: false,
        allShops: action.payload,
      };
    case 'FETCH_SHOPS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
