import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Badge, Popover, Spin } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CMenu } from 'frames';
import { USER_LOGOUT } from 'constants/routes/user';
import { SET_LAYOUTS_STATE } from 'constants/reducers';
import styles from './styles/HeaderLayout.less';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

class HeaderLayout extends PureComponent {
  state = {
    username: window.sessionStorage.getItem('username'),
    userCenterLoading: false,
  };

  toggle = () => {
    const { siderCollapsed } = this.props;
    this.props.dispatch({ type: SET_LAYOUTS_STATE, payload: { siderCollapsed: !siderCollapsed } });
  }

  handleClick = (e) => {
    if (e.key === 'logout') {
      this.setState({ userCenterLoading: true });
      const userid = window.sessionStorage.getItem('userid');
      this.props.dispatch({ type: USER_LOGOUT, payload: { userid, handleSuccess: this.handleSuccess } });
    }
  }

  handleSuccess = () => {
    this.setState({ userCenterLoading: false });
    this.props.history.push('/user/login');
  }

  handleVisibleChange = (visible) => {
    this.props.dispatch({ type: SET_LAYOUTS_STATE, payload: { popmVisible: visible } });
  }

  render() {
    const { username, userCenterLoading } = this.state;
    const { siderCollapsed, isMobile, popmVisible } = this.props;

    return (
      <Header style={{ background: '#fff', padding: 0, height: 64 }}>
        <div className={styles.header}>
          {
            isMobile
              ? (
                <Popover
                  content={<div className={styles.popovermenu}><CMenu /></div>}
                  trigger="click"
                  placement="bottomLeft"
                  visible={popmVisible}
                  onVisibleChange={this.handleVisibleChange}
                >
                  <Icon type="bars" className={styles.button} />
                </Popover>
              )
              : (
                <Icon className={styles.button} style={{ fontSize: 20 }} type={siderCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
              )
          }
          <div className={styles.rightWarpper}>
            <div className={styles.button}>
              <Badge count={2}>
                <Icon style={{ fontSize: 14, color: '#08c' }} type="mail" />
              </Badge>
            </div>
            <Spin spinning={userCenterLoading}>
              <Menu className={styles.menu} mode="horizontal" onClick={this.handleClick}>
                <SubMenu
                  style={{ float: 'right' }}
                  title={<span> <Icon type="user" style={{ fontSize: 14, color: '#08c' }} />{username} </span>}
                >
                  <Menu.Item key="logout">
                    <Icon type="logout" style={{ fontSize: 12, color: '#08c' }} />
                    <span>登出</span>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Spin>
          </div>
        </div>
      </Header>
    );
  }
}

function mapStateToProps(state) {
  return {
    siderCollapsed: state.layouts.siderCollapsed,
    isMobile: state.layouts.isMobile,
    popmVisible: state.layouts.popmVisible,
  };
}

export default connect(mapStateToProps)(withRouter(HeaderLayout));
