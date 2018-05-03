import React, { PureComponent } from 'react';
import { Modal, Button, Table } from 'antd';
import { connect } from 'react-redux';
import { SysUtils } from 'utils';
import { LIST_STANDARD_MODALCLOSE } from 'constants/routes/list';

const familyColumns = [{
  title: '编号',
  dataIndex: 'id',
  key: 'id',
}, {
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  render: age => `${age}岁`,
}, {
  title: '关系',
  dataIndex: 'relationship',
  key: 'relationship',
}, {
  title: '工作单位',
  dataIndex: 'employer',
  key: 'employer',
  align: 'left',
}, {
  title: '职业',
  dataIndex: 'job',
  key: 'job',
},
{
  title: '身份证号码',
  dataIndex: 'idNumber',
  key: 'idNumber',
}];

class AsyncModal extends PureComponent {
  onClose = () => {
    const { dispatch } = this.props;
    dispatch({ type: LIST_STANDARD_MODALCLOSE });
  }

  render() {
    const { visible } = this.props;
    return (
      <Modal
        title="异步查看信息"
        closable={false}
        visible={!!visible}
        width={1200}
        footer={[
          <Button key="close" type="primary" onClick={this.onClose}>
            关闭
          </Button>,
        ]}
      >
        <Table
          pagination={false}
          columns={familyColumns}
          rowKey="id"
          dataSource={SysUtils.getPropsValue(this.props, ['record', 'family'], [])}
          style={{ marginBottom: 24 }}
        />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    visible: state.routes.asyncVisible,
    record: state.routes.asyncRecord,
  };
}

export default connect(mapStateToProps)(AsyncModal);
