import React from 'react';
import { Link } from 'react-router-dom';

import '../../build/assets/css/style.css';

const EditProfile = ()=>(
<div className="container">

      <div className="mt-5">
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
         <div className="header-content text-center">
             <h2>Edit Your Profile</h2>
             <h4>...nickname...</h4>
         </div>
     </div>
     </div>

     <div className="row">
         <div className="col-md-7">
             <div className="form-block">
               <h2>Profile Details</h2>
               <div className="form login-form">
                <form className="form-horizontal" action="/action_page.php">
                  <div className="form-group">
                    <label className="control-label" for="email">First Name:</label>
                    <div>
                      <input type="email" className="form-control" id="email" name="email" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label" for="pwd">Phone Number:</label>
                    <div>          
                      <input type="password" className="form-control" id="pwd" name="pwd" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label" for="pwd">Email Address:</label>
                    <div>          
                      <input type="password" className="form-control" id="pwd" name="pwd" />
                    </div>
                  </div>   
                  <div className="form-group">
                    <label for="comment">Bio:</label>
                    <textarea className="form-control" rows="5" id="comment"></textarea>
                  </div>               
                  <div className="form-group">        
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                  </div>
                </form>
               </div>
             </div>
         </div>
         <div className="col-md-5">
             <div className="form-block">
                <h2>Edit Location</h2>
                <div className="form login-form">
                 <form action="/action_page.php">
                  <div className="form-group">
                    <label className="control-label" for="pwd">Not set</label>
                    <div>          
                      <input type="text" className="form-control" placeholder="start typing your city" id="set-location" name="set-location" />
                    </div>
                  </div> 
                     <button type="submit" className="btn btn-default custom-btn">Set Location</button>
                 </form>
                </div>
             </div>
         </div>
     </div>
    </div>
);

export default EditProfile;