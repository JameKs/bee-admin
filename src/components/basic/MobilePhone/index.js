import React from 'react';
import { Form, Input, Col } from 'antd';
import { LayoutUtils } from 'utils';

/**
 * @description 移动手机输入组件
 * 根据输入的内容进行移动手机规则校验.
 * 校验规则1：设置必输时必须输入.
 * 校验规则2：输入的号码可以使用13、15、18开头，后面9位（0-9）数字
             输入的号码可以使用14开头，后面1位（5或者7）数字，后面8位（0-9）数字
             输入的号码可以使用17开头，后面1位（0、6、7或者8）数字，后面8位（0-9）数字
             输入的号码可以使用197开头，后面8位（0-9）数字
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
 * @param width: 宽度(可选， 类型string, 默认值100%, 按照百分比计算)
 * @class MobilePhone
 * @extends {React.PureComponent}
 */
class MobilePhone extends React.PureComponent {
  createFormItem = (formItemLayout) => {
    const { form, field, initialValue, required, disabled, width, placeholder, ...rest } = this.props;
    const { getFieldDecorator } = form;

    const label = this.props.label;
    const inputWidth = width == null ? '100%' : width;
    const inputDisabled = disabled == null ? false : disabled;

    return (
      <Form.Item {...formItemLayout} {...rest}>
        {
          getFieldDecorator(field, {
            initialValue: typeof initialValue === 'function' ? initialValue() : initialValue,
            validateFirst: true,
            rules: [
              { required, message: `请输入${label}` },
              { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/, message: `请输入合法的${label}` },
            ],
          })(<Input disabled={inputDisabled} style={{ width: inputWidth }} placeholder={placeholder == null ? `请输入${label}` : placeholder} />)
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

export default MobilePhone;
