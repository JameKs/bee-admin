import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Icon } from 'antd';
import { SysUtils } from 'utils';
import styles from './styles/index.less';

class CBread extends PureComponent {
  createBreadcrumb = (data, locations) => {
    if (data == null || data.length === 0 || locations == null || locations.length === 0) {
      return '';
    } else {
      return SysUtils.convertBreadcrumbPaths(locations).map((path) => {
        return (
          <Breadcrumb.Item key={path}>
            <span>{data[path] || data[path.replace('/', '')]}</span>
          </Breadcrumb.Item>
        );
      });
    }
  }

  render() {
    const { data, locations } = this.props;
    return (
      <Breadcrumb className={styles.bread}>
        <Breadcrumb.Item key="home">
          <Icon type="home" />
          <span>首页</span>
        </Breadcrumb.Item>
        {this.createBreadcrumb(data, locations)}
      </Breadcrumb>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.frames.cbread.data,
    locations: state.frames.locations,
  };
}

export default connect(mapStateToProps)(CBread);
