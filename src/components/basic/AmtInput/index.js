import React from 'react';
import { Form, Input, Col } from 'antd';
import { SysUtils, LayoutUtils } from 'utils';

/**
 * @description 金额输入组件
 * 根据输入的内容进行规则校验,如果校验成功,则显示输入内容的大写信息,否则显示错误.
 * 校验规则1：设置必输时必须输入.
 * 校验规则2：输入的内容必须为数字,小数位数默认为2位,可以通过参数指定小数位数
 * @param form: 当前form表单(必传, 类型Form)
 * @param label：标签的文本(必传, 类型string)
 * @param field：绑定的数据元素(必传, 类型string)
 * @param initialValue: 节点的初始值（必传, 类型object）
 * @param columnLayout: 布局列数(可选， 类型number, 默认值1)
 * @param columnIndex: 摆放的列序号(可选， 类型number, 默认值0)
 * @param colon: 表示是否显示 label 后面的冒号(可选，类型boolean, 默认值true)
 * @param hasFeedback: 展示校验状态图标(可选，类型boolean, 默认值false)
 * @param required: 是否必填(可选, 类型boolean, 默认值false)
 * @param disabled: 是否禁用状态(可选, 类型boolean, 默认值false)
 * @param placeholder：提示信息(可选, 类型string, 默认值根据参数自动生成)
 * @param decimal: 小数位数(可选, 类型number, 默认值2)
 * @param max: 最大金额(可选, 类型number, 默认值100000000000)
 * @param min: 最小金额(可选, 类型number, 默认值0)
 * @param width: 宽度(可选， 类型string, 默认值100%, 按照百分比计算)
 * @class AmtInput
 * @extends {React.PureComponent}
 */
class AmtInput extends React.PureComponent {
  state = {
    help: '',
    validateStatus: '',
  }

  componentWillMount() {
    const { initialValue } = this.props;
    const value = typeof initialValue === 'function' ? initialValue() : initialValue;
    // 设置金额大写
    if (!isNaN(parseInt(value, 10))) {
      const upper = SysUtils.digitUppercase(value);
      this.setState({ help: upper, validateStatus: 'success' });
    }
  }

  validateAmt = (rule, value, callback) => {
    const label = this.props.label;
    const decimal = this.props.decimal == null ? 2 : this.props.decimal;
    const max = this.props.max == null ? 100000000000 : this.props.max;
    const min = this.props.min == null ? 0 : this.props.min;

    // 小数上限位数校验
    if (decimal > 2) {
      const help = '小数位数配置错误';
      this.setState({ help, validateStatus: 'error' });
      callback(help);
      return;
    }

    // 必输规则校验
    if (value == null || value === '') {
      if (this.props.required) {
        const help = `请输入${label}`;
        this.setState({ help, validateStatus: 'error' });
        callback(help);
        return;
      } else {
        this.setState({ help: '', validateStatus: '' });
        callback();
        return;
      }
    }

    // 数字合法性规则校验
    let re = '';
    if (decimal === 0) {
      re = new RegExp('(^([1-9](\\d+)?)|^(0))$');
    } else {
      re = new RegExp(`(^([1-9](\\d+)?)|^(0))((?:\\.\\d{1,${decimal}})?)$`);
    }
    if (!re.test(value)) {
      const help = `请输入合法的${label}`;
      this.setState({ help, validateStatus: 'error' });
      callback(help);
      return;
    }

    // 金额上限校验
    if (parseInt(value, 10) > max) {
      const upper = SysUtils.digitUppercase(max);
      const help = `${label}不能超过${upper}`;
      this.setState({ help, validateStatus: 'error' });
      callback(help);
      return;
    }

    // 金额下限校验
    if (parseInt(value, 10) < min) {
      const upper = SysUtils.digitUppercase(min);
      const help = `${label}不能低于${upper}`;
      this.setState({ help, validateStatus: 'error' });
      callback(help);
      return;
    }

    // 设置金额大写
    const upper = SysUtils.digitUppercase(value);
    this.setState({ help: upper, validateStatus: 'success' });
    callback();
  }

  createPlaceholder = () => {
    const label = this.props.label;
    const decimal = this.props.decimal == null ? 2 : this.props.decimal;

    let placeholder = '';
    if (this.props.placeholder != null) {
      placeholder = this.props.placeholder;
    } else if (decimal === 0) {
      placeholder = `请输入${label}，不包含小数`;
    } else if (decimal === 1) {
      placeholder = `请输入${label}，最多包含一位小数`;
    } else {
      placeholder = `请输入${label}`;
    }
    return placeholder;
  }

  createFormItem = (formItemLayout) => {
    const { form, field, required, initialValue, width, disabled, ...rest } = this.props;
    const { getFieldDecorator } = form;

    const itemRequired = required == null ? true : required;
    const styleWidth = width == null ? '100%' : width;
    const inputDisabled = disabled == null ? false : disabled;

    const placeholder = this.createPlaceholder();

    return (
      <Form.Item {...formItemLayout} required={itemRequired} validateStatus={this.state.validateStatus} help={this.state.help} {...rest} >
        {
          getFieldDecorator(field, {
            initialValue: typeof initialValue === 'function' ? initialValue() : initialValue,
            rules: [
              { validator: this.validateAmt },
            ],
          })(<Input disabled={inputDisabled} style={{ width: styleWidth }} prefix="￥" placeholder={placeholder} onChange={this.handleChange} />)
        }
      </Form.Item>
    );
  }

  createLayout = () => {
    const columnLayout = this.props.columnLayout == null ? 1 : this.props.columnLayout;
    const columnIndex = this.props.columnIndex == null ? 0 : this.props.columnIndex;
    const formItemLayout = LayoutUtils.getFormItemLayout(columnLayout, columnIndex);
    if (columnLayout === 1) {
      return (
        <div>
          {this.createFormItem(formItemLayout)}
        </div>
      );
    } else {
      return (
        <div>
          <Col {...formItemLayout}>
            {this.createFormItem({})}
          </Col>
        </div>
      );
    }
  }

  render() {
    return (this.createLayout());
  }
}

export default AmtInput;
