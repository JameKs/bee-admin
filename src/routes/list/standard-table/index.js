import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Button, Spin, Input, Icon, Table, Divider } from 'antd';
import { SysUtils, LayoutUtils, ParseUtils } from 'utils';
import utilStyles from 'styles/utils.less';
import { LIST_STANDARD_TABLE_INIT, LIST_STANDARD_TABLE_GET, LIST_STANDARD_ONE_GET } from 'constants/routes/list';
import SyncModal from './SyncModal';
import ASyncModal from './AsyncModal';

const C3I0Layout = LayoutUtils.getFormItemLayout(3, 0);
const C3I1Layout = LayoutUtils.getFormItemLayout(3, 1);
const C3I2Layout = LayoutUtils.getFormItemLayout(3, 1);
const C3Layout = LayoutUtils.getFormItemLayoutWithoutOffset(3);
const C3I1E2Layout = LayoutUtils.getFormItemLayout(3, 1, 2);

class StandardTable extends PureComponent {
  state = {
    expandForm: false,
    filters: {},
    sorter: {},
    searchParams: {},
    pagination: { showSizeChanger: true, showQuickJumper: true },
    syncVisible: false,
    syncRecord: {},
  }

  componentWillMount() {
    const { pagination, filters, sorter, searchParams } = this.state;
    const params = SysUtils.createTableParams(pagination, filters, sorter, searchParams);
    this.props.dispatch({ type: LIST_STANDARD_TABLE_INIT, payload: { params } });
  }

  toggleForm = () => {
    this.setState({ expandForm: !this.state.expandForm });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    this.setState({ pagination, filters, sorter });

    const params = SysUtils.createTableParams(pagination, filters, sorter, this.state.searchParams);
    dispatch({ type: LIST_STANDARD_TABLE_GET, payload: { params } });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    const { pagination, filters, sorter } = this.state;
    const searchParams = SysUtils.removeEmptyAttributes(form.getFieldsValue());
    const newPagination = { ...pagination, current: 1 };
    this.setState({ searchParams, pagination: newPagination });
    const params = SysUtils.createTableParams(newPagination, filters, sorter, searchParams);
    dispatch({ type: LIST_STANDARD_TABLE_GET, payload: { params } });
  }

  handleReset = () => {
    const { form, dispatch } = this.props;
    const { pagination, filters, sorter } = this.state;
    form.resetFields();
    const newPagination = { ...pagination, current: 1 };
    this.setState({ searchParams: {}, pagination: newPagination });
    const params = SysUtils.createTableParams(newPagination, filters, sorter, {});
    dispatch({ type: LIST_STANDARD_TABLE_GET, payload: { params } });
  }

  handleSyncViewClick = (record) => {
    this.setState({ syncRecord: record, syncVisible: true });
  }

  handleSyncViewClose = () => {
    this.setState({ syncVisible: false });
  }

  handleAsyncViewClick = (record) => {
    const { dispatch } = this.props;
    dispatch({ type: LIST_STANDARD_ONE_GET, payload: { id: record.id } });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={16}>
          <Col {...C3I0Layout}>
            <Form.Item label="用户名">
              {
                getFieldDecorator('username', {
                })(<Input placeholder="请输入用户名" />)
              }
            </Form.Item>
          </Col>
          <Col {...C3I1Layout}>
            <Form.Item label="手机号码">
              {
                getFieldDecorator('phone', {
                })(<Input placeholder="请输入手机号码" />)
              }
            </Form.Item>
          </Col>
          <Col {...C3Layout} style={{ textAlign: 'left' }}>
            <span>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 16 }} onClick={this.handleReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={16}>
          <Col {...C3I0Layout}>
            <Form.Item label="用户名">
              {
                getFieldDecorator('username', {
                })(<Input placeholder="请输入用户名" />)
              }
            </Form.Item>
          </Col>
          <Col {...C3I1Layout}>
            <Form.Item label="手机号码">
              {
                getFieldDecorator('phone', {
                })(<Input placeholder="请输入手机号码" />)
              }
            </Form.Item>
          </Col>
          <Col {...C3I2Layout}>
            <Form.Item label="邮箱地址">
              {
                getFieldDecorator('email', {
                })(<Input placeholder="请输入邮箱地址" />)
              }
            </Form.Item>
          </Col>
          <Col {...C3I0Layout}>
            <Form.Item label="姓名">
              {
                getFieldDecorator('actualName', {
                })(<Input placeholder="请输入姓名" />)
              }
            </Form.Item>
          </Col>
          <Col {...C3I1E2Layout} style={{ textAlign: 'right' }}>
            <span>
              <Button type="primary" onClick={this.handleSubmit} >查询</Button>
              <Button style={{ marginLeft: 16 }} onClick={this.handleReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="up" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return (
      <Spin spinning={SysUtils.getPropsValue(this.props, ['tableLoading'], false)}>
        {this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm()}
      </Spin>
    );
  }

  renderTable() {
    const { pagination } = this.state;
    const { tableData, total, tableLoading, viewLoading } = this.props;
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '邮箱地址',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '姓名',
      dataIndex: 'actualName',
      key: 'actualName',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      filters: [
        {
          text: '男',
          value: '1',
        }, {
          text: '女',
          value: '2',
        },
      ],
      render: sex => ParseUtils.parseSexValue(sex),
    }, {
      title: '出生日期',
      dataIndex: 'birthday',
      key: 'birthday',
      sorter: true,
      render: birthday => ParseUtils.parseDateTimeString(birthday, 'DD-MM-YYYY', 'YYYY年MM月DD日'),
    }, {
      title: '所属城市',
      dataIndex: 'city',
      key: 'city',
    }, {
      title: '每月收入',
      dataIndex: 'income',
      key: 'income',
      render: income => ParseUtils.parseAmtUppercase(income),
    }, {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
    }, {
      title: '操作',
      render: (text, record) => (
        <Spin size="small" spinning={viewLoading == null ? false : viewLoading}>
          <a onClick={() => this.handleSyncViewClick(record)}>同步查看</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleAsyncViewClick(record)}>异步查看</a>
        </Spin>
      ),
    }];
    return (
      <Table
        columns={columns}
        rowKey="id"
        dataSource={tableData}
        pagination={{ ...pagination, total }}
        loading={tableLoading}
        onChange={this.handleTableChange}
      />
    );
  }

  renderSyncModal = () => {
    const { syncVisible, syncRecord } = this.state;
    return (
      <SyncModal
        visible={syncVisible}
        record={syncRecord}
        onClose={this.handleSyncViewClose}
      />
    );
  }

  renderAsyncModal = () => {
    return (<ASyncModal />);
  }

  render() {
    return (
      <Card title="标准表格" bordered={false}>
        <div className={utilStyles.inlineForm} style={{ marginBottom: 8 }}>
          {this.renderForm()}
        </div>
        {this.renderTable()}
        {this.renderSyncModal()}
        {this.renderAsyncModal()}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    total: state.routes.total,
    tableData: state.routes.tableData,
    tableLoading: state.routes.tableLoading,
    viewLoading: state.routes.viewLoading,
  };
}


export default connect(mapStateToProps)(Form.create()(StandardTable));
