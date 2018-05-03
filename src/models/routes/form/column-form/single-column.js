import { call, put, takeLatest, fork, take, cancel, select } from 'redux-saga/effects';
import { getCity, addSingleColumn } from 'services/routes/form/column-form/single-column';
import { SET_ERROR, SET_ROUTES_STATE } from 'constants/reducers';
import { FORM_SINGLE_COLUMN_INIT, FORM_SINGLE_COLUMN_ADD } from 'constants/routes/form';
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
    const response = yield call(addSingleColumn, action.payload.formData);
    yield put({ type: SET_ROUTES_STATE, payload: { response, isOutput: true, submitLoading: false } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { citiesLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* SingleColumn() {
  yield [
    takeLatest(FORM_SINGLE_COLUMN_INIT, action => cancelable(init, action)),
    takeLatest(FORM_SINGLE_COLUMN_ADD, action => cancelable(add, action)),
  ];
}

export default SingleColumn;
