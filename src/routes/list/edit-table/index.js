import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Spin, Table, Button, Divider, Popconfirm } from 'antd';
import { SysUtils, ParseUtils } from 'utils';
import { LIST_EDIT_TABLE_INIT, LIST_EDIT_TABLE_GET,
  LIST_EDIT_TABLE_ADD, LIST_EDIT_TABLE_EDIT, LIST_EDIT_TABLE_DEL } from 'constants/routes/list';
import EditModal from './EditModal';

class EditTable extends PureComponent {
  state = {
    filters: {},
    sorter: {},
    searchParams: {},
    pagination: { showSizeChanger: true, showQuickJumper: true },
    visible: false,
    record: {},
    isAdd: true,
  }

  componentWillMount() {
    const { pagination, filters, sorter, searchParams } = this.state;
    const params = SysUtils.createTableParams(pagination, filters, sorter, searchParams);
    this.props.dispatch({ type: LIST_EDIT_TABLE_INIT, payload: { params } });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;
    this.setState({ pagination, filters, sorter });

    const params = SysUtils.createTableParams(pagination, filters, sorter, this.state.searchParams);
    dispatch({ type: LIST_EDIT_TABLE_GET, payload: { params } });
  }

  handleAddClick = () => {
    this.setState({ record: {}, visible: true, isAdd: true });
  }

  handleEditClick = (record) => {
    this.setState({ record, visible: true, isAdd: false });
  }

  handleDeleteClick = (record) => {
    const { pagination, filters, sorter, searchParams } = this.state;
    const currentPagination = { ...pagination };
    const current = SysUtils.getCurrentPage(pagination);
    if (current !== pagination.current) {
      this.setState({ pagination: { ...pagination, current } });
      currentPagination.current = current;
    }
    const params = SysUtils.createTableParams(currentPagination, filters, sorter, searchParams);
    this.props.dispatch({ type: LIST_EDIT_TABLE_DEL, payload: { id: record.id, params } });
  }

  handleAdd = () => {
    const { dispatch } = this.props;
    this.form.validateFields((err, values) => {
      if (err) return;
      const parseBirthday = ParseUtils.parseMomentObject(values.birthday, 'MM-DD-YYYY');
      dispatch({ type: LIST_EDIT_TABLE_ADD, payload: { formData: { ...values, parseBirthday }, handleSucc: this.handleSucc } });
    });
  }

  handleEdit = () => {
    const { dispatch } = this.props;
    this.form.validateFields((err, values) => {
      if (err) return;
      const parseBirthday = ParseUtils.parseMomentObject(values.birthday, 'MM-DD-YYYY');
      dispatch({ type: LIST_EDIT_TABLE_EDIT, payload: { formData: { ...values, parseBirthday }, handleSucc: this.handleSucc } });
    });
  }

  handleSucc = () => {
    const { pagination, filters, sorter, searchParams } = this.state;
    const params = SysUtils.createTableParams(pagination, filters, sorter, searchParams);
    this.setState({ visible: false });
    this.props.dispatch({ type: LIST_EDIT_TABLE_INIT, payload: { params } });
  }

  handleClose = () => {
    this.setState({ visible: false });
  }

  saveForm = (form) => {
    this.form = form;
  }

  renderAddButton = () => {
    return (
      <Button type="primary" style={{ marginBottom: 16 }} onClick={this.handleAddClick}>添加</Button>
    );
  }
  renderTable() {
    const { pagination } = this.state;
    const { cityData, tableData, total, tableLoading } = this.props;
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
      filters: SysUtils.createFiltersByDicts(this.props, ['dicts', 'sex']),
      render: sex => ParseUtils.parseValueByDicts(this.props, ['dicts', 'sex'], sex),
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
      render: city => ParseUtils.parseCascaderValues(cityData, city),
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
        <Spin spinning={SysUtils.getPropsValue(this.props, ['editLoading'], false)}>
          <a onClick={() => this.handleEditClick(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定要删除当前记录?" onConfirm={() => this.handleDeleteClick(record)}>
            <a>删除</a>
          </Popconfirm>
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

  renderEditModal = () => {
    const { visible, record, isAdd } = this.state;
    const { cityData } = this.props;
    return (
      <EditModal
        key={SysUtils.guid()}
        visible={visible}
        isAdd={isAdd}
        record={record}
        cityData={cityData}
        saveForm={this.saveForm}
        onEdit={this.handleEdit}
        onAdd={this.handleAdd}
        onClose={this.handleClose}
      />
    );
  }

  render() {
    return (
      <Card title="编辑表格" bordered={false}>
        {this.renderAddButton()}
        {this.renderTable()}
        {this.renderEditModal()}
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    total: state.routes.total,
    dicts: state.routes.dicts,
    cityData: state.routes.cityData,
    tableData: state.routes.tableData,
    tableLoading: state.routes.tableLoading,
    editLoading: state.routes.editLoading,
  };
}


export default connect(mapStateToProps)(EditTable);
