import React from 'react';
import { connect } from 'react-redux';
import { addProductAsync } from '../../redux/slices/product';
import Loader from '../loader/Loader';
import Error from '../error/Error';

function AddProduct({ addProduct, isFetching, error }) {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState();
  const [countInStock, setCountInStock] = React.useState();
  const [imageUrl, setImageUrl] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price,
      countInStock,
      imageUrl,
      description,
      category,
    };
    addProduct(newProduct);
  };
  return (
    <>
      {isFetching ? (
        <Loader message="Adding Product .." />
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-8 shadow p-3 mb-5 bg-white rounded">
            <h3>Add Product</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-2 mr-sm-2"
                placeholder="name"
                required
                value={name || ''}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="number"
                className="form-control mb-2 mr-sm-2"
                placeholder="price"
                value={price || 0}
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <input
                type="text"
                required
                className="form-control mb-2 mr-sm-2"
                placeholder="decription"
                value={description || ''}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <input
                type="url"
                required
                className="form-control mb-2 mr-sm-2"
                placeholder="imageUrl"
                value={imageUrl || ''}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
              <input
                type="text"
                required
                className="form-control mb-2 mr-sm-2"
                placeholder="category"
                value={category || ''}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
              <input
                type="number"
                required
                className="form-control mb-2 mr-sm-2"
                placeholder="count in stock"
                value={countInStock || 0}
                onChange={(e) => {
                  setCountInStock(e.target.value);
                }}
              />
              <button className="btn btn-dark mx-auto mt-3" type="submit">
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.product.isFetching,
  error: state.product.error,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addProductAsync(product)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
