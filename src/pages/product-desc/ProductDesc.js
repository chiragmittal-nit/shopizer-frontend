import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "react-rating";

import shopData from "../../shopData";

import "./ProductDesc.scss";
import { getProductById } from "../../redux/slices/product";

function ProductDesc({ product }) {
  console.log(product);
  if (product)
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card p-2 m-2'>
              <h5>{product.name}</h5>
              <img
                src={product.imageUrl}
                alt={product.name}
                className='img-fluid big-img'
              />
              <p>{product.description}</p>
            </div>
          </div>
          <div className='col-md-6 text-start'>
            <div className='m-2'>
              <h5 className='text-capitalize'>{`price : ${product.price}`}</h5>
              <hr />
              <h5 className='text-capitalize'>select quantity : </h5>
              {product.countInStock > 0 ? (
                <>
                  <select>
                    {[...Array(product.countInStock)].map((value, index) => (
                      <option value={index + 1}>{index + 1}</option>
                    ))}
                  </select>
                  <hr />
                  <button type='button' className='btn btn-dark text-uppercase'>
                    add to cart
                  </button>
                </>
              ) : (
                <p className='text-danger text-capitalize'>Out of Stock</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div>
        No Such Product Exist !! <Link to={"/"}>HomePage</Link>
      </div>
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
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   fetchProductByIdAsync: (id) => dispatch(fetchProductByIdAsync(id)),
// });

export default connect(mapStateToProps)(ProductDesc);
