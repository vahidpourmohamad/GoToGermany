import { createContext, useReducer } from 'react';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const storeData = async (userData) => {
    try {
      const { userId, userName, userPhone, userAvatar, userGender } = userData;
      await AsyncStorage.setItem('@userId', userId);
      await AsyncStorage.setItem('@userName', userName);
      await AsyncStorage.setItem('@userPhone', userPhone);
      await AsyncStorage.setItem('@userAvatar', userAvatar);
      await AsyncStorage.setItem('@userGender', userGender.toString());
    } catch (e) {
      //console.log(e);
    }
  };

  const login = (userData) => {
    dispatch({ type: 'LOGIN', payload: userData });
    storeData(userData);
  };

  function logout() {
    dispatch({ type: 'LOGOUT' });
    storeData(initialState);
  }
  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        userName: state.userName,
        userPhone: state.userPhone,
        userAvatar: state.userAvatar,
        userGender: state.useGender,
        login,
        logout,
      }}
      {...props}
    />
  );
}

const initialState = {
  userId: null,
  userName: null,
  userPhone: null,
  userAvatar: null,
  userGender: null,
};

const AuthContext = createContext({
  userId: null,
  userName: null,
  userPhone: null,
  userAvatar: null,
  userGender: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        userPhone: action.payload.userPhone,
        userAvatar: action.payload.userAvatar,
        userGender: action.payload.userGender,
      };
    case 'LOGOUT':
      return {
        ...state,
        userId: null,
        userName: null,
        userPhone: null,
        userAvatar: null,
        userGender: null,
      };
    default:
      return state;
  }
}
export { AuthContext, AuthProvider };
