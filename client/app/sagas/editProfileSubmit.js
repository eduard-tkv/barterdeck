import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { apiCall } from './apiCall';


function* editProfileSubmit(request){

  console.log(`inside registerSubmit saga`);
  const { firstName, lastName, bio } = request.payload;
  request.payload.password = request.payload.passwordOne;
  console.log(`request.payload is below`);
  console.log(request.payload);

  let path = 'editprofile';
  let body = new FormData();
  body.append('firstName', firstName);
  body.append('lastName', lastName);
  body.append('aboutMe', aboutMe);

  let options = {
    method: 'POST',
    body: body
  };

  let actionType = 'EDITPROFILE_RESPONSE';

  console.log(`inside editprofileSubmit before apiCall and options.body below`);
  console.log(options.body);

}

export function* watchEditProfileSubmit(){
  console.log(`inside watch register submit saga`);
  yield takeEvery('EDITPROFILE_SUBMIT_S', registerSubmit);
}