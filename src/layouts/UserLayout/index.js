import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Icon } from 'antd';
import Login from 'routes/user/login';
import NotFound from 'routes/exception/404';
import config from 'src/config.json';
import FooterLayout from './FooterLayout';
import styles from './styles/index.less';

const links = [{
  title: '帮助',
  href: config.helpLink,
  blankTarget: true,
}, {
  title: '隐私',
  href: config.privacyLink,
  blankTarget: true,
}, {
  title: '条款',
  href: config.termsLink,
  blankTarget: true,
}];

const copyright = <div>Copyright <Icon type="copyright" />{config.copyright}</div>;

class UserLayout extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div>
          <div className={styles.top}>
            <img alt="" className={styles.logo} src="/favicon.ico" />
            <span className={styles.title}>{config.title}</span>
          </div>
          <p className={styles.desc}>{config.desc}</p>
          <Switch>
            <Route path="/user/login" exact component={Login} />
            <Route component={NotFound} />
          </Switch>
          <FooterLayout className={styles.footer} links={links} copyright={copyright} />
        </div>
      </div>
    );
  }
}

export default UserLayout;
