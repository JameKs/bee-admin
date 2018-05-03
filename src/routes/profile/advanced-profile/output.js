import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import { Result, DescriptionList } from 'components/basic';
import { SysUtils } from 'utils';

const { Description } = DescriptionList;

class AdvancedProfileOutput extends PureComponent {
  render() {
    const { history, dispatch, response, goBackRoute } = this.props;
    if (SysUtils.isFetchSucc(response)) {
      const respData = response.data;
      const description = '流程审批成功';
      const extra = (
        <div>
          <DescriptionList size="large" title="流程信息" style={{ marginBottom: 16 }}>
            <Description term="流程编号">{respData.approvalNo}</Description>
          </DescriptionList>
          {
            goBackRoute == null
              ? null
              : <div>
                <Icon style={{ color: '#00A0E9', marginRight: 8 }} type="question-circle-o" />继续审批
                <a style={{ marginLeft: 16 }} onClick={() => { SysUtils.push2Route(dispatch, history, goBackRoute); }}>立即前往 <Icon type="right" /></a>
              </div>
          }
        </div>
      );
      const actions = (
        <div>
          <Button type="primary">
            打印
          </Button>
          <Button type="primary" onClick={() => { SysUtils.push2Home(dispatch, history); }}>
            返回主页
          </Button>
        </div>
      );
      return (
        <Result
          type="success"
          title="提交成功"
          description={description}
          extra={extra}
          actions={actions}
        />
      );
    } else {
      const extra = SysUtils.createDefErrExtra(response);
      const actions = SysUtils.createDefErrActions(dispatch);
      return (
        <Result
          type="error"
          title="提交失败"
          extra={extra}
          actions={actions}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    response: state.routes.response,
    goBackRoute: state.routes.goBackRoute,
  };
}

export default connect(mapStateToProps)(AdvancedProfileOutput);
