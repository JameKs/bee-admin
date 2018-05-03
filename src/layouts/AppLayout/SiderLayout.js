import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { CMenu } from 'frames';
import config from 'src/config.json';
import styles from './styles/SiderLayout.less';

const { Sider } = Layout;
class SiderLayout extends PureComponent {
  render() {
    const { siderCollapsed } = this.props;
    return (
      <Sider
        className={styles.sider}
        trigger={null}
        breakpoint="lg"
        collapsed={siderCollapsed}
      >
        {
          siderCollapsed
            ? (
              <div className={styles.logo_collapsed}>
                <img src="/favicon.ico" alt="logo" />
              </div>
            )
            : (
              <div className={styles.logo_ncollapsed}>
                <img src="/favicon.ico" alt="logo" />
                <h1>{config.shortTitle}</h1>
              </div>
            )
        }
        <CMenu />
      </Sider>
    );
  }
}

function mapStateToProps(state) {
  return {
    siderCollapsed: state.layouts.siderCollapsed,
  };
}

// eslint-disable-next-line no-underscore-dangle
SiderLayout.__ANT_LAYOUT_SIDER = true;
export default connect(mapStateToProps)(SiderLayout);
