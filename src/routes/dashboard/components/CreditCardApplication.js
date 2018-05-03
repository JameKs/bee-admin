import React, { PureComponent } from 'react';
import { Table, Tag, Avatar } from 'antd';
import { Theme } from 'utils';
import styles from './styles/CreditCardApplication.less';

const status = {
  0: {
    color: Theme.color.blue,
    text: '审批中',
  },
  1: {
    color: Theme.color.green,
    text: '审批通过',
  },
  2: {
    color: Theme.color.shallowRed,
    text: '审批拒绝',
  },
};

const AvatarColor = {
  0: {
    color: Theme.color.green,
  },
  1: {
    color: Theme.color.blue,
  },
  2: {
    color: Theme.color.shallowRed,
  },
};


class CreditCardApplication extends PureComponent {
  render() {
    const { data } = this.props;
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        width: 48,
        className: 'avatarcolumn',
        render: id => <Avatar style={{ backgroundColor: AvatarColor[id % 3].color }} size="large">{id}</Avatar>,
      }, {
        title: 'projectname',
        dataIndex: 'projectname',
        render: (text, it) => (
          <div>
            <h5 className={styles.name}>{it.name}</h5>
            <p className={styles.content}>{it.content}</p>
            <div className={styles.daterow}>
              <Tag color={status[it.status].color}>{status[it.status].text}</Tag>
              <span className={styles.date}>{it.applytime}</span>
            </div>
          </div>),
      },
    ];
    return (
      <div className={styles.recentapplys}>
        <Table
          pagination={false}
          showHeader={false}
          columns={columns}
          rowKey={(record, key) => key}
          dataSource={data.filter((item, key) => key < 3)}
        />
      </div>
    );
  }
}

export default CreditCardApplication;
