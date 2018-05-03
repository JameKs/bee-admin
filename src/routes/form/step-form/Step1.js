import React, { PureComponent } from 'react';
import { Form, Button } from 'antd';
import { connect } from 'react-redux';
import { DoublePwd, Email, MobilePhone, UserId } from 'components/basic';
import { SysUtils, LayoutUtils } from 'utils';
import { FORM_STEP_SETDATA } from 'constants/routes/form';

class Step1 extends PureComponent {
  handleNextClick = (e) => {
    e.preventDefault();
    const { form, dispatch, formData } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      dispatch({
        type: FORM_STEP_SETDATA,
        payload: { formData: { ...formData, ...values }, nextStep: 1 },
      });
    });
  };

  render() {
    const { form } = this.props;

    return (
      <Form onSubmit={this.handleNextClick}>
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
        <Form.Item {...LayoutUtils.getFormButtonLayout(1)} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            下一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect()(Form.create()(Step1));
