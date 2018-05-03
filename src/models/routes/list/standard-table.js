import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { getTableData, getTableDataOne } from 'services/routes/list/standard-table';
import { SET_ERROR, SET_ROUTES_STATE } from 'constants/reducers';
import { SysUtils } from 'utils';
import { LIST_STANDARD_TABLE_INIT, LIST_STANDARD_TABLE_GET, LIST_STANDARD_TABLE_RESET,
  LIST_STANDARD_ONE_GET, LIST_STANDARD_MODALCLOSE } from 'constants/routes/list';
import { FRAME_SAGA_CANCEL } from 'constants/frames';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* init(action) {
  try {
    yield call(get, { payload: action.payload });
  } catch (e) {
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* get(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { tableLoading: true } });
    const response = yield call(getTableData, action.payload.params);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    yield put({ type: SET_ROUTES_STATE, payload: { total: response.total, tableData: response.data, tableLoading: false } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { tableLoading: false } });
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

function* getOne(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { viewLoading: true } });
    const response = yield call(getTableDataOne, action.payload.id);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    yield put({ type: SET_ROUTES_STATE, payload: { asyncVisible: true, asyncRecord: response.data, viewLoading: false } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { viewLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* closeModal() {
  yield put({ type: SET_ROUTES_STATE, payload: { asyncVisible: false } });
}

function* StandardTable() {
  yield [
    takeLatest(LIST_STANDARD_TABLE_INIT, action => cancelable(init, action)),
    takeLatest(LIST_STANDARD_TABLE_GET, action => cancelable(get, action)),
    takeLatest(LIST_STANDARD_TABLE_RESET, action => cancelable(reset, action)),
    takeLatest(LIST_STANDARD_ONE_GET, action => cancelable(getOne, action)),
    takeLatest(LIST_STANDARD_MODALCLOSE, action => cancelable(closeModal, action)),
  ];
}

export default StandardTable;
