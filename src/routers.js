import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { CRoute } from 'frames';
import { UserLayout } from 'layouts';
import App from 'App';

class Routers extends PureComponent {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router history={this.props.history}>
          <Switch>
            <Route path="/user" component={UserLayout} />
            <CRoute path="/" component={App} />
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}

export default Routers;
