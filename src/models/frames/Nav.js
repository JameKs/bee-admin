import { call, put, takeLatest } from 'redux-saga/effects';
import { getNavs } from 'services/frames/navs';
import { SET_FRAMES_STATE, SET_ERROR } from 'constants/reducers';
import { FRAME_NAV_GETDATA } from 'constants/frames';
import { SysUtils } from 'utils';

function* getNavData(action) {
  try {
    yield put({ type: SET_FRAMES_STATE, payload: { cmenu: { loading: true } } });
    const response = yield call(getNavs, action.payload.userid);
    if (!SysUtils.isFetchSucc(response)) {
      throw new Error(SysUtils.getError(response));
    }
    const navData = response.data.nav;
    const menuData = SysUtils.getMenuData(navData);
    const routeData = SysUtils.getRouteData(navData, 'AppLayout');
    const breadcrumbNameMap = SysUtils.getBreadcrumbNameMap(menuData, routeData);

    yield put({
      type: SET_FRAMES_STATE,
      payload: { cmenu: { data: menuData, loading: false }, croute: { data: routeData }, cbread: { data: breadcrumbNameMap } },
    });
    action.payload.handleRoutesData(routeData);
  } catch (e) {
    yield put({ type: SET_FRAMES_STATE, payload: { cmenu: { loading: false } } });
    yield put({ type: SET_ERROR, payload: e });
  }
}

function* Nav() {
  yield [
    takeLatest(FRAME_NAV_GETDATA, getNavData),
  ];
}

export default Nav;
