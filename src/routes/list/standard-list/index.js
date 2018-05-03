import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Radio, Input, List, Menu, Dropdown, Icon, Avatar, Progress, Spin } from 'antd';
import { SysUtils, ParseUtils } from 'utils';
import { LIST_STANDARD_INIT, LIST_STANDARD_GET, LIST_STANDARD_APPROVED } from 'constants/routes/list';
import styles from './styles/index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

class StandardList extends PureComponent {
  state = {
    pagination: {
      current: 1,
      pageSize: 5,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => this.handlePageChange(page, pageSize),
      onShowSizeChange: (current, size) => this.handlePageShowSizeChange(current, size),
    },
    searchParams: {
      type: 1,
    },
  }

  componentWillMount() {
    const { pagination, searchParams } = this.state;
    const params = SysUtils.createListParams(pagination, searchParams);
    this.props.dispatch({ type: LIST_STANDARD_INIT, payload: { params } });
  }

  handlePageChange = (page, pageSize) => {
    const { pagination, searchParams } = this.state;
    const newPagination = { ...pagination, current: page, pageSize };
    this.setState({ pagination: newPagination });
    const params = SysUtils.createListParams(newPagination, searchParams);
    this.props.dispatch({ type: LIST_STANDARD_GET, payload: { params } });
  }

  handleTypeChange = (event) => {
    const { pagination, searchParams } = this.state;

    const type = event.target.value;
    let newSearchParams = null;
    if (type === '3') {
      newSearchParams = { ...searchParams, type: 1, highPriority: 1 };
    } else {
      newSearchParams = { ...searchParams, type, highPriority: null };
    }
    const newPagination = { ...pagination, current: 1 };
    this.setState({ pagination: newPagination, searchParams: newSearchParams });
    const params = SysUtils.createListParams(newPagination, newSearchParams);
    this.props.dispatch({ type: LIST_STANDARD_GET, payload: { params } });
  }

  handleSearch = (value) => {
    const { pagination, searchParams } = this.state;
    const newSearchParams = { ...searchParams, approvalNo: value === '' ? null : value };
    const newPagination = { ...pagination, current: 1 };

    this.setState({ pagination: newPagination, searchParams: newSearchParams });
    const params = SysUtils.createListParams(newSearchParams, newSearchParams);
    this.props.dispatch({ type: LIST_STANDARD_GET, payload: { params } });
  }

  handlePageShowSizeChange = (current, size) => {
    const { pagination, searchParams } = this.state;
    const newPagination = { ...pagination, current, pageSize: size };
    this.setState({ pagination: newPagination });
    const params = SysUtils.createListParams(newPagination, searchParams);
    this.props.dispatch({ type: LIST_STANDARD_GET, payload: { params } });
  }

  handleApproved = (item) => {
    this.props.dispatch({ type: LIST_STANDARD_APPROVED, payload: { approvalNo: item.approvalNo, handleApprovedSucc: this.handleApprovedSucc } });
  }

  handleApprovedSucc = () => {
    const { dispatch, history } = this.props;
    const route = '/profile/advanced-profile';
    SysUtils.push2Route(dispatch, history, route, false);
  }

  renderHeader = () => {
    const pending = SysUtils.getPropsValue(this.props, ['headerData', 'pending'], 0);
    const highPriority = SysUtils.getPropsValue(this.props, ['headerData', 'highPriority'], 0);
    const completed = SysUtils.getPropsValue(this.props, ['headerData', 'completed'], 0);

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    return (
      <Card bordered={false}>
        <Spin spinning={SysUtils.getPropsValue(this.props, ['headerLoading'], false)}>
          <Row>
            <Col sm={8} xs={24}>
              <Info title="我的待审批任务" value={`${pending}个任务`} bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="高优先级审批任务" value={`${highPriority}个任务`} bordered />
            </Col>
            <Col sm={8} xs={24}>
              <Info title="本周完成的审批任务" value={`${completed}个任务`} />
            </Col>
          </Row>
        </Spin>
      </Card>
    );
  }

  renderListCard = () => {
    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="1" onChange={this.handleTypeChange}>
          <RadioButton value="1">待审批</RadioButton>
          <RadioButton value="3">高优先级</RadioButton>
          <RadioButton value="2">已完成</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={this.handleSearch}
        />
      </div>
    );
    return (
      <Card
        className={styles.listCard}
        bordered={false}
        title="标准列表"
        style={{ marginTop: 24 }}
        bodyStyle={{ padding: '0 32px 40px 32px' }}
        extra={extraContent}
      >
        {this.renderList()}
      </Card>
    );
  }

  renderList = () => {
    const { listLoading, listData, total } = this.props;
    const { pagination, searchParams } = this.state;

    const ListContent = ({ data: { submitter, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div>
          <span>提交员工</span>
          <p>{submitter}</p>
        </div>
        <div>
          <span>开始时间</span>
          <p>{ParseUtils.parseDateTimeString(createdAt, 'YYYY-MM-DD', 'YYYY-MM-DD hh:mm')}</p>
        </div>
        <div>
          <Progress percent={percent} status={status} strokeWidth={6} />
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>操作一</a>
        </Menu.Item>
        <Menu.Item>
          <a>操作二</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <List
        size="large"
        rowKey="id"
        loading={listLoading}
        pagination={{ ...pagination, total }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            actions={[
              searchParams.type === '2'
                ? <a>查看</a>
                : <a onClick={() => this.handleApproved(item)}>审批</a>,
              <MoreBtn />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.logo} shape="square" size="large" />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            <ListContent data={item} />
          </List.Item>
        )}
      />
    );
  }

  render() {
    return (
      <div className={styles.standardList}>
        {this.renderHeader()}
        {this.renderListCard()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    headerLoading: state.routes.headerLoading,
    listLoading: state.routes.listLoading,
    total: state.routes.total,
    headerData: state.routes.headerData,
    listData: state.routes.listData,
  };
}

export default connect(mapStateToProps)(StandardList);
