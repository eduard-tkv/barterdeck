import React from 'react';
import { Link } from 'react-router-dom';

import '../../build/assets/css/style.css';

const ViewListing = ()=>(
  <div className="container">
  
        <div className="mt-5">
        </div>
  
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
           <div className="header-content text-center">
               <h2>View Listing</h2>
           </div>
       </div>
       </div>
  
       <div className="row">
           <div className="col-md-12">
               <div className="form-block">
                 <h2>Item Details</h2>
                 <div className="form login-form">
                  <form className="form-horizontal" action="/action_page.php">
                    <div className="form-group">
                      <label className="control-label" for="email">Item Offered:</label>
                      <div>
                        <span type="email" className="form-control" id="email" name="email">Spices</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label" for="pwd">Item Sought:</label>
                      <div>          
                        <span type="password" className="form-control" id="pwd" name="pwd">Towels</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label" for="pwd">Or Sell For:</label>
                      <div>          
                        <span type="password" className="form-control" id="pwd" name="pwd">$52</span>
                      </div>
                    </div>   
                    <div className="form-group">
                      <label for="comment">Description:</label>
                      <textarea className="form-control" rows="5" id="listing-description" disabled>I have about 100gram of cardamon. Would like to trade for 2 kitchen towels.</textarea>
                    </div>               
                    <div className="form-group">        
                      <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default">Contact User</button>
                      </div>
                    </div>
                  </form>
                 </div>
               </div>
           </div>
       </div>
       </div>
);

export default ViewListing;