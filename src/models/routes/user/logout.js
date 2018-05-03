import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { logout } from 'services/routes/user/logout';
import { SET_ERROR } from 'constants/reducers';
import { USER_LOGOUT } from 'constants/routes/user';
import { FRAME_SAGA_CANCEL } from 'constants/frames';
import { SysUtils } from 'utils';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* userLogout(action) {
  try {
    const response = yield call(logout, action.payload.userid);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    const storage = window.sessionStorage;
    storage.removeItem('username');
    storage.removeItem('roleid');
    storage.removeItem('userid');

    yield call(action.payload.handleSuccess);
  } catch (e) {
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* CHeader() {
  yield [
    takeLatest(USER_LOGOUT, action => cancelable(userLogout, action)),
  ];
}

export default CHeader;
