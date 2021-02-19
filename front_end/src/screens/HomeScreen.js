import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';


export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row center">
            <div className="landingpage-row">
              <Link to={`/search/name/penguins`} className="image-link"><img src="../img/shoppenguins.png"></img></Link>
              <Link to={`/search/name/steelers`} className="image-link"><img src="../img/shopsteelers.png"></img></Link>
              <Link to={`/search/name/pirates`} className="image-link"><img src="../img/shoppirates.png"></img></Link>
            </div>

            <div className="shop-specifics">

            <div className="secondary-row">
            <Link to={`/search/category/jersey`} className=""><img src="../img/shopjerseys.png"></img></Link>
            <Link to={`/search/category/hat`} className=""><img src="../img/shophats.png"></img></Link>
            <Link to={`/search/category/shirt`} className=""><img src="../img/shopshirts.png"></img></Link>
        </div>
            </div>

            <div className="locations">
              <h1>LOCATIONS</h1>
              <div className="info-card-holder">
                <div className="info-holder">
                  <img src="../img/storeshot.jpg" alt=""></img>
                  <p>The OG, the one that started it all. Visit us at our first ever store, at</p>
                  <address>
                    The Strip District<br />
                    555 Fake St<br />
                    Pittsburgh, PA<br />
                    15222, USA<br />
                  </address>
                </div>
                <div className="info-holder">
                  <img src="../img/storeshot2.jpg" alt=""></img>
                  <p>Our newest store, because we knew you wanted more. Found at</p>
                  <address>
                    Southside<br />
                    777 Notreal BLVD<br />
                    Pittsburgh, PA<br />
                    15203, USA<br />
                  </address>
                </div>
                </div>
              </div>
              <div className="row home-image" style={{ 
                backgroundImage: `url(${process.env.PUBLIC_URL 
                    + "/img/steelcity.jpg"})`, 
                 backgroundRepeat: "no-repeat"
                  }} > 
                <div className="home-text">
                  <h1>HOME</h1>
                  <p>Pittburgh. The city of Bridges, The Steel City, the Buckle on the Rust Belt. This town has a lot of nicknames, and for good reason. Since day 1 Pittsburgh has home to some of the hardest working individuals in the country, and we take pride in that. Sureally unique and beatiful in it's majesty, Pittsburgh's residents all love one thing; The Black & Yellow. The city flag, bars of black and yellow, have translated to our sports teams and given us all champions to root for.Home of the six time Superbowl Champions Steelers, the five time Stanley Cup Champions Penguins, and the five time World Series Champions Pirates, plus so many more.</p>
                  <p>That, is what unites us. Watching touchdowns being thrown, goals being scored, or homeruns being hit, we together cheer them on. We root for our hometeams and our home, and will passionately defend those who come and try to defeat us. We have proven time and time again we will fight and fight hard.</p>
                  <p className="this-is-home-text">THIS IS OUR HOME</p>
                  <div className="charities"> 
                    <p>Please donate and help our home's charities</p>
                    <div className="charity-list">
                      <a className="charity-links" href="https://www.wcspittsburgh.org/">Women's Center & Shelter Of Greater Pittsburgh</a>
                      <a className="charity-links" href="https://mariolemieux.org/">Mario Lemieux Foundation</a>
                      <a className="charity-links" href="https://brooklineteencenter.org/">Brookline Teen Center</a>
                      <a className="charity-links" href="https://www.givetochildrens.org/home">Children's Hospital Of Pittsburgh Foundation</a>
                      <a className="charity-links" href="https://bethlehemhaven.org/">Bethlehem Haven Housing Center</a>
                      <a className="charity-links" href="https://pittsburghbereavementdoulas.com/">Pittsburgh Bereavement Doulas</a>
                      <a className="charity-links" href="https://wfspa.org/">Wesley Family Services</a>
                      <a className="charity-links" href="https://www.persadcenter.org/">Persad Center For LGBTQ Communities</a>
                      <a className="charity-links" href="https://www.milestonepa.org/">Milestone Centers For People With Developmental & Health Challenges</a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </>
      )}
    </div>
  )}