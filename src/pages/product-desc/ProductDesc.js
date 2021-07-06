import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Review from './../../components/review/Review';
import Error from './../../components/error/Error';
import Loader from './../../components/loader/Loader';
import { getProductById } from '../../redux/slices/product';
import { addItem } from '../../redux/slices/cart';

import './ProductDesc.scss';

function ProductDesc({ product, addItem, submittingReview }) {
  const [quantity, setQuantity] = React.useState(1);

  if (product)
    return submittingReview ? (
      <Loader message="Registering your valuable Feedback !!" />
    ) : (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="card p-2 m-2">
              <h5>{product.name}</h5>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="img-fluid big-img"
              />
              <p>{product.description}</p>
            </div>
          </div>
          <div className="col-md-6 text-start">
            <div className="m-2">
              <h5 className="text-capitalize">{`price : ${product.price}`}</h5>
              <hr />
              <h5 className="text-capitalize">select quantity : </h5>
              {product.countInStock > 0 ? (
                <>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock)].map((value, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <hr />
                  <button
                    type="button"
                    className="btn btn-dark text-uppercase"
                    onClick={() => addItem(product, quantity)}
                  >
                    add to cart
                  </button>
                </>
              ) : (
                <p className="text-danger text-capitalize">Out of Stock</p>
              )}
            </div>
            <hr />
            <Review productId={product._id} />
          </div>
        </div>
      </div>
    );
  else {
    return (
      <Error
        message={
          <div>
            No Such Product Exist !! <Link to={'/'}>HomePage</Link>
          </div>
        }
      />
    );
  }
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  }
) => {
  return {
    product: getProductById(id)(state),
    submittingReview: state.product.submittingReview,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (product, quantity) => dispatch(addItem({ product, quantity })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDesc);
