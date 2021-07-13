import React from 'react';
import Loader from '../../components/loader/Loader';
import { connect } from 'react-redux';
import Error from '../../components/error/Error';
import { fetchOrdersListByUserIdAsync } from '../../redux/slices/order';

function UserOrdersList({
  ordersList,
  error,
  isLoading,
  fetchOrdersListByUserId,
  history,
}) {
  React.useEffect(() => {
    fetchOrdersListByUserId();
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loader message="Hold Tight. Getting your orders...." />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <h2>MY ORDERS</h2>

            <table className="table table-striped table-responsive-sm">
              <thead>
                <tr>
                  <th>Order ID</th>
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
                        <td>{order.orderAmount}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.transactionId}</td>
                        <td>
                          {order.isDelivered ? 'Delivered' : 'Order Placed'}
                        </td>
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
  order: { isLoading, error, orders: ordersList },
}) => ({
  isLoading,
  error,
  ordersList,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrdersListByUserId: () => dispatch(fetchOrdersListByUserIdAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserOrdersList);
