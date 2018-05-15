import React from 'react';
import { connect } from 'react-redux';

import ViewProfile from '../components/ViewProfile';

// state here is redux store state i.e. the result of store.getState()
// and this state will passed in as props to our presentational component
// basically a container component will pass props to the corresponding presentational component
function mapStateToProps(state){
  return {
    viewProfile: state.viewProfile,
    user: state.user
  }
}

// same as store.dispatch
function mapDispatchToProps(dispatch){
  // console.log(`inside products mapdispatchtoprops`);
  return {
    editProfileFormValues(name, value){
      console.log(`inside editProfileFormValues redux, name and value below:`);
      console.log(`name: ${name} and value: ${value}`);
      dispatch({
          type: 'EDITPROFILE_FORM_VALUES_R',
          payload: { name, value }
      })
    },

    editProfileSetLocation(payload){
      dispatch({
        type: 'EDITPROFILE_SET_LOCATION_S',
        payload: payload
      })
    },
    
    editProfileSubmit(firstName, lastName, aboutMe){
      console.log(`inside mapDispatchToProps, editprofileSubmit`);
      // console.log(formsInput);
      dispatch({
        type: 'EDITPROFILE_SUBMIT_S',
        payload: { 
          firstName,
          lastName,
          aboutMe
         }
      })
    }
  }
}

// connect will return a component
let ViewProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ViewProfile);

export default ViewProfileContainer;
