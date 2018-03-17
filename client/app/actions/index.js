// actions not used at the moment, using actionTypes

import {
  GET_INITIAL_STATE,
  SET_FORM_VALUES,
  SUBMIT_FORMS
} from '../constants/actionTypes';

function getInitialState(){
  return {
    type: GET_INITIALSTATE
  }
}

function setFormValues(payload){
  return {
    type: SET_FORM_VALUES,
    payload: payload
  }
}

function submitForms(payload){
  return {
    type: SUBMIT_FORMS,
    payload: payload
  }
}

export { 
  getInitialState,
  setFormValues,
  submitForms
};
