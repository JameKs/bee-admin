import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { SET_ERROR, REPLACE_ROUTES_STATE } from 'constants/reducers';
import { FORM_COMP_DETAIL } from 'constants/routes/comp';
import { FRAME_SAGA_CANCEL } from 'constants/frames';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}


function* detail(action) {
  try {
    yield put({ type: REPLACE_ROUTES_STATE, payload: { data: action.payload.data, gobackRoute: action.payload.gobackRoute } });
    yield call(action.payload.handleViewSucc);
  } catch (e) {
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* StepForm() {
  yield [
    takeLatest(FORM_COMP_DETAIL, action => cancelable(detail, action)),
  ];
}

export default StepForm;
