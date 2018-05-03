import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const { TabPane } = Tabs;

export default class PageHeader extends PureComponent {
  static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  onChange = (key) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };
  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;
    return (last || !route.component)
      ? <span>{route.breadcrumbName}</span>
      : createElement(linkElement, {
        href: paths.join('/') || '/',
        to: paths.join('/') || '/',
      }, route.breadcrumbName);
  }
  render() {
    const { title, logo, action, content, extraContent, tabList, className, activeTabKey } = this.props;
    const clsString = classNames(styles.pageHeader, className);

    let tabDefaultValue;
    if (activeTabKey !== undefined && tabList) {
      tabDefaultValue = tabList.filter(item => item.default)[0] || tabList[0];
    }

    const activeKeyProps = {
      defaultActiveKey: tabDefaultValue && tabDefaultValue.key,
    };
    if (activeTabKey !== undefined) {
      activeKeyProps.activeKey = activeTabKey;
    }

    return (
      <div className={clsString}>
        <div className={styles.detail}>
          {logo && <div className={styles.logo}>{logo}</div>}
          <div className={styles.main}>
            <div className={styles.row}>
              {title && <h1 className={styles.title}>{title}</h1>}
              {action && <div className={styles.action}>{action}</div>}
            </div>
            <div className={styles.row}>
              {content && <div className={styles.content}>{content}</div>}
              {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
            </div>
          </div>
        </div>
        {
          tabList &&
          tabList.length && (
            <Tabs
              className={styles.tabs}
              {...activeKeyProps}
              onChange={this.onChange}
            >
              {
                tabList.map(item => <TabPane tab={item.tab} key={item.key} />)
              }
            </Tabs>
          )
        }
      </div>
    );
  }
}
