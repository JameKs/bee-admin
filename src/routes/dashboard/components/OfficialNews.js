import React from 'react';
import { Table, Tag } from 'antd';
import { Theme } from 'utils';
import styles from './styles/OfficialNews.less';

const status = {
  0: {
    color: Theme.color.blue,
    text: '正常',
  },
  1: {
    color: Theme.color.shallowRed,
    text: '紧急',
  },
};

function OfficialNews({ data }) {
  const columns = [{
    title: '公告编号',
    dataIndex: 'number',
    key: 'number',
  }, {
    title: '公告名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: text => <Tag color={status[text].color}>{status[text].text}</Tag>,
  }, {
    title: '计划投放时间',
    dataIndex: 'scheduleDeliveryTime',
    key: 'scheduleDeliveryTime',
  }, {
    title: '实际投放时间',
    dataIndex: 'actualDeliveryTime',
    key: 'actualDeliveryTime',
  }];
  return (
    <div className={styles.recentplans}>
      <Table pagination={false} columns={columns} rowKey={(record, key) => key} dataSource={data.filter((item, key) => key < 5)} />
    </div>
  );
}

export default OfficialNews;
