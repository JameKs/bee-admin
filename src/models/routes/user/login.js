import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { login } from 'services/routes/user/login';
import { SET_ROUTES_STATE } from 'constants/reducers';
import { USER_LOGIN } from 'constants/routes/user';
import { FRAME_SAGA_CANCEL } from 'constants/frames';
import { SysUtils } from 'utils';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* userLogin(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { loading: true } });
    const response = yield call(login, action.payload.values);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }

    const storage = window.sessionStorage;
    storage.setItem('username', response.data.username);
    storage.setItem('roleid', response.data.roleid);
    storage.setItem('userid', response.data.userid);

    yield put({ type: SET_ROUTES_STATE, payload: { loading: false } });
    yield call(action.payload.handleSuccess);
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { loading: false, error: e.message } });
  }
}

function* Login() {
  yield [
    takeLatest(USER_LOGIN, action => cancelable(userLogin, action)),
  ];
}

export default Login;
