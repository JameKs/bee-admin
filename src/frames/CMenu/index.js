import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon, Spin } from 'antd';
import { SET_FRAMES_STATE, SET_LAYOUTS_STATE } from 'constants/reducers';
import { SysUtils } from 'utils';

const SubMenu = Menu.SubMenu;

class CMenu extends React.PureComponent {
  componentWillMount() {
    const { dispatch } = this.props;
    const route = window.location.pathname;
    this.setMenuSelected(dispatch, route);
  }

  setMenuSelected = (dispatch, route) => {
    const path = route === '/' ? '/dashboard' : route;
    const openKeys = path.substr(1, path.lastIndexOf('/') - 1).split('/');
    const selectedKey = path.substr(path.lastIndexOf('/') + 1, path.length);
    this.props.dispatch({
      type: SET_FRAMES_STATE,
      payload: { menukeys: { openKeys, selectedKey }, locations: path.split('/').slice(1) },
    });
  }

  handleClick = (e) => {
    const openKeys = SysUtils.getPropsValue(this.props, ['menukeys', 'openKeys'], []);
    this.props.dispatch({
      type: SET_FRAMES_STATE,
      payload: { menukeys: { openKeys, selectedKey: e.key }, locations: e.keyPath.slice().reverse() },
    });
    this.props.dispatch({ type: SET_LAYOUTS_STATE, payload: { popmVisible: false } });
  }

  handleOpenChange = (v) => {
    const selectedKey = SysUtils.getPropsValue(this.props, ['menukeys', 'selectedKey'], '');
    this.props.dispatch({ type: SET_FRAMES_STATE, payload: { menukeys: { openKeys: v, selectedKey } } });
  }

  createMenus = (menusData, parentPath = '') => {
    if (!menusData) return [];

    return menusData.map((item) => {
      if (!item.isEntrance) {
        return null;
      }
      const itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      if (item.children) {
        return (
          <SubMenu key={item.path} title={<span> {item.icon && <Icon type={item.icon} />}<span>{item.name}</span></span>}>
            {this.createMenus(item.children, itemPath)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>
          <Link to={itemPath}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  }

  render() {
    // TODO: 效率问题
    const { data, loading } = this.props;
    return (
      <Spin spinning={loading}>
        <Menu
          onClick={this.handleClick}
          theme="dark"
          mode="inline"
          selectedKeys={[SysUtils.getPropsValue(this.props, ['menukeys', 'selectedKey'], '')]}
          openKeys={SysUtils.getPropsValue(this.props, ['menukeys', 'openKeys'], [])}
          onOpenChange={this.handleOpenChange}
        >
          {this.createMenus(data)}
        </Menu>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.frames.cmenu.data,
    loading: state.frames.cmenu.loading,
    collapsed: state.layouts.siderCollapsed,
    menukeys: state.frames.menukeys,
  };
}

export default connect(mapStateToProps)(CMenu);
