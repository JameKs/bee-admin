import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Button, Icon } from 'antd';
import moment from 'moment';
import { FRAME_PUSH_ROUTE } from 'constants/frames';
import { SET_ROUTES_STATE, REPLACE_ROUTES_STATE } from 'constants/reducers';

class SysUtils {
  static isFetchSucc = (response) => {
    if (response.code === 'OK') {
      return true;
    } else {
      return false;
    }
  }

  static getError = (response) => {
    return `${response.code}#${response.message}`;
  }

  static getPlainNode = (nodeList, parentPath = '') => {
    const arr = [];
    nodeList.forEach((node) => {
      const item = node;
      item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      item.exact = true;
      if (item.children && !item.component) {
        arr.push(...SysUtils.getPlainNode(item.children, item.path));
      } else {
        if (item.children && item.component) {
          item.exact = false;
        }
        arr.push(item);
      }
    });
    return arr;
  }

  static getRouteData = (navData, layout) => {
    if (!navData.some(item => item.layout === layout) ||
      !(navData.filter(item => item.layout === layout)[0].children)) {
      return null;
    }

    let routeData = [];
    const nodes = cloneDeep(navData.filter(item => item.layout === layout));
    routeData = nodes.reduce((arr, current) => arr.concat(SysUtils.getPlainNode(current.children)), routeData);
    return routeData;
  }

  static getMenuData = (navData) => {
    let menuData = [];
    navData.forEach((item) => {
      if (item.layout === 'AppLayout') {
        menuData = item.children.reduce((arr, current) => arr.concat(current), menuData);
      }
    });
    return menuData;
  }

  static getMenuHasChildren = (menuData, parentPath) => {
    let menuHasChildren = [];
    menuData.forEach((item) => {
      if (item.children != null) {
        const newParentPath = `${parentPath}/${item.path}`;
        const newItem = { ...item };
        newItem.path = newParentPath;
        menuHasChildren = menuHasChildren.concat(newItem);
        menuHasChildren = menuHasChildren.concat(SysUtils.getMenuHasChildren(item.children, newParentPath));
      }
    });
    return menuHasChildren;
  }

  static getBreadcrumbNameMap = (menuData, routeData) => {
    let menuHasChildren = [];
    const breadcrumbNameMap = {};
    menuHasChildren = SysUtils.getMenuHasChildren(menuData, '');
    routeData.concat(menuHasChildren).forEach((item) => {
      breadcrumbNameMap[item.path] = item.name;
    });
    return breadcrumbNameMap;
  }

  static convertBreadcrumbPaths = (paths) => {
    const convert = [];
    let subPath = '';
    for (const path of paths) {
      subPath += `/${path}`;
      convert.push(subPath);
    }
    return convert;
  }

  static getPropsValue = (props, params, defaultValue = undefined) => {
    let propsValue = props;
    for (const param of params) {
      if (propsValue[param] == null) {
        return defaultValue;
      } else {
        propsValue = propsValue[param];
      }
    }
    return propsValue;
  }

  static createTableParams = (pagination, filters, sorter, searchParams, extendParams) => {
    const limit = pagination.pageSize == null ? 10 : pagination.pageSize;
    const order = sorter.order == null ? null : sorter.order === 'ascend' ? 'asc' : 'desc';
    const params = {
      limit,
      page: pagination.current,
      sort: sorter.field,
      order,
      ...filters,
      ...searchParams,
      ...extendParams,
    };
    return params;
  }

  static createListParams = (pagination, searchParams) => {
    const limit = pagination.pageSize == null ? 10 : pagination.pageSize;
    const params = {
      limit,
      page: pagination.current,
      ...searchParams,
    };
    return params;
  }

  static getCurrentPage = (pagination) => {
    if (pagination.current !== 1) {
      if (((pagination.current - 1) * pagination.pageSize) + 1 === pagination.total) {
        return pagination.current - 1;
      } else {
        return pagination.current;
      }
    } else {
      return pagination.current;
    }
  }

  static removeEmptyAttributes = (oldObject) => {
    const newObject = {};
    const keys = Object.keys(oldObject);
    keys.forEach((key) => {
      if (oldObject[key] !== '') {
        newObject[key] = oldObject[key];
      }
    });
    return newObject;
  }

  static parse2String(param, ...args) {
    if (args.length === 0) {
      return String(param);
    } else if (param instanceof Array) {
      const parseParam = cloneDeep(param);
      for (let i = 0; i < param.length; i += 1) {
        for (const arg of args) {
          parseParam[i][arg] = String(param[i][arg], 10);
        }
      }
      return parseParam;
    } else {
      const parseParam = cloneDeep(param);
      for (const arg of args) {
        parseParam[arg] = String(param[arg], 10);
      }
      return parseParam;
    }
  }

  static parse2Int(param, ...args) {
    if (args.length === 0) {
      return parseInt(param, 10);
    } else if (param instanceof Array) {
      const parseParam = cloneDeep(param);
      for (let i = 0; i < param.length; i += 1) {
        for (const arg of args) {
          parseParam[i][arg] = parseInt(param[i][arg], 10);
        }
      }
      return parseParam;
    } else {
      const parseParam = cloneDeep(param);
      for (const arg of args) {
        parseParam[arg] = parseInt(param[arg], 10);
      }
      return parseParam;
    }
  }

  static guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
      });
  }

  static createDefErrExtra(response) {
    const extra = (
      <div>
        <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: '500', marginBottom: 16 }}>
          您提交的内容发生错误：
        </div>
        <div style={{ marginBottom: 16 }}>
          <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />错误码：<span style={{ color: '#f5222d' }}>{response.code}</span>
        </div>
        <div>
          <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
            错误信息：<span style={{ color: '#f5222d' }}>{response.message}</span>
        </div>
      </div>
    );
    return extra;
  }

  static createDefErrActions(dispatch, controlSign = { isOutput: false }) {
    const actions = (
      <div>
        <Button type="primary" onClick={() => { SysUtils.return2Edit(dispatch, controlSign); }}>
            返回修改
        </Button>
      </div>
    );
    return actions;
  }

  static createFiltersByDicts(props, params) {
    const dicts = SysUtils.getPropsValue(props, params, []);
    const filters = [];
    for (const dict of dicts) {
      const filter = { text: dict.dsc, value: dict.value };
      filters.push(filter);
    }
    return filters;
  }

  static createMomentObject(datetime, format) {
    if (datetime == null) {
      return undefined;
    } else {
      return moment(datetime, format);
    }
  }

  static return2Redo(dispatch) {
    dispatch({ type: REPLACE_ROUTES_STATE, payload: {} });
  }

  static return2Edit(dispatch, controlSign = { isOutput: false }) {
    dispatch({ type: SET_ROUTES_STATE, payload: controlSign });
  }

  static push2Route(dispatch, history, route, clearSign = true, changeMenu = true) {
    dispatch({ type: FRAME_PUSH_ROUTE, payload: { dispatch, history, route, clearSign, changeMenu } });
  }

  static push2Home(dispatch, history) {
    SysUtils.push2Route(dispatch, history, '/dashboard');
  }

  static thousandBitSeparator(num) {
    return parseFloat(num).toLocaleString('zh-cn');
  }

  static digitUppercase(n) {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟'],
    ];
    let num = Math.abs(n);
    let s = '';
    fraction.forEach((item, index) => {
      s += (digit[Math.floor(num * 10 * (10 ** index)) % 10] + item).replace(/零./, '');
    });
    s = s || '整';
    num = Math.floor(num);
    for (let i = 0; i < unit[0].length && num > 0; i += 1) {
      let p = '';
      for (let j = 0; j < unit[1].length && num > 0; j += 1) {
        p = digit[num % 10] + unit[1][j] + p;
        num = Math.floor(num / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }

    return s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  }
}

export default SysUtils;
