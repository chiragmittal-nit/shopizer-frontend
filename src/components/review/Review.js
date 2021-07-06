import React from 'react';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import { getCurrentUser } from '../../services/authService';
import {
  addProductReviewAsync,
  getProductById,
} from './../../redux/slices/product';

function Review({ product, addProductReview }) {
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState('');

  const handleComment = () => {
    setRating(5);
    setComment('');

    const currentUser = getCurrentUser();

    if (product.reviews.find((review) => review.userId === currentUser._id)) {
      alert('you already reviwed the product :)');
      return;
    }

    const newReview = { rating: rating, comment: comment };
    addProductReview(product._id, newReview);
  };
  return (
    <div>
      <h4 className="text-center">Give Your Review</h4>

      <div>
        <Rating
          className="text-warning mb-3"
          initialRating={rating}
          emptySymbol="far fa-star"
          fullSymbol="fas fa-star"
          onChange={(e) => setRating(e)}
        />
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Loved the Product !!!"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="btn btn-dark text-uppercase p-2"
          onClick={handleComment}
        >
          Submit Review
        </button>
      </div>

      {product && product.reviews.length > 0 ? (
        <div>
          <h4 className="my-3">Latest Reviews</h4>
          {product.reviews.map((review) => (
            <div className="text-left">
              <Rating
                className="text-warning "
                initialRating={review.rating}
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
                readonly
              />
              <p className="mb-1">{review.comment}</p>
              <p className="mb-1">By : {review.name}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        ' '
      )}
    </div>
  );
}

const mapStateToProps = (state, { productId }) => ({
  product: getProductById(productId)(state),
});
const mapDispatchToProps = (dispatch) => ({
  addProductReview: (productId, review) =>
    dispatch(addProductReviewAsync(productId, review)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Review);
