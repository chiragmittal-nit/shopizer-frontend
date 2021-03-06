import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteItem, updateItem } from '../../redux/slices/cart';
import StripeCheckoutButton from '../../components/stripe-checkout-button/StripeCheckoutButton';
import Loader from './../../components/loader/Loader';
import Error from './../../components/error/Error';

function CheckoutPage({
  cart: { items, totalQuantity },
  placeOrderError,
  placingOrder,
  updateItem,
  deleteItem,
}) {
  if (!totalQuantity)
    return (
      <div>
        Cart is Empty !!!! Please add items from <Link to="/">Home</Link>
      </div>
    );

  let amount = Object.keys(items).reduce(
    (acc, key) => acc + items[key].quantity * items[key].price,
    0
  );
  return (
    <div>
      {placingOrder ? (
        <Loader message="Placing Order ...." />
      ) : placeOrderError ? (
        <Error message={placeOrderError} />
      ) : (
        <div className="row mt-3 justify-content-center">
          <div className="col-md-8 card text-center shadow p-3 mb-5 bg-white rounded">
            <h2 className="text-center m-5">MY CART</h2>
            <table className="table table-bordered table-responsives-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(items).map((key) => {
                  const item = items[key];
                  return (
                    <tr key={key}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <select
                          value={item.quantity}
                          onChange={(e) => updateItem(item, e.target.value)}
                        >
                          {[...Array(item.countInStock).keys()].map(
                            (value, idx) => {
                              return (
                                <option key={idx} value={idx + 1}>
                                  {idx + 1}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </td>
                      <td>{item.quantity * item.price}</td>
                      <td>
                        <i
                          style={{ color: 'red', cursor: 'pointer' }}
                          className="far fa-trash-alt"
                          onClick={() => deleteItem(item)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <hr />

            <h3 className="tevaluet-cdxenter">Amount : {amount} RS/-</h3>

            <hr />

            <StripeCheckoutButton amount={amount} />
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  updateItem: (product, quantity) =>
    dispatch(updateItem({ product, quantity })),
  deleteItem: (product) => dispatch(deleteItem({ product })),
});

const mapStateToProps = (state) => ({
  cart: state.cart,
  placingOrder: state.order.isLoading,
  placeOrderError: state.order.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
