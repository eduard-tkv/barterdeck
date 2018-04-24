import 'regenerator-runtime/runtime';

import { delay } from 'redux-saga';
import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';

import { apiCall } from './apiCall';
import { watchInitialState } from './getInitialState';
import { watchRegisterSubmit } from './registerSubmit';
import { watchLoginSubmit } from './loginSubmit';
import { watchListItemSubmit } from './listItemSubmit';
import { watchSetLocation } from './setLocation';
import { watchEditProfileSubmit } from './editProfileSubmit';

import {
  SUBMIT_FORMS_S,
  ERROR_PASSWORD_MISMATCH,
  RESPONSE_REGISTER,
  RESPONSE_LOGIN,
  RESPONSE_INITIAL_STATE,
  GET_INITIAL_STATE
} from '../constants/actionTypes';

function* listItemFormSubmit(request){
  console.log(`inside listitemformsubmit saga, request below`);
  console.log(request);
}

function* watchListItemFormSubmit(){
  yield takeEvery('LIST_ITEM_FORM_SUBMIT_S', listItemFormSubmit);
}

// Start getInitialState
/*
function* getInitialState(){

  let actionType = RESPONSE_INITIAL_STATE;
  let path = 'react/listings28';
  let options = {
    method: 'GET'
  };

  yield call(apiCall, path, actionType, options);
}

function* watchInitialState(){
  yield takeEvery(GET_INITIAL_STATE, getInitialState);
}
*/
// End getInitialState

// Start Forms Submit

function* submitForms(request){

  const {formId, username, email, passwordOne, passwordTwo } = request.payload;
  request.payload.password = request.payload.passwordOne;

  //let body = '';
  let urlEncodedDataPairs = [];
  let name = '';
  let path = request.payload.formId;
  let actionType = '';

  switch(formId){
    case "register":
      console.log(`case register`);
      actionType = RESPONSE_REGISTER;
      break;

    case "login":
      actionType = RESPONSE_LOGIN;
      console.log(`case login`);
      break;

    default:
      console.log(`request.payload.formId is neither register or login`);
  }

  /*
  // Turn the data object into an array of URL-encoded key/value pairs.
  for(name in request.payload) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(request.payload[name]));
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to 
  // the '+' character; matches the behaviour of browser form submissions.
  body = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  let options = {
    method: 'POST',
    body: body
  };
  */

  var body = new FormData();
  body.append('username', username);
  body.append('email', email);
  body.append('password', passwordOne);

  /*
  fetch('/avatars', {
    method: 'POST',
    body: data
  })  
  */
  let options = {
    method: 'POST',
    body: body
  };

  if(formId === "register"){
    if(request.payload.passwordOne !== request.payload.passwordTwo){
      yield put({ type: ERROR_PASSWORD_MISMATCH });
    } else {
      yield call(apiCall, path, actionType, options);
    }
  } else {
    yield call(apiCall, path, actionType, options);
  }

}

function* watchSubmitForms(){
  const request = yield takeEvery(SUBMIT_FORMS_S, submitForms);
}

// End Forms Submit

/*
function registerSubmit(){
  console.log(`inside registerSubmit saga, main saga`);
}

function* watchRegisterSubmit(){
  console.log(`inside watch register submit saga. main sagas`);
  yield takeEvery('REGISTER_SUBMIT_S', registerSubmit);
}
*/
export default function* rootSaga(){
  yield all([
    watchInitialState(),
    watchSubmitForms(),
    watchListItemSubmit(),
    watchRegisterSubmit(),
    watchLoginSubmit(),
    watchSetLocation()
  ])
}
