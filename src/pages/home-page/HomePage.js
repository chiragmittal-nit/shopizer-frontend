import React from 'react';
import { connect } from 'react-redux';
import Error from '../../components/error/Error.js';
import Filter from '../../components/filter/Filter.js';
import Loader from '../../components/loader/Loader.js';
import Product from '../../components/product/Product.js';
import {
  fetchAllProductsAsync,
  getFilteredProducts,
} from '../../redux/slices/product.js';

import './HomePage.scss';

function HomePage({ products, error, isFetching, fetchAllProductsAsync }) {
  React.useEffect(() => {
    fetchAllProductsAsync();
  }, []);

  return (
    <>
      {isFetching ? (
        <Loader message="Getting Good Stuff...." />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="container">
          <Filter />
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center">
            {products.length &&
              products.map((product) => (
                <div key={product._id} className="col m-3">
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
  const { product } = state;
  return {
    isFetching: product.isFetching,
    products: getFilteredProducts(state),
    error: product.error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllProductsAsync: () => dispatch(fetchAllProductsAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
