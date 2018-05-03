import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Button, Spin, Tabs } from 'antd';
import { SysUtils } from 'utils';
import config from 'src/config.json';
import { USER_LOGIN } from 'constants/routes/user';
import styles from './styles/index.less';

const FormItem = Form.Item;
const { TabPane } = Tabs;
class Login extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      this.props.dispatch({
        type: USER_LOGIN,
        payload: { values, handleSuccess: this.handleSuccess },
      });
    });
  }

  handleSuccess = () => {
    this.props.history.push('/');
  }

  render() {
    const { error } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.main}>
        <Spin spinning={SysUtils.getPropsValue(this.props, ['loading'], false)}>
          <Tabs className={styles.tabs}>
            <TabPane tab="账户密码登录" key="account">
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {
                    getFieldDecorator('userid', {
                      rules: [{
                        required: true,
                        message: '请输入员工号!',
                      }],
                    })(<Input
                      size="large"
                      prefix={<Icon type="user" className={styles.prefixIcon} />}
                      placeholder="admin | guest"
                    />)
                  }
                </FormItem>
                <FormItem>
                  {
                    getFieldDecorator('password', {
                      rules: [{
                        required: true,
                        message: '请输入密码!',
                      }],
                    })(<Input
                      size="large"
                      prefix={<Icon type="lock" className={styles.prefixIcon} />}
                      type="password"
                      placeholder="123456 | 654321"
                    />)
                  }
                </FormItem>
                <FormItem className={styles.additional}>
                  <a className={styles.forgot} target="_blank" href={config.forgotLink}>忘记密码</a>
                  <Button type="primary" htmlType="submit" size="large" className={styles.submit}>
                    登录
                  </Button>
                  <p className={styles.error}>
                    <span>{error}</span>
                  </p>
                </FormItem>
              </Form>
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.routes.loading,
    error: state.routes.error,
  };
}

export default connect(mapStateToProps)(Form.create()(withRouter(Login)));
