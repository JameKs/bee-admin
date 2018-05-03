class API {
  static getApi = (name) => {
    let api = '';
    if (name === 'MarginAcct') {
      api = `
      <MarginAcct
        form={form}
        required
        hasFeedback
        acctField="marginAcct"
        acctNameField="marginAcctName"
        initAcct={() => SysUtils.getPropsValue(this.props, '', 'stepFormData', 'marginAcct')}
        initAcctName={() => SysUtils.getPropsValue(this.props, '', 'stepFormData', 'marginAcctName')}
      />

`;
      return api;
    }
  }
}

export default API;
