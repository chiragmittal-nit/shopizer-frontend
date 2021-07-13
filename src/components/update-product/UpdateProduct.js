import React from 'react';
import { connect } from 'react-redux';
import { updateProductDetailsAsync } from '../../redux/slices/product';
import { getProductById } from './../../redux/slices/product';
import Loader from './../loader/Loader';
import Error from './../error/Error';
import { Link } from 'react-router-dom';

function UpdateProduct({ product, isFetching, error, updateProduct }) {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [countInStock, setCountInStock] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setImageUrl(product.imageUrl);
      setDescription(product.description);
      setName(product.name);
      setName(product.name);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      name,
      price,
      countInStock,
      imageUrl,
      description,
      category,
    };
    updateProduct(newProduct);
  };

  console.log(isFetching);
  if (product)
    return (
      <>
        {isFetching ? (
          <Loader message="Updating Product .." />
        ) : error ? (
          <Error message={error} />
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8 shadow p-3 mb-5 bg-white rounded">
              <h3>Update Product</h3>
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
                  Update Product
                </button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  else
    return (
      <Error
        message={
          <div>
            No Such Product Exist !! Visit{' '}
            <Link to={'/admin/product-list'}>Product-List Page</Link>
          </div>
        }
      />
    );
}

const mapStateToProps = (
  state,
  {
    match: {
      params: { id },
    },
  }
) => ({
  isFetching: state.product.isFetching,
  error: state.product.error,
  product: getProductById(id)(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateProduct: (product) => dispatch(updateProductDetailsAsync(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
