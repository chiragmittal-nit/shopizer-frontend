import React from "react";
import { connect } from "react-redux";
import Product from "../../components/product/Product.js";
import { fetchAllProductsAsync } from "../../redux/slices/product.js";

import "./HomePage.scss";

function HomePage({ products, error, isFetching, fetchAllProductsAsync }) {
  React.useEffect(() => {
    fetchAllProductsAsync();
  }, []);

  return (
    <>
      {isFetching ? (
        <h1>Loading ...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className='container'>
          <div className='row row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center'>
            {products.length &&
              products.map((product, index) => (
                <div key={product._id} className='col m-3'>
                  <Product {...product} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.product.isFetching,
    products: state.product.products,
    error: state.product.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllProductsAsync: () => dispatch(fetchAllProductsAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
