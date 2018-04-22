import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { convertToCamelcase } from '../helpers';

import '../../build/assets/css/style.css';

class EditProfile extends Component {
  constructor(props){
    super(props);
    console.log(`props below Register`);
    console.log(props);
   
    this.handleUserInput = this.handleUserInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }
  
  componentWillMount(){
    console.log(`inside component will mount`);
  }
  
  componentWillReceiveProps(nextProps){
    console.log(`inside component will receive props, below are props`);
    console.log(this.props);
    console.log(`inside component will receive props, below are nextprops`);
    console.log(nextProps);

    /*
    if(nextProps.userStatus.loggedin){
      alert(nextProps.userStatus.message);
      this.props.history.push('/login');
    }
    */
  }
  
  componentDidMount(){
    console.log(`edit profile component - i did mount`);
    const script = document.createElement("script");
    script.src = "./assets/js/autocomplete.js";
    document.body.appendChild(script);
  }

  submitForm(e){
    e.preventDefault();
      this.props.registerSubmit(
        this.props.editProfile.form.firstName,
        this.props.editProfile.form.lastName, 
        this.props.editProfile.form.passwordOne,
        this.props.editProfile.form.passwordTwo
      );
  }
  
  setLocation(){
    let location = {};
    location.locality = document.getElementById('locality').value;
    location.administrative_area_level_1 = document.getElementById('administrative_area_level_1').value;
    location.country = document.getElementById('country').value;
    console.log(`inside component setlocation, location object:`);
    console.log(location);
    this.props.editProfileSetLocation(location);
  }

  handleUserInput(e){
    const name = convertToCamelcase(e.target.name);
    const value = e.target.value;
    this.props.registerFormValues(name, value);
  }

  render(){
    console.log(`inside render this.props below`);
    console.log(this.props);
    return (

    <div className="container">
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
              <h2>Register</h2>
              <div className="form login-form">
                <form id="editprofile" onSubmit={ this.submitForm }>
                    <div className="form-group">
                      <input required type="text" className="form-control" placeholder="Enter first name" name="firstname" 
                      title="Length should be 4 characters or more"
                      pattern=".{4,}"
                      maxLength="100"
                      value={ this.props.editProfile.form.firstName }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <div className="form-group">
                      <input required type="text" className="form-control" placeholder="Enter lastname" name="lastname" 
                      pattern=".{6,}"
                      maxLength="100"
                      value={ this.props.editProfile.form.lastName }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">About Me:</label>
                      <textarea className="form-control" rows="10" name="aboutme"
                        value={this.props.editProfile.form.aboutMe}
                        onChange={this.handleUserInput}/>
                    </div>
                    <button type="submit" className="btn btn-default custom-btn">submit</button>
                    <div className="form-errors">
                      { this.props.editProfile.error ? 
                        this.props.editProfile.errorMessage : '' }
                  </div>
                </form>
              </div>
            </div>
        </div>
        <div className="col-md-5">
             <div className="form-block">
                <h2>Edit Location</h2>
                <div className="form login-form">
                 <form>
                  <div className="form-group">
                    <label className="control-label" htmlFor="pwd">Not set</label>
                    <div>          
                      <input type="text" id="autocomplete" className="form-control" placeholder="start typing your city" name="set-location" />
                    </div>
                    <div>
                    <input type="text" id="locality" name="locality" />
                    <input type="text" id="administrative_area_level_1" name="administrative_area_level_1" />
                    <input type="text" id="country" name="country" />
                    </div>
                  </div> 
                     <button onClick={this.setLocation} type="button" className="btn btn-default custom-btn">Set Location</button>
                  <div className="form-errors">
                      { this.props.editProfile.error ? 
                        this.props.editProfile.errorMessage : '' }
                  </div>
                 </form>
                </div>
             </div>
         </div>
    </div>
</div>
)}

}

export default EditProfile;