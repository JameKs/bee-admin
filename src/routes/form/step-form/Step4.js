import React, { PureComponent } from 'react';
import { Form, Button, Spin } from 'antd';
import { DescriptionList } from 'components/basic';
import { connect } from 'react-redux';
import { SysUtils, LayoutUtils, ParseUtils } from 'utils';
import { FORM_STEP_SETSTEP, FORM_STEP_ADD } from 'constants/routes/form';

const { Description } = DescriptionList;

class Step4 extends PureComponent {
  handlePrevClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: FORM_STEP_SETSTEP,
      payload: { nextStep: 2 },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, formData } = this.props;
    dispatch({
      type: FORM_STEP_ADD,
      payload: { formData, nextStep: 4 },
    });
  }

  render() {
    const { formData, cityData, submitLoading } = this.props;
    return (
      <Spin spinning={SysUtils.getPropsValue(this.props, ['submitLoading'], false)}>
        <Form onSubmit={this.handleSubmit}>
          <DescriptionList size="large" title="XXX信息">
            <Description term="用户名">{formData.username}</Description>
            <Description term="手机号码">{formData.phone}</Description>
            <Description term="邮箱地址">{formData.email}</Description>
            <Description term="姓名">{formData.actualName}</Description>
            <Description term="性别">{ParseUtils.parseSexValue(formData.sex)}</Description>
            <Description term="出生日期">{ParseUtils.parseMomentObject(formData.birthday, 'YYYY年MM月DD日')}</Description>
            <Description term="所属城市">{ParseUtils.parseCascaderValues(cityData, formData.city)}</Description>
            <Description term="每月收入">{ParseUtils.parseAmtUppercase(formData.income)}</Description>
            <Description term="备注">{formData.remark}</Description>
          </DescriptionList>
          <Form.Item {...LayoutUtils.getDescButtonLayout(3)} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitLoading}>
              提交
            </Button>
            <Button style={{ marginLeft: 16 }} onClick={this.handlePrevClick}>
              上一步
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.routes.count,
    cityData: state.routes.cityData,
    submitLoading: state.routes.submitLoading,
  };
}

export default connect(mapStateToProps)(Form.create()(Step4));
