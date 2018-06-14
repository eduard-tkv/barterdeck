import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Header from './Header';

import { convertToCamelcase } from '../helpers';

//import '../assets/css/style.css';

class Register extends Component {
  constructor(props){
    super(props);

    console.log(`props below Register`);
    console.log(props);
   
    this.handleUserInput = this.handleUserInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount(){
    console.log(`inside register component will mount`);
  }
  
  componentWillReceiveProps(nextProps){
    console.log(`inside component will receive props, below are props`);
    console.log(this.props);
    console.log(`inside component will receive props, below are nextprops`);
    console.log(nextProps);
    
    if(nextProps.user.loggedIn){
      alert(nextProps.register.message);
      this.props.resetForm();
      this.props.history.push('/edit-profile');
    }
    
  }
  
  componentDidMount(){
    console.log(`register component - i did mount`);
  }

  submitForm(e){
    e.preventDefault();
      this.props.registerSubmit(
        this.props.register.form.nickname,
        this.props.register.form.email, 
        this.props.register.form.passwordOne,
        this.props.register.form.passwordTwo
      );
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
      <div>
        <Header loggedIn = {this.props.user.loggedIn} />
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
                <form id="register" onSubmit={ this.submitForm }>
                    <div className="form-group">
                      <input required type="text" className="form-control" placeholder="Enter a nickname" name="nickname" 
                      title="Length should be 4 characters or more"
                      pattern=".{4,}"
                      maxLength="100"
                      value={ this.props.register.form.nickname }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <div className="form-group">
                      <input required type="email" className="form-control" placeholder="Enter email" name="email" 
                      pattern=".{6,}"
                      maxLength="100"
                      value={ this.props.register.form.email }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <div className="form-group">
                      <input required type="password" className="form-control" placeholder="Enter Password" name="password-one" 
                      title="Length should be 6 characters or more"
                      pattern=".{6,}"
                      maxLength="100"
                      value={ this.props.register.form.passwordOne }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <div className="form-group">
                      <input required type="password" className="form-control" placeholder="Repeat Password" name="password-two" 
                      title="Length should be 6 characters or more"
                      pattern=".{6,}"
                      maxLength="100"
                      value={ this.props.register.form.passwordTwo }
                      onChange={ this.handleUserInput }/>
                    </div>
                    <button type="submit" className="btn btn-default custom-btn">Register</button>
                    <div className="form-errors">
                      { this.props.register.error ? 
                        this.props.register.errorMessage : '' }
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

export default Register;