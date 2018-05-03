import React, { PureComponent } from 'react';
import { Card, List } from 'antd';
import { connect } from 'react-redux';
import { Ellipsis } from 'components/basic';
import { FORM_COMP_DETAIL } from 'constants/routes/comp';
import { SysUtils } from 'utils';
import API from './api.js';
import data from './data.json';
import styles from './styles/index.less';

class BasicComp extends PureComponent {
  handleView = (item) => {
    const api = API.getApi(item.title);
    const gobackRoute = '/comp/basic-comp';
    this.props.dispatch({ type: FORM_COMP_DETAIL, payload: { data: { ...item, api }, gobackRoute, handleViewSucc: this.handleViewSucc } });
  }

  handleViewSucc = () => {
    const { dispatch, history } = this.props;
    const route = '/comp/detail-comp';
    SysUtils.push2Route(dispatch, history, route, false, false);
  }

  render() {
    return (
      <div className={styles.list}>
        <List
          rowKey="id"
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                className={styles.card}
                hoverable
                actions={[
                  <a onClick={() => this.handleView(item)}>查看详情</a>,
                ]}
              >
                <Card.Meta
                  avatar={<img alt="" className={styles.cardAvatar} src="/list/dURIMkkrRFpPgTuzkwnB.png" />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={(
                    <Ellipsis className={styles.item}>
                      {
                        <div>
                          <div>{item.name}</div>
                          <div>{item.description}</div>
                        </div>
                      }
                    </Ellipsis>
                  )}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default connect()(BasicComp);
