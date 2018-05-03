import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, DatePicker, Spin, Cascader, Radio, Button } from 'antd';
import { connect } from 'react-redux';
import { AmtInput, DoublePwd, Email, MobilePhone, Name, Sex, UserId } from 'components/basic';
import { SysUtils, LayoutUtils, ParseUtils } from 'utils';
import { FORM_THREE_COLUMNS_INIT, FORM_THREE_COLUMNS_ADD } from 'constants/routes/form';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

const C3I0Layout = LayoutUtils.getFormItemLayout(3, 0);
const C3I1Layout = LayoutUtils.getFormItemLayout(3, 1);
const C3I2Layout = LayoutUtils.getFormItemLayout(3, 2);
const C3I1E2Layout = LayoutUtils.getFormItemLayout(3, 1, 2);

class ThreeColumnsInput extends PureComponent {
  componentWillMount() {
    this.props.dispatch({ type: FORM_THREE_COLUMNS_INIT });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      const parseBirthday = ParseUtils.parseMomentObject(values.birthday, 'MM-DD-YYYY');
      dispatch({ type: FORM_THREE_COLUMNS_ADD, payload: { formData: { ...values, parseBirthday } } });
    });
  };

  handleClose = () => {
    SysUtils.push2Home(this.props.dispatch, this.props.history);
  }

  render() {
    const { form, cityData, submitLoading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Card title="三列表单" bordered={false}>
        <Spin spinning={SysUtils.getPropsValue(this.props, ['submitLoading'], false)}>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Row gutter={16}>
              <UserId
                columnLayout={3}
                columnIndex={0}
                form={form}
                required
                hasFeedback
                label="用户名"
                field="username"
                initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'username'])}
              />
              <DoublePwd
                columnLayout={3}
                columnIndex={1}
                form={form}
                required
                hasFeedback
                pwdLabel="密码"
                pwdField="password"
                confirmLabel="确认密码"
                confirmField="confirmPassword"
                min={3}
                max={10}
                pwdInitialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'password'])}
                confirmInitialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'confirmPassword'])}
              />
              <MobilePhone
                columnLayout={3}
                columnIndex={0}
                form={form}
                required
                hasFeedback
                label="手机号码"
                field="phone"
                initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'phone'])}
              />
              <Email
                columnLayout={3}
                columnIndex={1}
                form={form}
                required
                hasFeedback
                label="邮箱地址"
                field="email"
                initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'email'])}
              />
              <Name
                columnLayout={3}
                columnIndex={2}
                form={form}
                required
                hasFeedback
                label="姓名"
                field="actualName"
                initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'actualName'])}
              />
              <Sex
                columnLayout={3}
                columnIndex={0}
                form={form}
                required
                label="性别"
                field="sex"
                initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'sex'])}
              />
              <Col {...C3I1Layout}>
                <Form.Item label="出生日期">
                  {
                    getFieldDecorator('birthday', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'birthday']),
                      validateFirst: true,
                      rules: [{
                        required: true, message: '请选择出生日期',
                      }],
                    })(<DatePicker style={{ width: '100%' }} />)
                  }
                </Form.Item>
              </Col>
              <Col {...C3I2Layout}>
                <Spin spinning={SysUtils.getPropsValue(this.props, ['cityLoading'], false)}>
                  <Form.Item label="所属城市">
                    {
                      getFieldDecorator('city', {
                        initialValue: SysUtils.getPropsValue(this.props, ['formData', 'city']),
                        validateFirst: true,
                        rules: [{
                          type: 'array', required: true, message: '请选择所属城市',
                        }],
                      })(<Cascader showSearch options={cityData} placeholder="请选择所属城市" />)
                    }
                  </Form.Item>
                </Spin>
              </Col>
              <AmtInput
                columnLayout={3}
                columnIndex={0}
                form={form}
                required={false}
                hasFeedback
                label="每月收入"
                field="income"
                min={500}
                max={50000}
                decimal={1}
                initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'income'])}
              />
              <Col {...C3I1E2Layout}>
                <Form.Item label="备注">
                  {
                    getFieldDecorator('remark', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'remark']),
                    })(<TextArea style={{ minHeight: 32 }} placeholder="请输入备注信息" rows={4} />)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...C3I0Layout}>
                <Form.Item label="提交结果">
                  {
                    getFieldDecorator('submitTestResult', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'submitTestResult'], 0),
                    })(
                      <RadioGroup>
                        <Radio value={0}>成功</Radio>
                        <Radio value={1}>失败</Radio>
                      </RadioGroup>)
                  }
                </Form.Item>
              </Col>
              <Col {...LayoutUtils.getFormButtonLayout(2)} style={{ textAlign: 'right', marginTop: 32 }}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={submitLoading}>
                    提交
                  </Button>
                  <Button style={{ marginLeft: 16 }} onClick={this.handleClose}>
                    关闭
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    cityData: state.routes.cityData,
    formData: state.routes.formData,
    cityLoading: state.routes.cityLoading,
    submitLoading: state.routes.submitLoading,
  };
}

export default connect(mapStateToProps)(Form.create()(ThreeColumnsInput));
