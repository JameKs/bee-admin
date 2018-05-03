import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { getHeader, getListData } from 'services/routes/list/card-list';
import { SET_ERROR, SET_ROUTES_STATE, REPLACE_ROUTES_STATE } from 'constants/reducers';
import { SysUtils } from 'utils';
import { LIST_CARD_INIT, LIST_CARD_GET, LIST_CARD_APPROVED } from 'constants/routes/list';
import { FRAME_SAGA_CANCEL } from 'constants/frames';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* init(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { headerLoading: true } });
    let response = yield call(getHeader);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    const headerData = response.data;
    yield put({ type: SET_ROUTES_STATE, payload: { headerData, headerLoading: false, listLoading: true } });

    response = yield call(getListData, action.payload.params);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    const total = response.total;
    const listData = response.data;
    yield put({ type: SET_ROUTES_STATE, payload: { total, listData, listLoading: false } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { headerLoading: false, listLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* get(action) {
  try {
    yield put({ type: SET_ROUTES_STATE, payload: { listLoading: true } });
    const response = yield call(getListData, action.payload.params);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    const total = response.total;
    const listData = response.data;
    yield put({ type: SET_ROUTES_STATE, payload: { total, listData, listLoading: false } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { listLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* approved(action) {
  try {
    yield put({ type: REPLACE_ROUTES_STATE, payload: { approvalNo: action.payload.approvalNo, goBackRoute: '/list/card-list' } });
    yield call(action.payload.handleApprovedSucc);
  } catch (e) {
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* StandardTable() {
  yield [
    takeLatest(LIST_CARD_INIT, action => cancelable(init, action)),
    takeLatest(LIST_CARD_GET, action => cancelable(get, action)),
    takeLatest(LIST_CARD_APPROVED, action => cancelable(approved, action)),
  ];
}

export default StandardTable;
