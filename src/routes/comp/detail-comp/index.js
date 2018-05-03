import React, { PureComponent } from 'react';
import { Card, Row, Tag, Table, List, Icon } from 'antd';
import { connect } from 'react-redux';
import { SysUtils } from 'utils';
import styles from './styles/index.less';

const columns = [{
  title: '参数',
  dataIndex: 'name',
  key: 'name',
  width: '25%',
}, {
  title: '说明',
  dataIndex: 'desc',
  key: 'desc',
  width: '40%',
}, {
  title: '类型',
  dataIndex: 'type',
  key: 'type',
  width: '15%',
}, {
  title: '是否必输',
  dataIndex: 'required',
  key: 'required',
  width: '10%',
}, {
  title: '默认值',
  dataIndex: 'default',
  key: 'default',
  width: '10%',
}];

class DetailComp extends PureComponent {
  handleGo2PreviousPage = () => {
    const { dispatch, history, gobackRoute } = this.props;
    SysUtils.push2Route(dispatch, history, gobackRoute);
  }
  render() {
    const { data } = this.props;
    if (data == null) {
      return (
        <h3>获取数据失败</h3>
      );
    } else {
      return (
        <Card bordered={false} className={styles.card}>
          <Row>
            <h1 className={styles.firstTitle}>{`${data.title} 组件`}<Tag className={styles.tag} color="#2db7f5">{data.version}</Tag></h1>
          </Row>
          <Row>
            <div className={styles.content}>{data.name}</div>
          </Row>
          <Row>
            <div className={styles.content}>{data.description}</div>
          </Row>
          <Row>
            <h2 className={styles.secondTitle}>何时使用</h2>
          </Row>
          <Row>
            <div className={styles.content}>{data.whenUse}</div>
          </Row>
          <Row>
            <h2 className={styles.secondTitle}>校验规则</h2>
          </Row>
          <Row>
            <List
              bordered
              dataSource={data.rules}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            />
          </Row>
          {
            data.rest == null
              ? null
              : <div>
                <Row>
                  <h2 className={styles.secondTitle}>REST接口</h2>
                </Row>
                <Row>
                  <div className={styles.content}>{data.rest}</div>
                </Row>
              </div>
          }
          <Row>
            <h2 className={styles.secondTitle}>API</h2>
          </Row>
          <Row>
            <div className={styles.api}>
              <pre>
                <code className="error-mapped-context typescript">
                  {data.api}
                </code>
              </pre>
            </div>
          </Row>
          <Row>
            <h2 className={styles.secondTitle}>属性</h2>
          </Row>
          <Row>
            <Table bordered pagination={false} columns={columns} dataSource={data.props} />
          </Row>
          <Row>
            <a onClick={this.handleGo2PreviousPage}>
              <div className={styles.secondTitle}>
                <Icon type="arrow-left" /> 回到上一页
              </div>
            </a>
          </Row>
        </Card>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    data: state.routes.data,
    gobackRoute: state.routes.gobackRoute,
  };
}

export default connect(mapStateToProps)(DetailComp);
