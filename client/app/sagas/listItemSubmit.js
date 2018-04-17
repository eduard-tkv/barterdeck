import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { apiCall } from './apiCall';


function* listItemSubmit(request){

  console.log(`inside listItemSubmit saga`);
  const { itemOffered, itemSought, sellFor, description, image } = request.payload;

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

  let path = 'listitem';
  let body = new FormData();
  body.append('itemOffered', itemOffered);
  body.append('itemSought', itemSought);
  body.append('sellFor', sellFor);
  body.append('description', description);
  body.append('image', image);
  body.append('postedDate', Date.now());

  /*
  fetch('/avatars', {
    method: 'POST',
    body: data
  })  
  */

 let httpHeaders = { 
   'Content-Type' : 'image/jpeg'
 };
 
 let myHeaders = new Headers(httpHeaders);

  let options = {
    method: 'POST',
    body: body
  };

  let actionType = 'LISTITEM_RESPONSE';

  console.log(`inside listItemSubmit before apiCall and options.body below`);
  console.log(options.body);

  yield call(apiCall, path, actionType, options);

}

export function* watchListItemSubmit(){
  console.log(`inside watch register submit saga`);
  yield takeEvery('LIST_ITEM_SUBMIT_S', listItemSubmit);
  //const request = yield takeEvery('REGISTER_SUBMIT_S', registerSubmit);
}