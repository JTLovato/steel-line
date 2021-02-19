import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { signout } from './actions/userActions';
import SearchBox from './components/SearchBox'
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox'; 
import AdminRoute from './components/AdminRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchScreen from './screens/SearchScreen';
import PageNotFound from './screens/PageNotFoundScreen';



function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories())
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault();
    const newsletter = document.getElementById("newsletter");
    const thanks = document.getElementById("thanks");
    newsletter.style.display = "none";
    thanks.style.display = "block";

  };

  const year = new Date().getFullYear();


  const NoMatchPage = () => {
    return (
      <PageNotFound />
    );
  };
  
  return (
    <BrowserRouter>
      <div className="grid-container">
      <div className="discounts">
          <p>DEAL ENDS SOON!</p>
          <h1>FREE SHIPPING SITEWIDE ON ORDERS OVER $100!</h1>
          <h6>*Exclusions Apply*</h6>
          </div>
        <header className="row heading">
          <div className="center header-left">
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
          <Link className="brand" to="/">
            <img className="mainLogo" src="img/mainLogo.png" alt="Steel Line"></img>
          </Link>
          </div>
          <div className="header-right row center">
          <div>
            <Route 
              render={({history}) => 
              <SearchBox 
                history={history}
              ></SearchBox>}
            ></Route>
          </div>

          <div>
          <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
              {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  {/* coming soon */}
                    {/* <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li> */}
                  {/* coming soon */}
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open': ''}>
                <ul className="categories">
                  <li>
                    <strong>Categories</strong>
                    <button onClick={() => setSidebarIsOpen(false)}
                      className="close-sidebar"
                      type="button">
                      <i className="fa fa-close"></i>
                    </button>
                  </li>
                  {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link to={`/search/category/${c}`}
                  onClick={() => setSidebarIsOpen(false)}>
                    {/* <img src={`../img/headshots/${c}.jpg`}></img> */}
                    {c}s
                    
                    </Link>
                </li>
              ))
          )}
                </ul>
        </aside>

        <main>
          <Switch>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route 
            path="/search/name/:name?" 
            component={SearchScreen} 
            exact 
          ></Route>
          <Route 
            path="/search/category/:category?" 
            component={SearchScreen} 
            exact 
          ></Route>
          <Route 
            path="/search/category/:category/name/:name" 
            component={SearchScreen} 
            exact 
          ></Route>
             <Route
           path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
           component={SearchScreen}
           exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
                    <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
                 <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
                  <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
                    <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
                    <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route component={NoMatchPage} />
          </Switch>
          <img className="bridge" src="../img/bridge.png"></img>
        </main>
        <footer>
          <div className="contact-container">
                <div className="contact-container-card actual">
                  <p>Contact Us</p>
                  <div>
                    <a href = "mailto: johnsawebdev@gmail.com.com">Email: johnsawebdev@gmail.com</a>
                    <a href="tel:682-283-1972">Call: (682) 283-1972</a>
                  </div>
                </div>
                <div className="contact-container-card">
                  <p>Follow Us</p>
                  <div>
                    <a href=""><i className="fa fa-2x fa-facebook-f"></i></a>
                    <a href=""><i className="fa fa-2x  fa-twitter"></i></a>
                    <a href=""><i className="fa fa-2x  fa-instagram"></i></a>
                    <a href=""><i className="fa fa-2x  fa-linkedin"></i></a>
                  </div>
                </div>
                <div className="contact-container">
                  <form id="newsletter" onSubmit={submitHandler}>
                    <label htmlFor="newsletter">Stay Connected</label>
                    <label htmlFor="newsletter">Sign up for our email now for great deals</label>
                    <div className="newsletter-submit">
                      <input id="newsletter" type="text" className="newsletter-input" placeholder="Enter Email Here"></input>
                      <button type="submit" className="newsletter-button" >Sign Up</button>
                    </div>
                  </form>
                  <div id="thanks" className="thanks">
                    <h1>Thanks!</h1>
                    <p>You'll be signed up for all the news and great deals from now on.</p>
                  </div>
                </div>
              </div>
          <div className="bottom-footer">
                <a href="">Privacy Policy</a> <p>////</p> <a href="">Terms Of Use</a> <p>////</p> <a href="#">&copy; {year} Steel | Line</a>
          </div>
          </footer>
      </div>
    </BrowserRouter>
);
}

export default App;