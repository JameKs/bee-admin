import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Result, DescriptionList } from 'components/basic';
import { SysUtils, ParseUtils } from 'utils';

const { Description } = DescriptionList;

class SingleColumnOutput extends PureComponent {
  render() {
    const { history, dispatch, response, cityData } = this.props;
    if (SysUtils.isFetchSucc(response)) {
      const respData = response.data;
      const description = 'XXX信息建立成功';
      const extra = (
        <DescriptionList size="large" title="XXX信息">
          <Description term="用户名">{respData.username}</Description>
          <Description term="手机号码">{respData.phone}</Description>
          <Description term="邮箱地址">{respData.email}</Description>
          <Description term="姓名">{respData.actualName}</Description>
          <Description term="性别">{ParseUtils.parseSexValue(respData.sex)}</Description>
          <Description term="出生日期">{ParseUtils.parseDateTimeString(respData.parseBirthday, 'MM-DD-YYYY', 'YYYY年MM月DD日')}</Description>
          <Description term="所属城市">{ParseUtils.parseCascaderValues(cityData, respData.city)}</Description>
          <Description term="每月收入">{ParseUtils.parseAmtUppercase(respData.income)}</Description>
          <Description term="备注">{respData.remark}</Description>
        </DescriptionList>
      );
      const actions = (
        <div>
          <Button type="primary">
            打印
          </Button>
          <Button type="primary" onClick={() => { SysUtils.return2Redo(dispatch); }}>
            再做一笔
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
    cityData: state.routes.cityData,
  };
}

export default connect(mapStateToProps)(SingleColumnOutput);
