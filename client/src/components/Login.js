import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from './Header';

import { convertToCamelcase } from '../helpers';

//import '../assets/css/style.css';

class Login extends Component {
  constructor(props){
    super(props);
    console.log(`props below Login`);
    console.log(props);
   
    this.handleUserInput = this.handleUserInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  
  componentWillMount(){
    console.log(`inside component will mount`);
  }
  
  componentWillReceiveProps(nextProps){
    console.log(`inside component will receive props, below are props`);
    console.log(this.props);
    console.log(`inside component will receive props, below are nextprops`);
    console.log(nextProps);
    if(nextProps.user.loggedIn) { 
      this.props.history.push('/') 
    }
  }
  
  componentDidMount(){
    console.log(`registerlogin comp - i did mount`);
  }

  submitForm(e){
    e.preventDefault();
    this.props.loginSubmit(
      this.props.login.form.email, 
      this.props.login.form.password
    );
  }
  
  handleUserInput(e){
    const name = convertToCamelcase(e.target.name);
    const value = e.target.value;
    this.props.loginFormValues(name, value);
  }

  render(){
    console.log(`inside render this.props below`);
    console.log(this.props);
return (
  <div>
    <Header loggedIn = {this.props.user.loggedIn} />
    <div className="container">
    <div className="row">
       <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="header-content text-center">
        { /* <h1 className="header-title">Bootstrap Form</h1>
            <h4 className="header-motto">Register and Login</h4>*/}
        </div> 
    </div>
    </div>
    <div className="row">
        <div className="col-md-3">

        </div>
        <div className="col-md-6">
            <div className="form-block">
               <h2>Log in</h2>
               <div className="form login-form">
                <form id="login" onSubmit={ this.submitForm }>
                    <div className="form-group">
                      <input required type="email" className="form-control" id="text" placeholder="Enter email" name="email"
                      maxLength="100"
                      value={ this.props.login.form.email }
                      onChange={ this.handleUserInput } />
                    </div>
                    <div className="form-group">
                      <input required type="password" className="form-control" id="password" placeholder="Enter password" name="password" 
                      title="Length should be 6 characters or more"
                      pattern=".{6,}"
                      maxLength="100"
                      value={ this.props.login.form.password }
                      onChange={ this.handleUserInput } />
                    </div>
                    <button className="btn btn-default custom-btn">Login</button>
                    <div className="form-errors">
                     { this.props.login.error ? this.props.login.errorMessage : '' }
                    </div>                   
                </form>
               </div>
            </div>
        </div>
        <div className="col-md-3">

        </div>
    </div>
</div>
</div>  
)}

}

export default Login;