import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Form, Row, Col, Button, Divider, Spin, Table } from 'antd';
import { UserId, DescriptionList } from 'components/basic';
import { SysUtils, LayoutUtils, ParseUtils } from 'utils';
import { PROFILE_BASIC_GET, PROFILE_BASIC_RESET } from 'constants/routes/profile';
import utilStyles from 'styles/utils.less';

const { Description } = DescriptionList;

const C3Layout = LayoutUtils.getFormItemLayoutWithoutOffset(3);

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

class BasicProfile extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      dispatch({ type: PROFILE_BASIC_RESET });
      dispatch({ type: PROFILE_BASIC_GET, payload: { formData: { ...values } } });
    });
  }

  handleReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({ type: PROFILE_BASIC_RESET });
  }

  renderForm() {
    const { form, loading } = this.props;

    return (
      <Spin spinning={SysUtils.getPropsValue(this.props, ['loading'], false)}>
        <Form onSubmit={this.handleSubmit} layout="inline">
          <Row gutter={16}>
            <UserId
              columnLayout={3}
              columnIndex={0}
              form={form}
              required
              label="用户名"
              field="username"
              placeholder="aaa111 | bbb222"
            />
            <Col {...C3Layout}>
              <span>
                <Button type="primary" htmlType="submit" loading={loading} >查询</Button>
                <Button style={{ marginLeft: 16 }} onClick={this.handleReset}>重置</Button>
              </span>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }

  renderProfile() {
    const { profileData } = this.props;

    if (profileData == null) {
      return null;
    } else {
      const title = `${profileData.username}信息`;
      return (
        <Card title={title} bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
            <Description term="用户名">{profileData.username}</Description>
            <Description term="手机号码">{profileData.phone}</Description>
            <Description term="邮箱地址">{profileData.email}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="详细信息" style={{ marginBottom: 32 }}>
            <Description term="姓名">{profileData.actualName}</Description>
            <Description term="性别">{ParseUtils.parseSexValue(profileData.sex)}</Description>
            <Description term="出生日期">{ParseUtils.parseDateTimeString(profileData.parseBirthday, 'MM-DD-YYYY', 'YYYY年MM月DD日')}</Description>
            <Description term="所属城市">{profileData.city}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={utilStyles.descriptionListTitle}>家庭成员</div>
          <Table pagination={false} columns={familyColumns} rowKey="id" dataSource={profileData.family} style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="其他信息" style={{ marginBottom: 32 }}>
            <Description term="每月收入">{ParseUtils.parseAmtUppercase(profileData.income)}</Description>
            <Description term="备注">{profileData.remark}</Description>
          </DescriptionList>
        </Card>
      );
    }
  }

  render() {
    return (
      <div>
        <Card title="基础详情页" bordered={false} style={{ marginBottom: 24 }}>
          <div className={utilStyles.inlineForm}>
            {this.renderForm()}
          </div>
        </Card>
        {this.renderProfile()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cityData: state.routes.cityData,
    profileData: state.routes.profileData,
    loading: state.routes.loading,
  };
}


export default connect(mapStateToProps)(Form.create()(BasicProfile));
