import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { getBasicProfile } from 'services/routes/profile/basic-profile';
import { SET_ERROR, SET_ROUTES_STATE } from 'constants/reducers';
import { PROFILE_BASIC_GET, PROFILE_BASIC_RESET } from 'constants/routes/profile';
import { FRAME_SAGA_CANCEL } from 'constants/frames';
import { SysUtils } from 'utils';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* get(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { loading: true } });
    const response = yield call(getBasicProfile, action.payload.formData.username);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    yield put({ type: SET_ROUTES_STATE, payload: { profileData: response.data, loading: false } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { loading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* reset() {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { profileData: undefined } });
  } catch (e) {
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* BasicProfile() {
  yield [
    takeLatest(PROFILE_BASIC_GET, action => cancelable(get, action)),
    takeLatest(PROFILE_BASIC_RESET, action => cancelable(reset, action)),
  ];
}

export default BasicProfile;
