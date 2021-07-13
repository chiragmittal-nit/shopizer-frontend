import { createSlice, createSelector } from '@reduxjs/toolkit';
import auth from '../../services/authService';

import { registerUser, updateUserDetails } from '../../services/userSevice';
import { emptyCart } from './cart';

const _ = require('lodash');

const currUser = auth.getCurrentUser();

const initialState = currUser
  ? { currentUser: currUser, error: null, isLoggedIn: true, isLoading: false }
  : { currentUser: null, error: null, isLoggedIn: false, isLoading: false };

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUserRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },

    registerUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoggedIn = false;
    },
    registerUserFailure: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    },

    updateUserDetailsRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },

    updateUserDetailsSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoggedIn = false;
    },
    updateUserDetailsFailure: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    loginUserRequest: (state, action) => {
      state.error = null;
      state.isLoading = true;
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
  const { registerUserRequest, registerUserSuccess, registerUserFailure } =
    user.actions;
  dispatch(registerUserRequest());

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
  const { loginUserRequest, loginUserSuccess, loginUserFailure } = user.actions;
  dispatch(loginUserRequest());

  auth
    .loginUser(credentials)
    .then(({ data: jwt }) => {
      console.log('logged in');
      localStorage.setItem(process.env.REACT_APP_tokenKey, jwt);
      dispatch(
        loginUserSuccess(
          _.pick(auth.getCurrentUser(), ['name', 'email', '_id'])
        )
      );
      window.location = '/';
    })
    .catch((err) => {
      if (!err.response) {
        dispatch(
          loginUserFailure('Internal Server Error, Try After Some time.')
        );
      } else {
        dispatch(loginUserFailure(err.response.data));
      }
    });
};

export const updateUserDetailsAsync = (updatedUser) => (dispatch) => {
  const {
    updateUserDetailsRequest,
    updateUserDetailsFailure,
    updateUserDetailsSuccess,
  } = user.actions;

  dispatch(updateUserDetailsRequest());
  updateUserDetails(updatedUser._id, updatedUser)
    .then((res) => {
      dispatch(updateUserDetailsSuccess(res.data));
      dispatch(logout());
    })
    .catch((err) => {
      console.log(err);
      if (err.response)
        return dispatch(updateUserDetailsFailure(err.response.data));
      else
        return dispatch(
          updateUserDetailsFailure(
            'Internal Server Error, Try After Some time.'
          )
        );
    });
};

export const loginUserFromStorage = (user) => (dispatch) => {
  const { loginUserRequest, loginUserSuccess } = user.actions;
  dispatch(loginUserRequest());
  return dispatch(loginUserSuccess(_.pick(user, ['name', 'email', '_id'])));
};

export const logout = () => (dispatch) => {
  auth.logout();
  dispatch(user.actions.logoutUser());
  dispatch(emptyCart());
  window.location = '/login';
};

export const getLoginError = () =>
  createSelector(
    (state) => state.user,
    (user) => user.error
  );
