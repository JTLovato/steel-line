import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;

  return (
    <div key={product._id} className="card">
      <div className="bannerhold">
        {product.countInStock < 11 && product.countInStock > 0 &&
          <img className="banner" src="/../img/icons/almost-out.png" alt="Almost Sold Out"></img>
        }
        {product.countInStock === 0 &&
          <img className="baner" src="/../img/icons/sold-out.png" alt="Item Sold Out"></img>
        }
      </div>
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={`/../${product.image}`} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="row">
          <div className="price">
            ${product.price}
          </div>
        </div>
      </div>
    </div>
  );
}