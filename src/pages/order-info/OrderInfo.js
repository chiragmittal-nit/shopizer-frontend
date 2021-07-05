import React from 'react';
import { getOrderById } from './../../redux/slices/order';
import { connect } from 'react-redux';
// import Error from './../../components/error/Error';
// import Loader from './../../components/loader/Loader';

function OrderInfo({ orderDetails }) {
  return (
    <div>
      {/* {error && <Error message="Something went wrong" />}
      {loading && <Loader message="Hold Tight !! Getting your order info. " />}
      {order && ( */}
      <div>
        <div className="row justify-content-center">
          <div className="col-md-5 card">
            <h3>Items In Your Order</h3>
            <hr />
            {orderDetails.orderedItems.map((item) => {
              return (
                <div className="orderitem text-start">
                  <h6>{item.name}</h6>
                  <h6>
                    Quantity : <strong>{item.quantity}</strong>
                  </h6>
                  <h6>
                    Price : {item.quantity} * {item.price} ={' '}
                    {item.price * item.quantity}
                  </h6>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="col-md-5 text-end card">
            <h3>Order Details</h3>

            <hr />

            <p>
              <strong>Order Id : </strong>
              {orderDetails._id}
            </p>
            <p>
              <strong>Total Amount : </strong>
              {orderDetails.orderAmount}
            </p>
            <p>
              <strong>Date Of order :</strong>{' '}
              {orderDetails.createdAt.substring(0, 10)}
            </p>
            <p>
              <strong>Transaction ID :</strong> {orderDetails.transactionId}
            </p>

            {orderDetails.isDelivered ? (
              <h4>Order Delivered</h4>
            ) : (
              <h4>Order Placed</h4>
            )}

            <hr />

            <div className="text-right">
              <h3>Shipping Details</h3>

              <hr />

              <p className="text-right">
                <strong>Address : </strong>
                {orderDetails.shippingAddress.address}
              </p>
              <p className="text-right">
                <strong>City : </strong>
                {orderDetails.shippingAddress.city}
              </p>

              <p className="text-right">
                <strong>Country : </strong>
                {orderDetails.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { orderId },
    },
  }
) => ({ orderDetails: getOrderById(orderId)(state) });

export default connect(mapStateToProps)(OrderInfo);
