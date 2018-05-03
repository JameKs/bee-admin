import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { getCity } from 'services/routes/form/column-form/single-column';
import { getTypeDicts } from 'services/frames/typedicts';
import { getTableData, addOne, editOne, delOne } from 'services/routes/list/edit-table';
import { SET_ERROR, SET_ROUTES_STATE } from 'constants/reducers';
import { SysUtils } from 'utils';
import { LIST_EDIT_TABLE_INIT, LIST_EDIT_TABLE_GET, LIST_EDIT_TABLE_ADD, LIST_EDIT_TABLE_EDIT, LIST_EDIT_TABLE_DEL } from 'constants/routes/list';
import { FRAME_SAGA_CANCEL } from 'constants/frames';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* init(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { tableLoading: true } });
    let response = yield call(getTypeDicts, { type: ['sex'] });
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    const dicts = response.data;

    response = yield call(getCity);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    const cityData = response.data;
    yield put({ type: SET_ROUTES_STATE, payload: { dicts, cityData, tableLoading: false } });
    yield call(get, { payload: action.payload.params });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { tableLoading: false } });
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

function* add(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { submitLoading: true } });
    const response = yield call(addOne, action.payload.formData);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    yield put({ type: SET_ROUTES_STATE, payload: { submitLoading: false } });
    yield call(action.payload.handleSucc);
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { submitLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* edit(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { submitLoading: true } });
    const response = yield call(editOne, action.payload.formData);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    yield put({ type: SET_ROUTES_STATE, payload: { submitLoading: false } });
    yield call(action.payload.handleSucc);
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { submitLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* del(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { tableLoading: true } });
    const response = yield call(delOne, action.payload.id);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    yield put({ type: SET_ROUTES_STATE, payload: { tableLoading: false } });
    yield call(get, { payload: action.payload.params });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { tableLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* EditTable() {
  yield [
    takeLatest(LIST_EDIT_TABLE_INIT, action => cancelable(init, action)),
    takeLatest(LIST_EDIT_TABLE_GET, action => cancelable(get, action)),
    takeLatest(LIST_EDIT_TABLE_ADD, action => cancelable(add, action)),
    takeLatest(LIST_EDIT_TABLE_EDIT, action => cancelable(edit, action)),
    takeLatest(LIST_EDIT_TABLE_DEL, action => cancelable(del, action)),
  ];
}

export default EditTable;
