import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
//import axios from 'axios';

export function* apiCall(path, actionType, options){
  console.log(`inside apicall options and options below`);
  console.log(options);

  let token = localStorage.getItem('barterdeck_tkn');
  let httpHeaders;
  
  console.log(`inside api call, token below`);
  console.log(token);
  /*
  const formData = new FormData();
  formData.append('file',file)
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }

  var data = new FormData()
  data.append('file', input.files[0])
  data.append('user', 'hubot')

  fetch('/avatars', {
    method: 'POST',
    body: data
  })


  */
  /*
  if(token){
    httpHeaders = { 
      'Content-Type' : 'application/x-www-form-urlencoded', 
      'Accept' : 'application/json',
      'Authorization' : `Bearer ${token}`
    };
  } else {
    httpHeaders = { 
      'Content-Type' : 'application/x-www-form-urlencoded', 
      'Accept' : 'application/json'
    };
  }
  */



  /*
  var data = new FormData()
  data.append('file', input.files[0])
  data.append('user', 'hubot')
  */

  /*
  httpHeaders = {
      'content-type': 'multipart/form-data',
      'Authorization' : `Bearer ${token}`
  };
  */
  // mode: 'no-cors'

  /*
  if(path == 'listitem'){
    httpHeaders = {
      'Content-Type' : 'multipart/form-data', 
      'Authorization' : `Bearer ${token}`
    };
  } else {
    httpHeaders = {
      'Content-Type' : 'application/x-www-form-urlencoded', 
      'Authorization' : `Bearer ${token}`
    };
  }
  */

  if(path == 'listitem'){
    httpHeaders = {
      'Authorization' : `Bearer ${token}`
    };
  } else {
    httpHeaders = {
      'Content-Type' : 'application/x-www-form-urlencoded', 
      'Authorization' : `Bearer ${token}`
    };
  }

  options.headers = new Headers(httpHeaders);
  options.credentials = 'same-origin';

  console.log(`inside api call and options.body below`);
  console.log(options.body);
  /*
  let options = {
    method: method,
    headers: new Headers(httpHeaders),
    credentials: 'same-origin'
  };
  */

  try {
    const response = yield call(fetch, `http://35.164.214.160/${path}`, options);
    const data = yield call([response, response.json]);
    console.log(`data returned by fetch`);
    console.log(data);

    if(data.token){
      console.log(`token from server below`);
      console.log(data.token);
      localStorage.setItem('barterdeck_tkn', data.token);
      yield put({type: actionType, payload: data});
    } else {
      yield put({type: actionType, payload: data});
    }
  } catch (e) {
    console.log(e.message);
    console.log(`error api call for ${actionType}`);
    yield put({type: actionType + '_ERROR', payload: 'Error fetching'});
    //yield put({ type: 'FETCH_ERROR', message: 'Error while making API call' });
  }
}
