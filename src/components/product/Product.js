import React from "react";
import { withRouter } from "react-router";
import Rating from "react-rating";

function Product({ _id: id, name, imageUrl, rating, price, history }) {
  return (
    <div
      className='card h-100 '
      onClick={() => history.push(`/product/${id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className='card-body'>
        <img src={imageUrl} className='img-fluid' alt={name} />
        <p className='my-1'>{name}</p>
        <Rating
          className='text-warning'
          initialRating={rating}
          emptySymbol='far fa-star'
          fullSymbol='fas fa-star'
          readonly
        />
        <p className='my-1'>{`Price : ${price}`}</p>
      </div>
    </div>
  );
}
export default withRouter(Product);
