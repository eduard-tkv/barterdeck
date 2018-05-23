import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { convertToCamelcase } from '../helpers';
import Header from './Header';

import '../../build/assets/css/style.css';

const EditProfileLink = ()=>(
  <Link className="nav-link" to="/edit-profile">Login</Link>
);

const ViewProfile = (props)=>(
    <div>
      <Header loggedIn = { props.loggedIn } />
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
         <div className="header-content text-center">
             <h2>Profile for ...nickname...</h2>
         </div>
     </div>
     </div>
    <div className="row">
        <div className="col-md-7">
            <div className="form-block">
              <h2>Edit Profile</h2>
              <div className="form login-form">
                <form id="editprofile">
                    <div className="form-group">
                      <input required type="text" className="form-control" name="first-name" 
                      value={ props.viewProfile.form.firstName }/>
                    </div>
                    <div className="form-group">
                      <input required type="text" className="form-control" name="last-name" 
                      value={ props.viewProfile.form.lastName }/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">About Me:</label>
                      <textarea className="form-control" rows="10" name="about-me"
                        value={props.viewProfile.form.aboutMe}/>
                    </div>
                    <button type="submit" className="btn btn-default custom-btn">Submit</button>
                    { props.loggedIn && 
                     <button type="submit" className="btn btn-default custom-btn"><EditProfileLink/></button>
                    }
                </form>
              </div>
            </div>
        </div>
        <div className="col-md-5">
             <div className="form-block">
              <h2>Your Location</h2>
                <div className="form login-form">
                 <form>
                  <div className="form-group">
                    <div>          
                      <input type="text" id="autocomplete" className="form-control" placeholder="start typing your city" name="set-location" />
                    </div>
                    <div>
                    <input type="text" id="locality" name="locality" />
                    <input type="text" id="administrative_area_level_1" name="administrative_area_level_1" />
                    <input type="text" id="country" name="country" />
                    </div>
                  </div> 
                     <button type="button" className="btn btn-default custom-btn">Set Location</button>
                  <div className="form-errors">
                  </div>
                 </form>
                </div>
             </div>
         </div>
    </div>
</div>
</div>
);

export default ViewProfile;