import React from 'react';
import { connect } from 'react-redux';
import Loader from '../loader/Loader';
import Error from '../error/Error';
import {
  deleteProductAsync,
  fetchAllProductsAsync,
} from '../../redux/slices/product';
import { Link } from 'react-router-dom';

function ProductList({
  product: { products, error, isFetching },
  fetchAllProducts,
  deleteProduct,
}) {
  React.useEffect(() => {
    console.log(products);
    if (products.length === 0) fetchAllProducts();
  }, []);

  return isFetching ? (
    <Loader message="Getting products !!!" />
  ) : error ? (
    <Error message={error} />
  ) : (
    <div>
      <h3>Products List</h3>
      <table className="table table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      style={{
                        color: 'red',
                        cursor: 'pointer',
                      }}
                      onClick={() => deleteProduct(product._id)}
                    />

                    <Link to={`/admin/update-product/${product._id}`}>
                      <i
                        className="fas fa-edit"
                        style={{
                          color: 'blue',
                          marginLeft: '15px',
                        }}
                      />
                    </Link>
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
  fetchAllProducts: () => dispatch(fetchAllProductsAsync()),
  deleteProduct: (id) => dispatch(deleteProductAsync(id)),
});

const mapStateToProps = (state) => ({
  product: state.product,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
