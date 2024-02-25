const initialState = {
    category: [],
    loading: false,
    error: null,
  };
  
  export default function categoryReducers(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_CATEGORY_START':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_CATEGORY_SUCCESS':
        return {
          ...state,
          loading: false,
          category: action.payload,
        };
      case 'FETCH_CATEGORY_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  