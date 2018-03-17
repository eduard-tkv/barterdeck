import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { apiCall } from './apiCall';


function* loginSubmit(request){

  console.log(`inside loginSubmit saga`);
  const { email, password } = request.payload;
  console.log(`inside loginSubmit saga, request.payload is below`);
  console.log(request.payload);

  let urlEncodedDataPairs = [];
  let name = '';
  let path = 'login';
  let actionType = 'LOGIN_RESPONSE';
  let body = '';
  
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
  

  /*
  let path = 'login';
  let body = new FormData();
  body.append('email', email);
  body.append('password', password);
  */

  console.log(`inside loginSubmit before apiCall and options.body below`);
  console.log(options.body);

  yield call(apiCall, path, actionType, options);

}

export function* watchLoginSubmit(){
  console.log(`inside watch register submit saga`);
  yield takeEvery('LOGIN_SUBMIT_S', loginSubmit);
  //const request = yield takeEvery('REGISTER_SUBMIT_S', registerSubmit);
}