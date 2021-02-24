import React from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    
    return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="card card-body yellow ">
        <div>
          <div className="row top">
            <div className="col-1">
              <ul>
                <li>
                    <div className="player-details player-top-left">{product.playerNum}</div>
                </li>

                <div className="col-2">
                    <img
                        className="card-large profile-pic"
                        src={product.profile}
                        alt={product.player}
                    ></img>
                </div>
                    <li>
                        <div className="player-details player-bottom" >{product.position}</div>
                    </li>
                    <div className="player-showcase">
                    <span className="name-span"></span>
                    <li>
                    <h1 className="name">{product.player}</h1>
                    </li>
                    <span className="name-span"></span>
                    </div>
              </ul>
            </div>
          </div>
        </div>
        </div>
        )}
   </div>
 );
}