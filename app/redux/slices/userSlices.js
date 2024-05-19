import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  data: {},
  isLogin: false,
  isLoading: true, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.data = action.payload; 
      state.isLogin = true;
      saveUserDataToStorage(action.payload); 
    },
    resetUser: (state) => {
      state.data = {};
      state.isLogin = false;
      removeUserDataFromStorage(); 
    },
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setLoginStatus: (state, action) => {
      state.isLogin = action.payload;
    },
    fetchUserDataFromStorage: (state, action) => {
      state.isLoading = true;
    },
    fetchUserDataFromStorageSuccess: (state, action) => {
      state.data = action.payload;
      state.isLogin = true;
      state.isLoading = false;
    },
    fetchUserDataFromStorageFailure: (state, action) => {
      state.isLoading = false;
    },
  },
});

const saveUserDataToStorage = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    await AsyncStorage.setItem('isLogin', JSON.stringify(true));
  } catch (error) {
    console.error('Error saving user data to AsyncStorage:', error);
  }
};

const removeUserDataFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('isLogin');
  } catch (error) {
    console.error('Error removing user data from AsyncStorage:', error);
  }
};

export const fetchUserDataFromStorageAsync = () => async (dispatch) => {
  try {
    dispatch(fetchUserDataFromStorage());
    const userData = await AsyncStorage.getItem('userData');
    if (userData !== null) {
      dispatch(fetchUserDataFromStorageSuccess(JSON.parse(userData)));
    } else {
      dispatch(fetchUserDataFromStorageFailure());
    }
  } catch (error) {
    console.error('Error fetching user data from AsyncStorage:', error);
    dispatch(fetchUserDataFromStorageFailure());
  }
};

export const { registerUser, resetUser, setUserData, setLoginStatus, fetchUserDataFromStorage, fetchUserDataFromStorageSuccess, fetchUserDataFromStorageFailure } = userSlice.actions;
export default userSlice.reducer;
