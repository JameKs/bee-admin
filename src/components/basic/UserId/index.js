import React from 'react';
import { Form, Input, Col } from 'antd';
import { LayoutUtils } from 'utils';

/**
 * @description 用户ID输入组件
 * 根据输入的内容进行用户ID规则校验.
 * 校验规则1：设置必输时必须输入.
 * 校验规则2：输入的内容必须字母、数字和下划线，需以字母开头
 * 校验规则3：输入的内容必须符合最小位数和最大位数范围限定
 * @param form: 当前form表单(必传, 类型Form)
 * @param label：标签的文本(必传, 类型string)
 * @param field：绑定的数据元素(必传, 类型string)
 * @param initialValue: 节点的初始值（必传, 类型object）
 * @param columnLayout: 布局列数(可选， 类型number, 默认值1)
 * @param columnIndex: 摆放的列序号(可选， 类型number, 默认值0)
 * @param colon: 表示是否显示 label 后面的冒号(可选，类型boolean, 默认值true)
 * @param hasFeedback: 展示校验状态图标(可选，类型boolean, 默认值false)
 * @param required: 是否必填，如不设置，则会根据校验规则自动生成(可选, 类型boolean, 默认值false)
 * @param disabled: 是否禁用状态(可选, 类型boolean, 默认值false)
 * @param placeholder：提示信息(可选, 类型string, 默认值根据参数自动生成)
 * @param min: 最小字符数(可选, 类型number, 默认值6)
 * @param max: 最大字符数(可选, 类型number, 默认值18)
 * @param width: 宽度(可选， 类型string, 默认值100%, 按照百分比计算)
 * @class UserId
 * @extends {React.PureComponent}
 */
class UserId extends React.PureComponent {
  createPlaceholder = (label, min, max) => {
    let placeholder = '';
    if (this.props.placeholder != null) {
      placeholder = this.props.placeholder;
    } else if (min === max) {
      placeholder = `请输入${min}位${label}`;
    } else {
      placeholder = `请输入${min}~${max}位${label}`;
    }
    return placeholder;
  }

  createFormItem = (formItemLayout) => {
    const { form, field, initialValue, required, disabled, width, ...rest } = this.props;
    const { getFieldDecorator } = form;

    const label = this.props.label;
    const min = this.props.min == null ? 6 : this.props.min;
    const max = this.props.max == null ? 18 : this.props.max;
    const inputWidth = width == null ? '100%' : width;
    const inputDisabled = disabled == null ? false : disabled;

    const placeholder = this.createPlaceholder(label, min, max);

    return (
      <Form.Item {...formItemLayout} {...rest}>
        {
          getFieldDecorator(field, {
            initialValue: typeof initialValue === 'function' ? initialValue() : initialValue,
            validateFirst: true,
            rules: [
              { required, message: `请输入${label}` },
              { pattern: /^[A-Za-z][A-Za-z0-9_]+$/, message: `${label}仅可使用字母、数字、下划线，需以字母开头` },
              { min, message: `${label}最小长度为${min}位字符` },
              { max, message: `${label}最大长度为${max}位字符` },
            ],
          })(<Input disabled={inputDisabled} style={{ width: inputWidth }} placeholder={placeholder} />)
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

export default UserId;
