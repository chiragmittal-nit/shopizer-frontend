import React from 'react';
import Loader from '../../components/loader/Loader';
import { connect } from 'react-redux';
import Error from '../../components/error/Error';
import { fetchAllOrdersListAsync } from '../../redux/slices/admin';

function AllOrdersList({
  ordersList,
  error,
  isLoading,
  fetchAllOrdersList,
  history,
}) {
  React.useEffect(() => {
    fetchAllOrdersList();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader message="Hold Tight. Getting your orders...." />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="row mt-3">
          <div className="col-md-12">
            <h3>All ORDERS</h3>
            <table className="table table-striped table-responsive">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Email</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {ordersList &&
                  ordersList.map((order) => {
                    return (
                      <tr
                        onClick={() => {
                          history.push(`/order-info/${order._id}`);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{order._id}</td>
                        <td>{order.email}</td>
                        <td>{order.userId}</td>
                        <td>{order.orderAmount}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.transactionId}</td>
                        <td>{order.isDelivered ? 'Delivered' : 'Placed'}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({
  admin: { isLoading, error, orders: ordersList },
}) => ({
  isLoading,
  error,
  ordersList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllOrdersList: () => dispatch(fetchAllOrdersListAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AllOrdersList);
