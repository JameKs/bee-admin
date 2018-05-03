import React from 'react';
import { Form, Col, Input } from 'antd';
import { LayoutUtils } from 'utils';

/**
 * @description 密码双输组件
 * 根据输入的内容进行密码规则校验.
 * 校验规则1：设置必输时必须输入.
 * 校验规则2：输入的内容必须字母、数字和下划线
 * 校验规则3：输入的内容必须符合最小位数和最大位数范围限定
 * 校验规则4：密码输入框和密码确认输入框输入的密码必须相同
 * @param form: 当前form表单(必传, 类型Form)
 * @param pwdLabel：密码输入节点标签的文本(必传, 类型string)
 * @param pwdField：密码输入节点绑定的数据元素(必传, 类型string)
 * @param pwdInitialValue: 密码输入节点的初始值（必传, 类型object）
 * @param confirmLabel：密码确认节点标签的文本(必传, 类型string)
 * @param confirmField：密码确认节点绑定的数据元素(必传, 类型string)
 * @param confirmInitialValue: 密码确认节点的初始值（必传, 类型object）
 * @param columnLayout: 布局列数(可选， 类型number, 默认值1)
 * @param columnIndex: 摆放的列序号(可选， 类型number, 默认值0)
 * @param colon: 表示是否显示 label 后面的冒号(可选，类型boolean, 默认值true)
 * @param hasFeedback: 展示校验状态图标(可选，类型boolean, 默认值false)
 * @param required: 是否必填，如不设置，则会根据校验规则自动生成(可选, 类型boolean, 默认值false)
 * @param disabled: 是否禁用状态(可选, 类型boolean, 默认值false)
 * @param placeholder：提示信息(可选, 类型string, 默认值根据参数自动生成
 * @param min: 最小字符数(可选, 类型number, 默认值6)
 * @param max: 最大字符数(可选, 类型number, 默认值16)
 * @param width: 宽度(可选， 类型string, 默认值100%, 按照百分比计算)
 * @class DoublePwd
 * @extends {React.PureComponent}
 */
class DoublePwd extends React.PureComponent {
  handlePasswordChange = () => {
    const value = {};
    value[this.props.confirmField] = undefined;
    this.props.form.setFieldsValue(value);
  }

  handleConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue(this.props.pwdField)) {
      callback('两次密码输入不一致！');
    }
    callback();
  }

  createPlaceholder = (origPlaceholder, label, min, max) => {
    let placeholder = '';
    if (origPlaceholder != null) {
      placeholder = origPlaceholder;
    } else if (min === max) {
      placeholder = `请输入${min}位${label}`;
    } else {
      placeholder = `请输入${min}~${max}位${label}`;
    }
    return placeholder;
  }

  createPwdFormItem = (min, max, width, formItemLayout) => {
    const { form, pwdLabel, pwdField, pwdInitialValue, required, disabled, pwdPlaceholder, ...rest } = this.props;
    const { getFieldDecorator } = form;

    const inputDisabled = disabled == null ? false : disabled;
    const placeholder = this.createPlaceholder(pwdPlaceholder, pwdLabel, min, max);

    return (
      <Form.Item label={pwdLabel} {...formItemLayout} {...rest}>
        {
          getFieldDecorator(pwdField, {
            initialValue: typeof pwdInitialValue === 'function' ? pwdInitialValue() : pwdInitialValue,
            validateFirst: true,
            rules: [
              { required, message: `请输入${pwdLabel}` },
              { pattern: /^[A-Za-z0-9_]+$/, message: '密码仅可使用字母和数字字符' },
              { min, message: `${pwdLabel}最小长度为${min}位字符` },
              { max, message: `${pwdLabel}最大长度为${max}位字符` },
            ],
          })(<Input disabled={inputDisabled} style={{ width }} type="password" placeholder={placeholder} onChange={this.handlePasswordChange} />)
        }
      </Form.Item>
    );
  }

  createConfirmPwdFormItem = (min, max, width, formItemLayout) => {
    const { form, confirmLabel, confirmField, confirmInitialValue, required, disabled, confirmPlaceholder, ...rest } = this.props;
    const { getFieldDecorator } = form;

    const inputDisabled = disabled == null ? false : disabled;
    const placeholder = this.createPlaceholder(confirmPlaceholder, confirmLabel, min, max);

    return (
      <Form.Item label={confirmLabel} {...formItemLayout} {...rest}>
        {
          getFieldDecorator(confirmField, {
            initialValue: typeof confirmInitialValue === 'function' ? confirmInitialValue() : confirmInitialValue,
            validateFirst: true,
            rules: [
              { required, message: `请输入${confirmLabel}` },
              { pattern: /^[A-Za-z0-9]+$/, message: '密码仅包含字母和数字字符' },
              { min, message: `${confirmLabel}最小长度为${min}位字符` },
              { max, message: `${confirmLabel}最大长度为${max}位字符` },
              { validator: this.handleConfirmPassword },
            ],
          })(<Input disabled={inputDisabled} style={{ width }} type="password" placeholder={placeholder} />)
        }
      </Form.Item>
    );
  }

  createLayout = () => {
    const columnLayout = this.props.columnLayout == null ? 1 : this.props.columnLayout;
    const columnIndex = this.props.columnIndex == null ? 0 : this.props.columnIndex;
    const min = this.props.min == null ? 6 : this.props.min;
    const max = this.props.max == null ? 16 : this.props.max;
    const width = this.props.width == null ? '100%' : this.props.width;
    const pwdFormItemLayout = LayoutUtils.getFormItemLayout(columnLayout, columnIndex);
    const confirmFormItemLayout = LayoutUtils.getFormItemLayout(columnLayout, columnIndex + 1);

    if (columnLayout === 1) {
      return (
        <div>
          {this.createPwdFormItem(min, max, width, pwdFormItemLayout)}
          {this.createConfirmPwdFormItem(min, max, width, confirmFormItemLayout)}
        </div>
      );
    } else {
      return (
        <div>
          <Col {...pwdFormItemLayout}>
            {this.createPwdFormItem(min, max, width, {})}
          </Col>
          <Col {...confirmFormItemLayout}>
            {this.createConfirmPwdFormItem(min, max, width, {})}
          </Col>
        </div>
      );
    }
  }

  render() {
    return (this.createLayout());
  }
}

export default DoublePwd;
