// actions not used at the moment, using actionTypes

import {
  GET_INITIAL_STATE,
  SET_FORM_VALUES,
} from '../constants/actionTypes';

function getInitialState(){
  return {
    type: GET_INITIAL_STATE
  }
}

function setFormValues(payload){
  return {
    type: SET_FORM_VALUES,
    payload: payload
  }
}

export { 
  getInitialState,
  setFormValues
};
