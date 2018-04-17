import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { apiCall } from './apiCall';


function* setLocation(request){
  console.log(`inside saga set location, request:`);
  console.log(request);
  
  const location = request.payload;

  /*
  var data = new FormData();
  data.append( "json", JSON.stringify( payload ) );
  */

  let path = 'setlocation';
  let body = new FormData();
  console.log(`locality below`);
  console.log(typeof location.locality);
  body.append('location', JSON.stringify(location));

  let options = {
    method: 'POST',
    body: body
  };

  let actionType = 'SETLOCATION_RESPONSE';

  console.log(`inside setlocation before apiCall and options.body below`);
  console.log(options.body);

  yield call(apiCall, path, actionType, options);
}

export function* watchSetLocation(){
  console.log(`inside watch set location saga`);
  yield takeEvery('EDITPROFILE_SET_LOCATION_S', setLocation)
}