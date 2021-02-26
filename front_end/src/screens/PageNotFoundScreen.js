import React from 'react';
import { Link } from 'react-router-dom';


export default function PageNotFoundScreen(props) {

  return (
    <div className="row top margin-sides">
      <div className="col-2 x">
        <h1>404 PAGE NOT FOUND</h1>
        <div className="not-found">
          <div className="image-hold-left">
            <img src="../img/pittsburgh-map.png" alt="Map Of Pittsburgh"></img>
          </div>
          <div className="image-hold-right">
            <img src="../img/you.png" alt="Pic Of Your Location, Way Off Site"></img>
            <p>Wow. Really don't know how you got here, but it's okay. Click on a link below to go somewhere that's not here.</p>
          </div>
          <div className="y">
            <Link to='/'
              >Maybe You Meant To To The Homepage?
            </Link><br></br>
            <Link to='/cart'>
              Maybe You Meant To Go To Your Cart?
            </Link><br></br>
            <a target="_blank" rel="noreferrer" href="https://www.nhl.com/flyers">
              Or Maybe You Meant To Go To The Loser's Page?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}