import { take, put, call, takeEvery, all, takeLatest } from 'redux-saga/effects';


function* logout(request){
  localStorage.removeItem('barterdeck_tkn');
  yield put({type: 'LOGOUT_R'});
}

export function* watchLogout(){
  console.log(`inside watch logout saga`);
  yield takeEvery('LOGOUT_S', logout);
}