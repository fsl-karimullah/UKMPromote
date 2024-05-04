const initialState = {
    news: [],
    loading: false,
    error: null,
    allNews:[]
  };
  
  export default function newsReducers(state = initialState, action) {
    switch (action.type) {
      case 'FETCH_NEWS_START':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_NEWS_SUCCESS':
        return {
          ...state,
          loading: false,
          news: action.payload,
        };
      case 'FETCH_NEWS_SUCCESS_ALL':
        return {
          ...state,
          loading: false,
          allNews: action.payload,
        };
      case 'FETCH_NEWS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  }
  