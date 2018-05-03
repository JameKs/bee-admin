import React, { PureComponent } from 'react';
import { Layout, Icon } from 'antd';
import { CBread } from 'frames';
import config from 'src/config.json';
import HeaderLayout from './HeaderLayout';
import SiderLayout from './SiderLayout';
import ContentLayout from './ContentLayout';
import FooterLayout from './FooterLayout';
import styles from './styles/index.less';

class AppLayout extends PureComponent {
  render() {
    const links = [{
      title: config.company,
      href: config.companyLink,
      blankTarget: true,
    }];
    const copyright = <div>Copyright <Icon type="copyright" />{config.copyright}</div>;
    const { isMobile, location, component } = this.props;
    return (
      <Layout className={styles.app}>
        {!isMobile && <SiderLayout />}
        <Layout>
          <HeaderLayout />
          <CBread />
          <ContentLayout path={location.pathname} component={component} />
          <FooterLayout links={links} copyright={copyright} />
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout;
