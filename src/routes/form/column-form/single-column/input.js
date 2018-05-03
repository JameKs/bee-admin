import React, { PureComponent } from 'react';
import { Card, Form, Input, DatePicker, Spin, Cascader, Radio, Button } from 'antd';
import { connect } from 'react-redux';
import { AmtInput, DoublePwd, Email, MobilePhone, Name, Sex, UserId } from 'components/basic';
import { SysUtils, LayoutUtils, ParseUtils } from 'utils';
import { FORM_SINGLE_COLUMN_INIT, FORM_SINGLE_COLUMN_ADD } from 'constants/routes/form';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

const C1Layout = LayoutUtils.getFormItemLayout(1);

class SingleColumnInput extends PureComponent {
  componentWillMount() {
    this.props.dispatch({ type: FORM_SINGLE_COLUMN_INIT });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      const parseBirthday = ParseUtils.parseMomentObject(values.birthday, 'MM-DD-YYYY');
      dispatch({ type: FORM_SINGLE_COLUMN_ADD, payload: { formData: { ...values, parseBirthday } } });
    });
  };

  handleClose = () => {
    SysUtils.push2Home(this.props.dispatch, this.props.history);
  }

  render() {
    const { form, cityData, submitLoading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Card title="单列表单" bordered={false}>
        <Spin spinning={SysUtils.getPropsValue(this.props, ['submitLoading'], false)}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <UserId
              form={form}
              required
              hasFeedback
              label="用户名"
              field="username"
              initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'username'])}
            />
            <DoublePwd
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
              form={form}
              required
              hasFeedback
              label="手机号码"
              field="phone"
              initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'phone'])}
            />
            <Email
              form={form}
              required
              hasFeedback
              label="邮箱地址"
              field="email"
              initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'email'])}
            />
            <Name
              form={form}
              required
              hasFeedback
              label="姓名"
              field="actualName"
              initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'actualName'])}
            />
            <Sex
              form={form}
              required
              label="性别"
              field="sex"
              width="60%"
              initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'sex'])}
            />
            <Form.Item {...C1Layout} label="出生日期">
              {
                getFieldDecorator('birthday', {
                  initialValue: SysUtils.getPropsValue(this.props, ['formData', 'birthday']),
                  validateFirst: true,
                  rules: [{
                    required: true, message: '请选择出生日期',
                  }],
                })(<DatePicker style={{ width: '60%' }} />)
              }
            </Form.Item>
            <Spin spinning={SysUtils.getPropsValue(this.props, ['cityLoading'], false)}>
              <Form.Item {...C1Layout} label="所属城市">
                {
                  getFieldDecorator('city', {
                    initialValue: SysUtils.getPropsValue(this.props, ['formData', 'city']),
                    validateFirst: true,
                    rules: [{
                      type: 'array', required: true, message: '请选择所属城市',
                    }],
                  })(<Cascader showSearch style={{ width: '60%' }} options={cityData} placeholder="请选择所属城市" />)
                }
              </Form.Item>
            </Spin>
            <AmtInput
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
            <Form.Item
              {...C1Layout}
              label="备注"
            >
              {
                getFieldDecorator('remark', {
                  initialValue: SysUtils.getPropsValue(this.props, ['formData', 'remark']),
                })(<TextArea style={{ minHeight: 32 }} placeholder="请输入备注信息" rows={4} />)
              }
            </Form.Item>
            <Form.Item
              {...C1Layout}
              label="提交结果"
            >
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
            <Form.Item {...LayoutUtils.getFormButtonLayout(1)} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitLoading}>
                提交
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={this.handleClose}>
                关闭
              </Button>
            </Form.Item>
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

export default connect(mapStateToProps)(Form.create()(SingleColumnInput));
