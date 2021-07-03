import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { placeOrderAsync } from '../../redux/slices/order';
import { connect } from 'react-redux';

function StripeCheckoutButton({ amount, placeOrderAsync }) {
  const tokenHandler = (token) => {
    placeOrderAsync(token, amount);
  };
  return (
    <div>
      <StripeCheckout
        token={tokenHandler}
        stripeKey="pk_test_51ILMiwDb07U3tJmLUECY8ucLsEl9N2Zdlflz1hdVSxWA37QzD2UlEEaThGLSPjIKJmfFZvqqyqjfwMSsqhJldd1F00eYwputHp"
        amount={amount * 100} // since stipe assumes the amount to have 2 decimal places
        description={`Your total is ${`₹${amount}`}`}
        currency="INR"
        shippingAddress
      >
        <button type="button" className="btn btn-dark mx-auto">
          <strong>Pay Now</strong>
        </button>
      </StripeCheckout>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  placeOrderAsync: (token, amount) => {
    return dispatch(placeOrderAsync(token, amount));
  },
});
export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
