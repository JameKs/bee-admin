class API {
  static getApi = (name) => {
    let api = '';
    if (name === 'AmtInput') {
      api = `
    <AmtInput
      form={form}
      required={false}
      hasFeedback
      label="每月收入"
      field="income"
      min={500}
      max={50000}
      decimal={1}
      initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'income'])}
    />

`;
      return api;
    } else if (name === 'DoublePwd') {
      api = `
    <DoublePwd
      form={form}
      required
      hasFeedback
      pwdLabel="密码"
      pwdField="password"
      confirmLabel="确认密码"
      confirmField="confirmPassword"
      min={3}
      max={10}
      pwdInitialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'password'])}
      confirmInitialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'confirmPassword'])}
    />

`;
      return api;
    } else if (name === 'Ellipsis') {
      api = `
      <Ellipsis className={styles.item}>
        {
          <div>
            <div>名称</div>
            <div>描述</div>
          </div>
        }
      </Ellipsis>

`;
      return api;
    } else if (name === 'Email') {
      api = `
      <Email
        form={form}
        required
        hasFeedback
        label="邮箱地址"
        field="email"
        initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'email'])}
      />

`;
      return api;
    } else if (name === 'MobilePhone') {
      api = `
      <MobilePhone
        form={form}
        required
        hasFeedback
        label="手机号码"
        field="phone"
        initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'phone'])}
      />

`;
      return api;
    } else if (name === 'Name') {
      api = `
      <Name
        form={form}
        required
        hasFeedback
        label="姓名"
        field="actualName"
        initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'actualName'])}
      />

`;
      return api;
    } else if (name === 'NumberCard') {
      api = `
      <NumberCard
        icon="pay-circle-o"
        color="#64ea91"
        title="审批任务"
        number: 103
      />

`;
      return api;
    } else if (name === 'PageHeader') {
      api = `
      const action = (
        <div>
          <ButtonGroup >
            <Button>不通过</Button>
            <Button>暂停</Button>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button><Icon type="ellipsis" /></Button>
            </Dropdown>
          </ButtonGroup>
          <Button type="primary" onClick={this.handlePassClick}>通过</Button>
        </div>
      );
      const extra = (
        <Row>
          <Col xs={24} sm={8}>
            <div>状态</div>
            <div style={{ color: '#262626', fontSize: 20 }}>{approvalBasic.status}</div>
          </Col>
          <Col xs={24} sm={16}>
            <div>申请额度</div>
            <div style={{ color: '#00A0E9', fontSize: 20 }}>{￥ 10000}}</div>
          </Col>
        </Row>
      );
      const description = (
        <DescriptionList size="small" col="2">
          <Description term="创建人">{approvalBasic.founder}</Description>
          <Description term="申请卡种">{approvalBasic.cardType}</Description>
          <Description term="创建时间">{approvalBasic.createDate}</Description>
          <Description term="关联资料"><a href="">{approvalBasic.related}</a></Description>
          <Description term="备注">{approvalBasic.remark}</Description>
        </DescriptionList>
      );
      <PageHeader
        title="流程编号：201801110005"
        logo={<img alt="" src="/seno.png" />}
        action={action}
        content={description}
        extraContent={extra}
      />

`;
      return api;
    } else if (name === 'Sex') {
      api = `
      <Sex
        form={form}
        required
        label="性别"
        field="sex"
        width="60%"
        initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'sex'])}
      />

`;
      return api;
    } else if (name === 'UserId') {
      api = `
      <UserId
        form={form}
        required
        hasFeedback
        label="用户名"
        field="username"
        initialValue={() => SysUtils.getPropsValue(this.props, ['formData', 'username'])}
      />

`;
      return api;
    } else if (name === 'Result') {
      api = `
      const description = 'XXX信息建立成功';
      const extra = (
        <DescriptionList size="large" title="XXX信息" style={{ marginBottom: 32 }}>
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
      <Result
        type="success"
        title="提交成功"
        description={description}
        extra={extra}
        actions={actions}
      />

`;
      return api;
    }
  }
}

export default API;
