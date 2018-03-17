import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { checkLength, convertToCamelcase } from './Helpers';

import '../../build/assets/css/style.css';

class Register extends Component {
  constructor(props){
    super(props);

    //this.state = this.props.store.getState();

    console.log(`props below Register`);
    console.log(props);
   
    this.handleUserInput = this.handleUserInput.bind(this);
    //this.getLoginValues = this.getLoginValues.bind(this);
    //this.loginSubmit = this.loginSubmit.bind(this);
    this.submitForms = this.submitForms.bind(this);
  }

  
  componentWillMount(){
    console.log(`inside component will mount`);
    //if(this.props.submitResponses.login == 'post success') this.props.history.push('/');
  }
  
  
  componentWillReceiveProps(nextProps){
    //console.log(`inside component will receive props`);
    //console.log(`below this.props.submitResponses.login`);
    //console.log(this.props.submitResponses.login);
    console.log(`inside component will receive props, below are props`);
    console.log(this.props);
    console.log(`inside component will receive props, below are nextprops`);
    console.log(nextProps);
    /*
    if(nextProps.userStatus.loggedin) { 
      this.props.history.push('/') 
    }

    if(nextProps.userStatus.registered) { 
      this.props.history.push('/register_login') 
    }
    */

    if(nextProps.userStatus.registered){
      alert(nextProps.userStatus.message);
      this.props.history.push('\login');
    }
  }
  
  componentDidMount(){
    console.log(`register component - i did mount`);
  }

  submitForms(e){
    e.preventDefault();
      this.props.submitForms(
        e.target.id,
        this.props.formValues.registerUsername,
        this.props.formValues.registerEmail, 
        this.props.formValues.registerPwdOne,
        this.props.formValues.registerPwdTwo
      );
  }
  
  handleUserInput(e){
    //e.preventDefault();
    //alert(`haha`);
    const name = convertToCamelcase(e.target.name);
    const value = e.target.value;
    //console.log(`inside handleUserInput, name and value below`);
    //console.log(`${name} : ${value}`);
    this.props.setFormValues(name, value);
  }

  render(){
    console.log(`inside render this.props below`);
    console.log(this.props);
    return (

    <div className="container">
    <div className="row">
       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="header-content text-center">
        { }
        </div> 
    </div>
    </div>
    <div className="row">
      <div className="col-md-3">
      </div>
        <div className="col-md-6">
            <div className="form-block">
              <h2>Register</h2>
              <div className="form login-form">
                <form id="register" onSubmit={ this.submitForms }>
                    <div className="form-group">
                      <input required type="text" className="form-control" placeholder="Enter a username" name="register-username" 
                      title="Length should be 4 characters or more"
                      pattern=".{4,}"
                      maxLength="100"
                      value={ this.props.formValues.registerUsername }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <div className="form-group">
                      <input required type="email" className="form-control" placeholder="Enter email" name="register-email" 
                      pattern=".{6,}"
                      maxLength="100"
                      value={ this.props.formValues.registerEmail }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <div className="form-group">
                      <input required type="password" className="form-control" placeholder="Enter Password" name="register-pwd-one" 
                      title="Length should be 6 characters or more"
                      pattern=".{6,}"
                      maxLength="100"
                      value={ this.props.formValues.registerPwdOne }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <div className="form-group">
                      <input required type="password" className="form-control" placeholder="Repeat Password" name="register-pwd-two" 
                      title="Length should be 6 characters or more"
                      pattern=".{6,}"
                      maxLength="100"
                      value={ this.props.formValues.registerPwdTwo }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <button type="submit" className="btn btn-default custom-btn">Register</button>
                    <div className="form-errors">
                      { this.props.errorRegister.error ? this.props.errorRegister.message : '' }
                  </div>
                </form>
              </div>
            </div>
        </div>
        <div className="col-md-3">
        </div>
    </div>
</div>
)}

}

export default Register;