import React, { PureComponent } from 'react';
import { Modal, Button, Table } from 'antd';

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

class SyncModal extends PureComponent {
  render() {
    const { visible, record, onClose } = this.props;
    return (
      <Modal
        title="同步查看信息"
        closable={false}
        visible={visible}
        width={1200}
        footer={[
          <Button key="close" type="primary" onClick={onClose}>
            关闭
          </Button>,
        ]}
      >
        <Table
          pagination={false}
          columns={familyColumns}
          rowKey="id"
          dataSource={record.family}
          style={{ marginBottom: 24 }}
        />
      </Modal>
    );
  }
}

export default SyncModal;
