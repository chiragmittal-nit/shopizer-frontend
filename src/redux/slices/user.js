import { createSlice, createSelector } from '@reduxjs/toolkit';
import auth from '../../services/authService';

import { registerUser } from '../../services/userSevice';
import { emptyCart } from './cart';

const _ = require('lodash');

const currUser = auth.getCurrentUser();

const initialState = currUser
  ? { currentUser: currUser, error: null, isLoggedIn: true }
  : { currentUser: null, error: null, isLoggedIn: false };

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUserStart: (state, action) => {},

    registerUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoggedIn = false;
    },
    registerUserFailure: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    },

    loginUserStart: (state, action) => {
      state.error = null;
    },

    loginUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoggedIn = true;
    },
    loginUserFailure: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    logoutUser: (state, action) => {
      state.currentUser = state.error = null;
      state.isLoggedIn = false;
    },
  },
});

export default user.reducer;
// export const {} = user.actions;

export const registerUserAsync = (newUser) => (dispatch) => {
  const { registerUserStart, registerUserSuccess, registerUserFailure } =
    user.actions;
  dispatch(registerUserStart());

  registerUser(newUser)
    .then((response) => {
      dispatch(registerUserSuccess(response.data));
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    })
    .catch((err) => {
      if (!err.response)
        return dispatch(
          registerUserFailure('Internal Server Error, Try After Some time.')
        );
      return dispatch(registerUserFailure(err.response.data));
    });
};
export const loginUserAsync = (credentials) => (dispatch) => {
  const { loginUserStart, loginUserSuccess, loginUserFailure } = user.actions;
  dispatch(loginUserStart());

  auth
    .loginUser(credentials)
    .then(({ data: jwt }) => {
      localStorage.setItem(process.env.REACT_APP_tokenKey, jwt);
      dispatch(
        loginUserSuccess(
          _.pick(auth.getCurrentUser(), ['name', 'email', '_id'])
        )
      );
      window.location = '/';
    })
    .catch((err) => {
      if (!err.response)
        return dispatch(
          loginUserFailure('Internal Server Error, Try After Some time.')
        );
      return dispatch(loginUserFailure(err.response.data));
    });
};

export const loginUserFromStorage = (user) => (dispatch) => {
  const { loginUserStart, loginUserSuccess } = user.actions;
  dispatch(loginUserStart());
  return dispatch(loginUserSuccess(_.pick(user, ['name', 'email', '_id'])));
};

export const logout = (dispatch) => {
  auth.logout();
  dispatch(user.actions.logoutUser());
  dispatch(emptyCart());
  // window.location = '/';
};

export const getLoginError = () =>
  createSelector(
    (state) => state.user,
    (user) => user.error
  );
