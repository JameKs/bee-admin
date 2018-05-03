import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Select, DatePicker, Spin, Cascader, Radio, Button } from 'antd';
import { connect } from 'react-redux';
import { SysUtils, ParseUtils } from 'utils';
import { FORM_BASIC_TWO_INIT, FORM_BASIC_TWO_ADD } from 'constants/routes/form';

const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const C2I0Layout = {
  xl: { span: 10, offset: 0 },
  lg: 12,
  md: 12,
  sm: 24,
};

const C2I1Layout = {
  xl: { span: 10, offset: 2 },
  lg: 12,
  md: 12,
  sm: 24,
};

const C2I1E2Layout = {
  xl: 22,
  lg: 24,
  md: 24,
  sm: 24,
};

const submitFormLayout = {
  xl: 22,
  lg: 24,
};

const submitFormStyle = {
  textAlign: 'right',
  marginTop: 16,
};

class BasicTwoInput extends PureComponent {
  componentWillMount() {
    this.props.dispatch({ type: FORM_BASIC_TWO_INIT });
  }

  handlePasswordChange = () => {
    this.props.form.setFieldsValue({ confirmPassword: undefined });
  }

  handleConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次密码输入不一致！');
    }
    callback();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      const parseBirthday = ParseUtils.parseMomentObject(values.birthday, 'MM-DD-YYYY');
      dispatch({ type: FORM_BASIC_TWO_ADD, payload: { formData: { ...values, parseBirthday } } });
    });
  };

  handleClose = () => {
    SysUtils.push2Home(this.props.dispatch, this.props.history);
  }

  render() {
    const { form, cityData, submitLoading } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Card title="基础表单二" bordered={false}>
        <Spin spinning={SysUtils.getPropsValue(this.props, ['submitLoading'], false)}>
          <Form onSubmit={this.handleSubmit} layout="vertical">
            <Row gutter={16}>
              <Col {...C2I0Layout}>
                <Form.Item hasFeedback label="用户名">
                  {
                    getFieldDecorator('username', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'username']),
                      validateFirst: true,
                      rules: [
                        { required: true, message: '请输入用户名' },
                        { pattern: /^[A-Za-z][A-Za-z0-9_]+$/, message: '用户名仅可使用字母、数字、下划线，需以字母开头' },
                        { min: 6, message: '用户名最小长度为6位字符' },
                        { max: 18, message: '用户名最大长度为18位字符' },
                      ],
                    })(<Input placeholder="请输入6~18位用户名" />)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...C2I0Layout}>
                <Form.Item hasFeedback label="密码">
                  {
                    getFieldDecorator('password', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'password']),
                      validateFirst: true,
                      rules: [
                        { required: true, message: '请输入密码' },
                        { pattern: /^[A-Za-z0-9_]+$/, message: '密码仅可使用字母和数字字符' },
                        { min: 6, message: '密码最小长度为6位字符' },
                        { max: 16, message: '密码最大长度为16位字符' },
                      ],
                    })(<Input type="password" placeholder="请输入6~16位密码" onChange={this.handlePasswordChange} />)
                  }
                </Form.Item>
              </Col>
              <Col {...C2I1Layout}>
                <Form.Item hasFeedback label="确认密码">
                  {
                    getFieldDecorator('confirmPassword', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'confirmPassword']),
                      validateFirst: true,
                      rules: [
                        { required: true, message: '请输入确认密码' },
                        { pattern: /^[A-Za-z0-9_]+$/, message: '确认密码仅可使用字母和数字字符' },
                        { min: 6, message: '密码最小长度为6位字符' },
                        { max: 16, message: '密码最大长度为16位字符' },
                        { validator: this.handleConfirmPassword },
                      ],
                    })(<Input type="password" placeholder="请输入6~16位确认密码" />)
                  }
                </Form.Item>
              </Col>
              <Col {...C2I0Layout}>
                <Form.Item hasFeedback label="手机号码">
                  {
                    getFieldDecorator('phone', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'phone']),
                      validateFirst: true,
                      rules: [
                        { required: true, message: '请输入手机号码' },
                        { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/, message: '请输入合法的手机号码' },
                      ],
                    })(<Input placeholder="请输入手机号码" />)
                  }
                </Form.Item>
              </Col>
              <Col {...C2I1Layout}>
                <Form.Item hasFeedback label="邮箱地址">
                  {
                    getFieldDecorator('email', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'email']),
                      validateFirst: true,
                      rules: [
                        { required: true, message: '请输入邮箱地址' },
                        { type: 'email', message: '请输入合法的邮箱地址' },
                      ],
                    })(<Input placeholder="请输入邮箱地址" />)
                  }
                </Form.Item>
              </Col>
              <Col {...C2I0Layout}>
                <Form.Item hasFeedback label="姓名">
                  {
                    getFieldDecorator('actualName', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'actualName']),
                      validateFirst: true,
                      rules: [
                        { required: true, message: '请输入姓名' },
                        { pattern: /^([a-zA-Z0-9\u4e00-\u9fa5])+$/, message: '姓名仅可使用字母、数字和汉字字符' },
                        { min: 2, message: '姓名最小长度为2位字符' },
                        { max: 10, message: '姓名最大长度为10位字符' },
                      ],
                    })(<Input placeholder="请输入2~10位姓名" />)
                  }
                </Form.Item>
              </Col>
              <Col {...C2I1Layout}>
                <Form.Item label="性别">
                  {
                    getFieldDecorator('sex', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'sex']),
                      validateFirst: true,
                      rules: [{
                        required: true, message: '请选择性别',
                      }],
                    })(
                      <Select
                        showSearch
                        placeholder="请选择性别"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                      </Select>)
                  }
                </Form.Item>
              </Col>
              <Col {...C2I0Layout}>
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
              <Col {...C2I1Layout}>
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
              <Col {...C2I0Layout}>
                <Form.Item hasFeedback label="每月收入">
                  {
                    getFieldDecorator('income', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'income']),
                      validateFirst: true,
                      rules: [
                        { required: true, message: '请输入每月收入' },
                      ],
                    })(<Input prefix="￥" placeholder="请输入每月收入" />)
                  }
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col {...C2I1E2Layout}>
                <Form.Item label="备注">
                  {
                    getFieldDecorator('remark', {
                      initialValue: SysUtils.getPropsValue(this.props, ['formData', 'remark']),
                    })(<TextArea style={{ minHeight: 32 }} placeholder="请输入备注信息" rows={4} />)
                  }
                </Form.Item>
              </Col>
              <Col {...C2I0Layout}>
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
              <Col {...submitFormLayout} style={submitFormStyle}>
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

export default connect(mapStateToProps)(Form.create()(BasicTwoInput));
