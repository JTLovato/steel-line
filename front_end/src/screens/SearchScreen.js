import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
  const {
      name = 'all',
      category = 'all',
      min = 0,
      max = 0,
      rating = 0,
      order = 'highest',
      pageNumber = 1,
    } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      })
    );
}, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
};

  return (
    <div className="height">
      <div className="row margin-sides">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="dropdown refine-mobile">
            <Link className="refine-button" to="#admin">
              Refine Search <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content refine-search-box">  
              <div className="col-1 margin-sides">
                <h3>Categories</h3>
                <div>
                  {loadingCategories ? (
                    <LoadingBox></LoadingBox>
                  ) : errorCategories ? (
                    <MessageBox variant="danger">{errorCategories}</MessageBox>
                  ) : (
                  <ul>
                    {categories.map((c) => (
                      <li className="side-item" key={c}>
                        <Link
                          className={c === category ? 'active' : ''}
                          to={getFilterUrl({ category: c })}
                        >
                          {c}s
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* TEAM SORTING COMING SOON */}
              {/* <div>
                <h3>Teams</h3>
                  <ul>
                    {teams.map((t) => (
                      <li className="side-item" key={t.team}>
                        <Link
                          to={getFilterUrl({ team: t.team })}
                          className={`${t.team}` === `${team}` ? 'active' : ''}
                        >
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div> */}
                {/* TEAM SORTING COMING SOON */}

                <div>
                  <h3>Price</h3>
                  <ul>
                    {prices.map((p) => (
                      <li className="side-item" key={p.name}>
                        <Link
                          to={getFilterUrl({ min: p.min, max: p.max })}
                          className={
                            `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                          }
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Avg. Customer Review</h3>
                  <ul>
                    {ratings.map((r) => (
                      <li className="side-item" key={r.name}>
                        <Link
                          to={getFilterUrl({ rating: r.rating })}
                          className={`${r.rating}` === `${rating}` ? 'active' : ''}
                        >
                          <Rating caption={' & up'} rating={r.rating}></Rating>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ul>
          </div>
          // <>{products.length} Results</>
        )}
        <div>
          Sort by{' '}
          <select
            value={order}
            className="select-order"
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="highest">Price: High to Low</option>
            <option value="lowest">Price: Low to High</option>
            <option value="newest">Newest Arrivals</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
      <div className="col-3">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && (
              <MessageBox>No Product Found</MessageBox>
            )}
            <div className="row center pagination">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={x + 1 === page ? 'active' : ''}
                  key={x + 1}
                  to={getFilterUrl({ page: x + 1 })}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
            <div className="row center pagination">
              {[...Array(pages).keys()].map((x) => (
                <Link
                  className={x + 1 === page ? 'active' : ''}
                  key={x + 1}
                  to={getFilterUrl({ page: x + 1 })}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}