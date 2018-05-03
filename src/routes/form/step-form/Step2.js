import React, { PureComponent } from 'react';
import { Form, Button, DatePicker, Spin, Cascader } from 'antd';
import { connect } from 'react-redux';
import { Name, Sex } from 'components/basic';
import { SysUtils, LayoutUtils, ParseUtils } from 'utils';
import { FORM_STEP_PAGE2_INIT, FORM_STEP_SETDATA, FORM_STEP_SETSTEP } from 'constants/routes/form';

const C1Layout = LayoutUtils.getFormItemLayout(1);

class Step2 extends PureComponent {
  componentWillMount() {
    this.props.dispatch({ type: FORM_STEP_PAGE2_INIT });
  }

  handlePrevClick = () => {
    const { dispatch } = this.props;
    dispatch({
      type: FORM_STEP_SETSTEP,
      payload: { nextStep: 0 },
    });
  }

  handleNextClick = (e) => {
    e.preventDefault();
    const { form, dispatch, formData } = this.props;
    form.validateFields((err, values) => {
      if (err) return;
      const parseBirthday = ParseUtils.parseMomentObject(values.birthday, 'MM-DD-YYYY');
      dispatch({
        type: FORM_STEP_SETDATA,
        payload: { formData: { ...formData, ...values, parseBirthday }, nextStep: 2 },
      });
    });
  }

  render() {
    const { form, cityData } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        <Form onSubmit={this.handleNextClick}>
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
              })(<DatePicker style={{ width: '100%' }} />)
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
                })(<Cascader showSearch options={cityData} placeholder="请选择所属城市" />)
              }
            </Form.Item>
          </Spin>
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

function mapStateToProps(state) {
  return {
    cityLoading: state.routes.cityLoading,
    cityData: state.routes.cityData,
  };
}

export default connect(mapStateToProps)(Form.create()(Step2));
