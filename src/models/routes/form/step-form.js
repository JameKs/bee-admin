import { call, put, takeLatest, fork, take, cancel, select } from 'redux-saga/effects';
import { getCity, addStepForm } from 'services/routes/form/step-form';
import { SET_ERROR, SET_ROUTES_STATE } from 'constants/reducers';
import { FORM_STEP_SETDATA, FORM_STEP_SETSTEP, FORM_STEP_PAGE2_INIT, FORM_STEP_ADD } from 'constants/routes/form';
import { FRAME_SAGA_CANCEL } from 'constants/frames';
import { SysUtils } from 'utils';

function* cancelable(saga, action) {
  const task = yield fork(saga, action);
  yield take(FRAME_SAGA_CANCEL);
  yield cancel(task);
}

function* setStep(action) {
  try {
    yield put({
      type: SET_ROUTES_STATE,
      payload: { nextStep: action.payload.nextStep },
    });
  } catch (e) {
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* setData(action) {
  try {
    yield put({
      type: SET_ROUTES_STATE,
      payload: { formData: action.payload.formData, nextStep: action.payload.nextStep },
    });
  } catch (e) {
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* page2Init() {
  try {
    const page2Inited = yield select(state => state.routes.page2Inited);
    if (page2Inited) return;
    yield put({ type: SET_ROUTES_STATE, payload: { cityLoading: true } });
    const response = yield call(getCity);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    yield put({ type: SET_ROUTES_STATE, payload: { cityData: response.data, cityLoading: false, page2Inited: true } });
  } catch (e) {
    yield put({ type: SET_ROUTES_STATE, payload: { cityLoading: false } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* add(action) {
  try {
    yield put({
      type: SET_ROUTES_STATE,
      payload: { formData: action.payload.formData, submitLoading: true },
    });
    const response = yield call(addStepForm, action.payload.formData);
    yield put({ type: SET_ROUTES_STATE, payload: { response, nextStep: action.payload.nextStep, submitLoading: false } });
  } catch (e) {
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* StepForm() {
  yield [
    takeLatest(FORM_STEP_SETSTEP, action => cancelable(setStep, action)),
    takeLatest(FORM_STEP_SETDATA, action => cancelable(setData, action)),
    takeLatest(FORM_STEP_PAGE2_INIT, action => cancelable(page2Init, action)),
    takeLatest(FORM_STEP_ADD, action => cancelable(add, action)),
  ];
}

export default StepForm;
