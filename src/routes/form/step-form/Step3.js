import React, { PureComponent } from 'react';
import { Form, Button, Input, Radio } from 'antd';
import { connect } from 'react-redux';
import { AmtInput } from 'components/basic';
import { SysUtils, LayoutUtils } from 'utils';
import { FORM_STEP_SETDATA, FORM_STEP_SETSTEP } from 'constants/routes/form';

const { TextArea } = Input;
const RadioGroup = Radio.Group;

const C1Layout = LayoutUtils.getFormItemLayout(1);

class Step3 extends PureComponent {
  handlePrevClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: FORM_STEP_SETSTEP,
      payload: { nextStep: 1 } });
  }

  handleNextClick = (e) => {
    e.preventDefault();
    const { form, dispatch, formData } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      dispatch({
        type: FORM_STEP_SETDATA,
        payload: { formData: { ...formData, ...values }, nextStep: 3 },
      });
    });
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Form onSubmit={this.handleNextClick}>
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
            <Button type="primary" htmlType="submit">
              下一步
            </Button>
            <Button style={{ marginLeft: 16 }} onClick={this.handlePrevClick}>
              上一步
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default connect()(Form.create()(Step3));
