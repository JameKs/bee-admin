import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { getAdvancedProfile, putApproval } from 'services/routes/profile/advanced-profile';
import { SET_ERROR, SET_ROUTES_STATE } from 'constants/reducers';
import { PROFILE_ADVANCED_INIT, PROFILE_ADVANCED_PASS } from 'constants/routes/profile';
import { FRAME_SAGA_CANCEL } from 'constants/frames';
import { SysUtils } from 'utils';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* init(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { loading: true } });
    const response = yield call(getAdvancedProfile, action.payload.approvalNo);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    yield put({ type: SET_ROUTES_STATE, payload: { profileData: response.data, loading: false } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { loading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* pass(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { loading: true } });
    const response = yield call(putApproval, action.payload.values);
    yield put({ type: SET_ROUTES_STATE, payload: { response, isOutput: true, loading: false } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { loading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* AdvancedProfile() {
  yield [
    takeLatest(PROFILE_ADVANCED_INIT, action => cancelable(init, action)),
    takeLatest(PROFILE_ADVANCED_PASS, action => cancelable(pass, action)),
  ];
}

export default AdvancedProfile;
