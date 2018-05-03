import { put, takeLatest } from 'redux-saga/effects';
import { SET_FRAMES_STATE, SET_ERROR } from 'constants/reducers';
import { FRAME_PUSH_ROUTE } from 'constants/frames';

function* push2Route(action) {
  try {
    const { history, route, clearSign, changeMenu } = action.payload;
    yield history.push({ pathname: route, state: { clearSign } });
    if (changeMenu === true) {
      const path = route === '/' ? '/dashboard' : route;
      const openKeys = path.substr(1, path.lastIndexOf('/') - 1).split('/');
      const selectedKey = path.substr(path.lastIndexOf('/') + 1, path.length);
      yield put({
        type: SET_FRAMES_STATE,
        payload: { menukeys: { openKeys, selectedKey }, locations: path.split('/').slice(1) },
      });
    }
  } catch (e) {
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* CRoute() {
  yield [
    takeLatest(FRAME_PUSH_ROUTE, push2Route),
  ];
}

export default CRoute;
