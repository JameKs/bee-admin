import React, { PureComponent } from 'react';
import { Row, Col, Card } from 'antd';
import { NumberCard } from 'components/basic';
import { CreditCardApplication, TypeDistribution, IndustrialDistribution, OfficialNews } from './components';

const numbers = [
  {
    icon: 'desktop',
    color: '#64ea91',
    title: '申请总数',
    number: 3580,
  },
  {
    icon: 'team',
    color: '#8fc9fb',
    title: '用户申请',
    number: 1200,
  },
  {
    icon: 'message',
    color: '#d897eb',
    title: '公告申请',
    number: 580,
  },
  {
    icon: 'credit-card',
    color: '#f69899',
    title: '信用卡申请',
    number: 1800,
  },
];

const typeDistribution = {
  legend: {
    data: ['用户申请', '公告申请', '信用卡申请'],
  },
  xAxis: [
    {
      data: ['201707', '201708', '201709', '201710', '201711', '201712', '201801'],
    },
  ],
  series: [
    {
      name: '用户申请',
      data: [120, 132, 101, 134, 190, 130, 145],
    },
    {
      name: '公告申请',
      data: [30, 35, 22, 30, 41, 48, 36],
    },
    {
      name: '信用卡申请',
      data: [220, 282, 380, 234, 290, 230, 280],
    },
  ],
};

const industrialDistribution = {
  legend: {
    data: ['金融业', '建筑业', '制造业', '采矿业'],
  },
  series: {
    data: [
      { value: 30, name: '金融业' },
      { value: 45, name: '建筑业' },
      { value: 35, name: '制造业' },
      { value: 15, name: '采矿业' },
    ],
  },
};

const officialNews = [
  {
    number: '2018001',
    name: '社区营销公告',
    type: '0',
    scheduleDeliveryTime: '2018-01-01 12:00:00',
    actualDeliveryTime: '2018-01-01 12:00:00',
  },
  {
    number: '2018002',
    name: '信用卡营销公告',
    type: '1',
    scheduleDeliveryTime: '2018-01-02 09:00:00',
    actualDeliveryTime: '2018-01-02 09:00:00',
  },
  {
    number: '2018003',
    name: '拓展训练公告',
    type: '0',
    scheduleDeliveryTime: '2018-01-03 11:00:00',
    actualDeliveryTime: '2018-01-04 13:00:00',
  },
  {
    number: '2018004',
    name: '消防演练公告',
    type: '1',
    scheduleDeliveryTime: '2018-01-04 10:00:00',
    actualDeliveryTime: '2018-01-04 10:00:00',
  },
  {
    number: '2018005',
    name: '培训公告',
    type: '0',
    scheduleDeliveryTime: '2018-01-05 15:00:00',
    actualDeliveryTime: '2018-01-05 15:00:00',
  },
];

const creditCardApplication = [
  {
    id: 1,
    name: '申请编号：201801080001',
    content: '申请卡种：信用卡-白金卡 申请额度：100,000.00',
    status: '1',
    applytime: '2018-01-01 08:24:12',
  },
  {
    id: 2,
    name: '申请编号：201801080005',
    content: '申请卡种：信用卡-白金卡 申请额度：100,000.00',
    status: '0',
    applytime: '2018-01-02 10:24:12',
  },
  {
    id: 3,
    name: '申请编号：201801080006',
    content: '申请卡种：信用卡-钻石卡 申请额度：200,000.00',
    status: '2',
    applytime: '2018-01-03 18:24:12',
  },
];

class Dashboard extends PureComponent {
  render() {
    const numberCards = numbers.map(item =>
      (
        <Col key={item.title} xl={6} lg={12} md={24} sm={24} xs={24}>
          <NumberCard {...item} />
        </Col>
      ));
    return (
      <div>
        <Row gutter={24}>
          {numberCards}

          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              <TypeDistribution data={typeDistribution} />
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              <IndustrialDistribution data={industrialDistribution} />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 24, minHeight: 480 }}>
              <OfficialNews data={officialNews} />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 24, minHeight: 480 }}>
              <CreditCardApplication data={creditCardApplication} />
            </Card>
          </Col>

        </Row>
      </div>
    );
  }
}

export default Dashboard;
