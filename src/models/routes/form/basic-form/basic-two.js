import { call, put, takeLatest, fork, take, cancel, select } from 'redux-saga/effects';
import { getCity, addBasicTwo } from 'services/routes/form/basic-form/basic-two';
import { SET_ERROR, SET_ROUTES_STATE } from 'constants/reducers';
import { FORM_BASIC_TWO_INIT, FORM_BASIC_TWO_ADD } from 'constants/routes/form';
import { FRAME_SAGA_CANCEL } from 'constants/frames';
import { SysUtils } from 'utils';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* init() {
  try {
    const inited = yield select(state => state.routes.inited);
    if (inited) return;
    yield put({ type: SET_ROUTES_STATE, payload: { cityLoading: true } });
    const response = yield call(getCity);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    yield put({ type: SET_ROUTES_STATE, payload: { cityData: response.data, cityLoading: false, inited: true } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { cityLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* add(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { formData: action.payload.formData, submitLoading: true } });
    const response = yield call(addBasicTwo, action.payload.formData);
    yield put({ type: SET_ROUTES_STATE, payload: { response, isOutput: true, submitLoading: false } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { citiesLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* BasicTwo() {
  yield [
    takeLatest(FORM_BASIC_TWO_INIT, action => cancelable(init, action)),
    takeLatest(FORM_BASIC_TWO_ADD, action => cancelable(add, action)),
  ];
}

export default BasicTwo;
