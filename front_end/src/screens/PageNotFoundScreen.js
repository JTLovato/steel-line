import React from 'react';
import { Link } from 'react-router-dom';


export default function PageNotFoundScreen(props) {

  return (
    <div className="row top margin-sides">
    <div className="col-2">
        <div className="not-found">
        <h1>404 PAGE NOT FOUND</h1>
            <div className="image-hold-left">
                <img src="../img/pittsburgh-map.png"></img>
            </div>
            <div className="image-hold-right">
                <img src="../img/you.png"></img>
                <p>Wow. Really don't know how you got here, but it's okay. Click on a link below to go somewhere that's not here.</p>
                <Link to='/'>Maybe You Meant To To The Homepage?</Link><br></br>
                <Link to='/cart'>Maybe You Meant To Go To Your Cart?</Link><br></br>
                <a target="_blank" href="https://www.nhl.com/flyers">Or Maybe You Meant To Go To The Loser's Page?</a>
            </div>
        </div>
    </div>
  </div>
);
}