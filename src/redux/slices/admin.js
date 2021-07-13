import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  deleteUser,
  fetchAllUsers,
  fetchAllOrdersList,
} from '../../services/adminService';

const admin = createSlice({
  name: 'admin',
  initialState: { users: [], isLoading: false, error: null, orders: [] },
  reducers: {
    fetchAllUsersStart: (state, action) => {
      state.isLoading = true;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload;
    },
    fetchAllUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    deleteUserRequest: (state, action) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.isLoading = false;
      const deletedUser = action.payload;
      const deletedUserIdx = state.users.findIndex(
        (user) => user._id === deletedUser._id
      );
      state.users.splice(deletedUserIdx, 1);
      state.error = null;

      state.users = action.payload;
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchAllOrdersListRequest: (state, action) => {
      state.isLoading = true;
    },

    fetchAllOrdersListSuccess: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
    fetchAllOrdersListFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
export default admin.reducer;

export const fetchAllUsersAsync = () => (dispatch) => {
  const { fetchAllUsersStart, fetchAllUsersSuccess, fetchAllUsersFailure } =
    admin.actions;

  dispatch(fetchAllUsersStart());
  fetchAllUsers()
    .then((res) => {
      dispatch(fetchAllUsersSuccess(res.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(fetchAllUsersFailure(err.response.data));
      } else {
        dispatch(fetchAllUsersFailure('Internal Server Error !!'));
      }
    });
};

export const deleteUserAsync = (id) => (dispatch) => {
  const { deleteUserRequest, deleteUserSuccess, deleteUserFailure } =
    admin.actions;

  dispatch(deleteUserRequest());
  deleteUser(id)
    .then((res) => {
      dispatch(deleteUserSuccess(res.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(deleteUserFailure(err.response.data));
      } else {
        dispatch(deleteUserFailure('Internal Server Error !!'));
      }
    });
};

export const fetchAllOrdersListAsync = () => (dispatch) => {
  const {
    fetchAllOrdersListRequest,
    fetchAllOrdersListSuccess,
    fetchAllOrdersListFailure,
  } = admin.actions;

  dispatch(fetchAllOrdersListRequest());
  fetchAllOrdersList()
    .then((res) => {
      dispatch(fetchAllOrdersListSuccess(res.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(fetchAllOrdersListFailure(err.response.data));
      } else {
        dispatch(fetchAllOrdersListFailure('Internal Server Error !!'));
      }
    });
};

const getAllOrdersFromAdmin = createSelector(
  (state) => state.admin,
  (admin) => admin.orders
);

export const getOrderByIdFromAdmin = (orderId) =>
  createSelector(getAllOrdersFromAdmin, (orders) =>
    orders ? orders.find((order) => order._id === orderId) : null
  );
