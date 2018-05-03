import React from 'react';
import { Form, Input, Col, Spin } from 'antd';
import { connect } from 'react-redux';
import { LOAN_VERIFY_MARGINACCT } from 'constants/components/loan';

/**
 * @description 保证金账号组件
 * 通过输入的保证金账号，调用REST接口验证账号状态，如果状态正常，则返回保证金账号名称.
 * 校验规则1：设置必输时必须输入
 * 校验规则2：保证金账号必须为19位
 * 校验规则3：保证金账号必须在后台存在并且状态为0
 * @param form: 当前form表单(必传, 类型Form)
 * @param acctField：保证金账号绑定的数据元素(必传, 类型string)
 * @param acctNameField：保证金账号名称绑定的数据元素(必传, 类型string)
 * @param initAcct: 保证金账号的初始值（必传, 类型object）
 * @param initAcctName: 保证金账号名称的初始值（必传, 类型object）
 * @param columnLayout: 布局列数(可选， 类型number, 默认值1)
 * @param columnIndex: 摆放的列序号(可选， 类型number, 默认值0)
 * @param colon: 表示是否显示 label 后面的冒号(可选，类型boolean, 默认值true)
 * @param hasFeedback: 展示校验状态图标(可选，类型boolean, 默认值false)
 * @param required: 是否必填(可选, 类型boolean, 默认值false)
 * @param disabled: 是否禁用状态(可选, 类型boolean, 默认值false)
 * @param placeholder：提示信息(可选, 类型string, 默认值根据参数自动生成)
 * @param width: 宽度(可选， 类型string, 默认值100%, 按照百分比计算)
 * @class MarginAcct
 * @extends {React.PureComponent}
 */
class MarginAcct extends React.PureComponent {
  state = {
    loading: false,
    help: '',
    validateStatus: '',
  }

  componentWillMount() {
    const { initAcct } = this.props;
    const initialValue = typeof initAcct === 'function' ? initAcct() : initAcct;
    if (initialValue !== '') {
      this.setState({ validateStatus: 'success' });
    }
  }

  validateAcct = (rule, value, callback) => {
    if (value == null || value === '') {
      const help = '请输入第三方保证金账号';
      this.setState({ help, validateStatus: 'error' });
      callback(help);
      return;
    }

    if (value.length > 19) {
      const help = '第三方保证金账号最大长度为19位';
      this.setState({ help, validateStatus: 'error' });
      callback(help);
      return;
    }

    this.setState({ help: '', validateStatus: 'success' });
    callback();
  }

  createAcctFormItem = () => {
    const { form, acctField, initAcct, required, ...rest } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form.Item required label="第三方保证金账号" validateStatus={this.state.validateStatus} help={this.state.help} {...rest}>
        {
          getFieldDecorator(acctField, {
            initialValue: typeof initAcct === 'function' ? initAcct() : initAcct,
            rules: [
              { validator: this.validateAcct },
            ],
          })(<Input placeholder="请输入第三方保证金账号" onBlur={this.handleBlur} />)
        }
      </Form.Item>
    );
  }

  createAcctNameFormItem = () => {
    const { form, acctNameField, initAcctName, required, ...rest } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form.Item label="第三方保证金账号名称" {...rest} >
        {
          getFieldDecorator(acctNameField, {
            initialValue: typeof initAcctName === 'function' ? initAcctName() : initAcctName,
            rules: [
              { required, message: '第三方保证金账号名称不能为空' },
            ],
          })(<Input disabled />)
        }
      </Form.Item>
    );
  }

  handleResult = (acct) => {
    this.setState({ loading: false });
    if (acct == null) {
      this.setState({ help: '获取保证金账户信息失败', validateStatus: 'error' });
      return;
    }
    if (acct.count === 0) {
      this.setState({ help: '保证金账户校验失败', validateStatus: 'error' });
    } else {
      const value = {};
      value[this.props.acctNameField] = acct.custNm;
      this.props.form.setFieldsValue(value);
    }
  }

  handleBlur = (event) => {
    const { form, acctField, acctNameField } = this.props;
    // 清空保证金账号名称
    const value = {};
    value[acctNameField] = '';
    this.props.form.setFieldsValue(value);

    // 获取保证金账号名称信息
    form.validateFields(new Array(acctField), (err) => {
      if (err) return;
      this.setState({ loading: true });
      this.props.dispatch({ type: LOAN_VERIFY_MARGINACCT, payload: { acct: event.target.value, handleResult: this.handleResult } });
    });
  }

  createLayout = () => {
    const { columnLayout, columnIndex } = this.props;
    const idx = columnIndex == null ? 0 : columnIndex;
    if (columnLayout === 1) {
      return (
        <Spin spinning={this.state.loading}>
          {this.createAcctFormItem()}
          {this.createAcctNameFormItem()}
        </Spin>
      );
    } else if (columnLayout === 2) {
      return (
        <div>
          <Col xl={{ span: 11, offset: idx % 3 === 0 ? 0 : 2 }} lg={12} md={12} sm={24}>
            <Spin spinning={this.state.loading}>
              {this.createAcctFormItem()}
            </Spin>
          </Col>
          <Col xl={{ span: 11, offset: (idx + 1) % 3 === 0 ? 0 : 2 }} lg={12} md={12} sm={24}>
            <Spin spinning={this.state.loading}>
              {this.createAcctNameFormItem()}
            </Spin>
          </Col>
        </div>
      );
    } else if (columnLayout === 3) {
      return (
        <div>
          <Col xl={{ span: 6, offset: idx % 3 === 0 ? 0 : 2 }} lg={8} md={8} sm={24}>
            <Spin spinning={this.state.loading}>
              {this.createAcctFormItem()}
            </Spin>
          </Col>
          <Col xl={{ span: 6, offset: (idx + 1) % 3 === 0 ? 0 : 2 }} lg={8} md={8} sm={24}>
            <Spin spinning={this.state.loading}>
              {this.createAcctNameFormItem()}
            </Spin>
          </Col>
        </div>
      );
    }
  }

  render() {
    return (this.createLayout());
  }
}

export default connect()(MarginAcct);

