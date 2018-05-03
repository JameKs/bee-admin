import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

class ContentLayout extends PureComponent {
  render() {
    const { path, component } = this.props;
    return (
      <Content style={{ margin: '8px 16px', padding: 10 }}>
        <Switch>
          <Route path={path} exact component={component} />
        </Switch>
      </Content>
    );
  }
}

export default ContentLayout;
