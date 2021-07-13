import React from 'react';
import { connect } from 'react-redux';
import { fetchAllUsersAsync } from '../../redux/slices/admin';
import { getCurrentUser } from './../../services/authService';
import Loader from './../../components/loader/Loader';
import Error from './../../components/error/Error';
import { deleteUserAsync } from './../../redux/slices/admin';

function UserList({
  admin: { users, error, isLoading },
  fetchAllUsers,
  deleteUser,
}) {
  React.useEffect(() => {
    fetchAllUsers();
  }, []);

  return isLoading ? (
    <Loader message="Getting users !!!" />
  ) : error ? (
    <Error message={error} />
  ) : (
    <div>
      <h3>Users List</h3>
      <table className="table table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>IsAdmin</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users &&
            users.length > 0 &&
            users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="fas fa-check text-success" />
                    ) : (
                      <i className="fas fa-times text-danger " />
                    )}
                  </td>
                  <td>
                    {getCurrentUser().email === user.email ? (
                      <button
                        className="fas fa-trash-alt"
                        style={{
                          color: 'grey',
                          background: 'white',
                          cursor: 'no-drop',
                          border: 'none',
                        }}
                        disabled
                      />
                    ) : (
                      <button
                        className="far fa-trash-alt"
                        style={{
                          color: 'red',
                          background: 'white',
                          cursor: 'pointer',
                          border: 'none',
                        }}
                        onClick={() => deleteUser(user._id)}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchAllUsers: () => dispatch(fetchAllUsersAsync()),
  deleteUser: (id) => dispatch(deleteUserAsync(id)),
});

const mapStateToProps = (state) => ({
  admin: state.admin,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
