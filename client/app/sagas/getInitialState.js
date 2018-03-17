import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { apiCall } from './apiCall';

function* getInitialState(){

  let actionType = 'RESPONSE_INITIAL_STATE';
  let path = 'react/listings28';
  let options = {
    method: 'GET'
  };

  yield call(apiCall, path, actionType, options);
}

export function* watchInitialState(){
  console.log(`inside watch initial state`);
  yield takeEvery('GET_INITIAL_STATE', getInitialState);
}