import React from 'react';
import { connect } from 'react-redux';

import Login from '../components/Login';

import { 
  SET_FORM_VALUES,
  SUBMIT_FORMS
} from '../constants/actionTypes';

// state here is redux store state i.e. the result of store.getState()
// and this state will passed in as props to our presentational component
// basically a container component will pass props to the corresponding presentational component
function mapStateToProps(state){
  return {
    login: state.login,
    userStatus: state.userStatus
  }
}

// same as store.dispatch
function mapDispatchToProps(dispatch){
  return {

    loginFormValues(name, value){
      console.log(`inside loginFormValues redux, name and value below:`);
      console.log(`name: ${name} and value: ${value}`);
      dispatch({
          type: 'LOGIN_FORM_VALUES_R',
          payload: { name, value }
      })
    },

    loginSubmit(email, password){
      console.log(`inside mapDispatchToProps, loginSubmit`);
      // console.log(formsInput);
      dispatch({
        type: 'LOGIN_SUBMIT_S',
        payload: { 
          email,
          password
         }
      })
    }
  }
}

// connect will return a component
let LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
