import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { getMarginAcct } from 'services/components/loan/MarginAcct';
import { SET_ERROR } from 'constants/reducers';
import { LOAN_VERIFY_MARGINACCT } from 'constants/components/loan';
import { FRAME_SAGA_CANCEL } from 'constants/frames';
import { SysUtils } from 'utils';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* verifyMarginAcct(action) {
  try {
    const { acct, handleResult } = action.payload;
    const response = yield call(getMarginAcct, acct);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    handleResult(response.data);
  } catch (e) {
    action.payload.handleResult();
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* MarginAcct() {
  yield [
    takeLatest(LOAN_VERIFY_MARGINACCT, action => cancelable(verifyMarginAcct, action)),
  ];
}

export default MarginAcct;
