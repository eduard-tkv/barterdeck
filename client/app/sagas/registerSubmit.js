import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { apiCall } from './apiCall';


function* registerSubmit(request){

  console.log(`inside registerSubmit saga`);
  const { username, email, passwordOne, passwordTwo } = request.payload;
  request.payload.password = request.payload.passwordOne;
  console.log(`request.payload is below`);
  console.log(request.payload);

  //let body = '';
  /*
  let urlEncodedDataPairs = [];
  let name = '';
  let path = request.payload.formId;
  let actionType = '';
  */

  /*
  switch(formId){
    case 'register':
      console.log(`case register`);
      actionType = 'REGISTER_RESPONSE';
      break;

    case 'login':
      actionType = 'LOGIN_RESPONSE';
      console.log(`case login`);
      break;

    default:
      console.log(`request.payload.formId is neither register or login`);
  }
  */


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

  let path = 'register';
  let body = new FormData();
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

  let actionType = 'REGISTER_RESPONSE';

  console.log(`inside registerSubmit before apiCall and options.body below`);
  console.log(options.body);

  if(request.payload.passwordOne !== request.payload.passwordTwo){
    yield put({ type: 'REGISTER_ERROR_PASSWORDS_DONTMATCH' });
  } else {
    yield call(apiCall, path, actionType, options);
  }

}

export function* watchRegisterSubmit(){
  console.log(`inside watch register submit saga`);
  yield takeEvery('REGISTER_SUBMIT_S', registerSubmit);
  //const request = yield takeEvery('REGISTER_SUBMIT_S', registerSubmit);
}