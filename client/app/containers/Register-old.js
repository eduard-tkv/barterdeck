import React from 'react';
import { connect } from 'react-redux';

import Register from '../components/Register';

// state here is redux store state i.e. the result of store.getState()
// and this state will passed in as props to our presentational component
// basically a container component will pass props to the corresponding presentational component
function mapStateToProps(state){
  return {
    formValues: state.formValues,
    registerForm: state.registerForm,
    errorRegister: state.errorRegister,
    userStatus: state.userStatus
  }
}

// same as store.dispatch
function mapDispatchToProps(dispatch){
  // console.log(`inside products mapdispatchtoprops`);
  return {
    setFormValues(name, value){
      console.log(`inside setFormValues redux, name and value below:`);
      console.log(`name: ${name} and value: ${value}`);
      dispatch({
          type: 'SET_FORM_VALUES_R',
          payload: { name, value }
      })
    },
    
    submitForms(formId, username, email, passwordOne, passwordTwo){
      console.log(`inside mapDispatchToProps, submitForms`);
      // console.log(formsInput);
      dispatch({
        type: 'SUBMIT_FORMS_S',
        payload: { 
          formId,
          username,
          email,
          passwordOne,
          passwordTwo
         }
      })
    }
  }
}

// connect will return a component
let RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);

export default RegisterContainer;

/* 
 * Instead of writing this way:
 * class Products extends React.Component{
 *   render(){
 *     <Products />
 *   }
 * }
 * 
 * The same functionality will be reproduced as a higher order
 * component with connect instead of es5 mixins. We will generate
 * this component with connect. Connect has access to the redux store
 */
