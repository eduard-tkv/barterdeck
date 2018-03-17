import React from 'react';
import { Link } from 'react-router-dom';

import '../../build/assets/css/style.css';

const ViewProfile = ()=>(
    <div classNameName="container">
            <div className="mt-5">
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
         <div className="header-content text-center">
             <h2>svenlexx232</h2>
         </div>
     </div>
     </div>

     <div className="row">
         <div className="col-md-12">
             <div className="form-block">
               <h2>Profile Details</h2>
               <div className="form login-form">
                <form className="form-horizontal" action="/action_page.php">
                  <div className="form-group">
                    <label className="control-label" for="email">First Name:</label>
                    <div>
                      <span className="form-control view-profile" id="email" name="email">svenlexx232</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label" for="pwd">Phone Number:</label>
                    <div>          
                      <span className="form-control view-profile" id="pwd" name="pwd">4169987755</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label" for="pwd">Email Address:</label>
                    <div>          
                      <span className="form-control view-profile" id="pwd" name="pwd">edward@edward.com</span>
                    </div>
                  </div>   
                  <div className="form-group">
                    <label for="comment">Bio:</label>
                    <textarea className="form-control view-profile" rows="5" id="comment" disabled></textarea>
                  </div>               
                  <div className="form-group">        
                    <div className="col-sm-offset-2 col-sm-10">
                      <button className="btn btn-default">Contat User</button>
                    </div>
                  </div>
                </form>
               </div>
             </div>
         </div>
     </div>

     <div className="row">
      <div className="col-md-12">
          <div className="form-block">
            <h2>Items Listed</h2>
              <ul>
                <li>item listed 01</li>
                <li>item listed 01</li>
                <li>item listed 01</li>
                <li>item listed 01</li>
              </ul>
          </div>
      </div>
  </div>
    </div>
);

export default ViewProfile;