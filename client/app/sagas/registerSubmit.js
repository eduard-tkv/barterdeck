import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { apiCall } from './apiCall';


function* registerSubmit(request){

  console.log(`inside registerSubmit saga`);
  const { nickname, email, passwordOne, passwordTwo } = request.payload;
  request.payload.password = request.payload.passwordOne;
  console.log(`request.payload is below`);
  console.log(request.payload);

  let path = 'register';
  let body = new FormData();
  body.append('nickname', nickname);
  body.append('email', email);
  body.append('password', passwordOne);

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
}