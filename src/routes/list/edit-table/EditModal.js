import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Row, Col, DatePicker, Cascader, Radio, Button } from 'antd';
import { AmtInput, Email, MobilePhone, Name, Sex, UserId } from 'components/basic';
import { SysUtils, LayoutUtils } from 'utils';

const { TextArea } = Input;
const RadioGroup = Radio.Group;


const C2I0Layout = LayoutUtils.getFormItemLayout(2, 0);
const C2I1Layout = LayoutUtils.getFormItemLayout(2, 1);
const C2I0E2Layout = LayoutUtils.getFormItemLayout(2, 0, 2);

class EditModal extends PureComponent {
  render() {
    const { visible, isAdd, onAdd, onEdit, onClose, saveForm, form, submitLoading } = this.props;
    const { getFieldDecorator } = form;
    saveForm(form);
    return (
      <Modal
        title={isAdd ? '添加信息' : '编辑信息'}
        okText={isAdd ? '添加' : '保存'}
        closable={false}
        visible={visible}
        width={1200}
        footer={[
          <Button key="submit" type="primary" onClick={isAdd ? onAdd : onEdit} loading={submitLoading}>
            {isAdd ? '添加' : '保存'}
          </Button>,
          <Button key="close" onClick={onClose}>
            关闭
          </Button>,
        ]}
      >
        <Form layout="vertical">
          {
            isAdd
              ? ''
              : (
                <Row>
                  <Col {...C2I0Layout}>
                    <Form.Item label="编号:" hasFeedback>
                      {
                        getFieldDecorator('id', {
                          initialValue: SysUtils.getPropsValue(this.props, ['record', 'id']),
                        })(<Input disabled />)}
                    </Form.Item>
                  </Col>
                </Row>
              )
          }
          <Row gutter={16}>
            <UserId
              columnLayout={2}
              columnIndex={0}
              form={form}
              required
              hasFeedback
              disabled={!isAdd}
              label="用户名"
              field="username"
              initialValue={() => SysUtils.getPropsValue(this.props, ['record', 'username'])}
            />
            <MobilePhone
              columnLayout={2}
              columnIndex={1}
              form={form}
              required
              hasFeedback
              label="手机号码"
              field="phone"
              initialValue={() => SysUtils.getPropsValue(this.props, ['record', 'phone'])}
            />
            <Email
              columnLayout={2}
              columnIndex={0}
              form={form}
              required
              hasFeedback
              label="邮箱地址"
              field="email"
              initialValue={() => SysUtils.getPropsValue(this.props, ['record', 'email'])}
            />
            <Name
              columnLayout={2}
              columnIndex={1}
              form={form}
              required
              hasFeedback
              disabled={!isAdd}
              label="姓名"
              field="actualName"
              initialValue={() => SysUtils.getPropsValue(this.props, ['record', 'actualName'])}
            />
            <Sex
              columnLayout={2}
              columnIndex={0}
              form={form}
              required
              disabled={!isAdd}
              label="性别"
              field="sex"
              initialValue={() => SysUtils.getPropsValue(this.props, ['record', 'sex'])}
            />
            <Col {...C2I1Layout}>
              <Form.Item label="出生日期">
                {
                  getFieldDecorator('birthday', {
                    initialValue: SysUtils.createMomentObject(SysUtils.getPropsValue(this.props, ['record', 'birthday']), 'DD-MM-YYYY'),
                    validateFirst: true,
                    rules: [{
                      required: true, message: '请选择出生日期',
                    }],
                  })(<DatePicker style={{ width: '100%' }} />)
                }
              </Form.Item>
            </Col>
            <Col {...C2I0Layout}>
              <Form.Item label="所属城市">
                {
                  getFieldDecorator('city', {
                    initialValue: SysUtils.getPropsValue(this.props, ['record', 'city']),
                    validateFirst: true,
                    rules: [{
                      type: 'array', required: true, message: '请选择所属城市',
                    }],
                  })(<Cascader
                    showSearch
                    options={SysUtils.getPropsValue(this.props, ['cityData'], [])}
                    onChange={this.handleCityChange}
                    placeholder="请选择所属城市"
                  />)
                }
              </Form.Item>
            </Col>
            <AmtInput
              columnLayout={2}
              columnIndex={1}
              form={form}
              required={false}
              hasFeedback
              label="每月收入"
              field="income"
              min={500}
              max={100000}
              decimal={1}
              initialValue={() => SysUtils.getPropsValue(this.props, ['record', 'income'])}
            />
          </Row>
          <Row gutter={16}>
            <Col {...C2I0E2Layout}>
              <Form.Item label="备注">
                {
                  getFieldDecorator('remark', {
                    initialValue: SysUtils.getPropsValue(this.props, ['record', 'remark']),
                  })(<TextArea style={{ minHeight: 32 }} placeholder="请输入备注信息" rows={4} />)
                }
              </Form.Item>
            </Col>
            <Col {...C2I0Layout}>
              <Form.Item label="提交结果">
                {
                  getFieldDecorator('submitTestResult', {
                    initialValue: SysUtils.getPropsValue(this.props, ['record', 'submitTestResult'], 0),
                  })(
                    <RadioGroup>
                      <Radio value={0}>成功</Radio>
                      <Radio value={1}>失败</Radio>
                    </RadioGroup>)
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    submitLoading: state.routes.submitLoading,
  };
}

export default connect(mapStateToProps)(Form.create()(EditModal));
