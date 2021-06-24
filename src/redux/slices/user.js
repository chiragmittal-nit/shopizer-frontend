import { createSlice } from '@reduxjs/toolkit';
import auth from '../../services/authService';

import { registerUser } from '../../services/userSevice';

const user = createSlice({
  name: 'user',
  initialState: { currentUser: null, error: '', isValidating: false },
  reducers: {
    registerUserStart: (state, action) => {
      state.isValidating = true;
    },

    registerUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isValidating = false;
    },
    registerUserFailure: (state, action) => {
      state.error = action.payload;
      state.isValidating = false;
    },

    loginUserStart: (state, action) => {
      state.isValidating = true;
    },

    loginUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isValidating = false;
    },
    loginUserFailure: (state, action) => {
      state.error = action.payload;
      state.isValidating = false;
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
      console.log(err);
      return dispatch(registerUserFailure(err.message));
    });
};
export const loginUserAsync = (credentials) => (dispatch) => {
  const { loginUserStart, loginUserSuccess, loginUserFailure } = user.actions;
  dispatch(loginUserStart());

  auth
    .loginUser(credentials)
    .then(({ data: jwt }) => {
      localStorage.setItem(process.env.REACT_APP_tokenKey, jwt);
      dispatch(loginUserSuccess(auth.getCurrentUser()));
      window.location.href = '/';
    })
    .catch((err) => {
      return dispatch(loginUserFailure(err.message));
    });
};
