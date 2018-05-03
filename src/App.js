import React from 'react';
import { connect } from 'react-redux';
import { AppLayout } from 'layouts';
import { SET_LAYOUTS_STATE } from 'constants/reducers';
import { FRAME_NAV_GETDATA } from 'constants/frames';

class App extends React.PureComponent {
  state = {
    routesData: null,
    routesContext: null,
    routesContextKeys: null,
  }

  componentWillMount() {
    const routesContext = require.context('routes', true, /\.js$/);
    const routesContextKeys = routesContext.keys();
    this.setState({ routesContext, routesContextKeys });

    this.getClientWidth();
    window.onresize = () => { this.getClientWidth(); };
  }

  componentDidMount() {
    const userid = window.sessionStorage.getItem('userid');
    this.props.dispatch({ type: FRAME_NAV_GETDATA, payload: { userid, handleRoutesData: this.handleRoutesData } });
  }

  getClientWidth = () => {
    const clientWidth = document.body.clientWidth;
    const isMobile = clientWidth <= 992;
    this.props.dispatch({ type: SET_LAYOUTS_STATE, payload: { isMobile } });
  };

  handleRoutesData = (routesData) => {
    this.setState({ routesData });
  }

  createRouteComponent = () => {
    const { routesData, routesContext, routesContextKeys } = this.state;
    const { location } = this.props;

    if (routesData == null || routesContext == null) {
      return null;
    }

    let path = location.pathname;
    if (path === '/') { path = '/dashboard'; }
    const key = `.${path}/index.js`;

    if (routesContextKeys.filter(item => item === key).length === 0) {
      return routesContext('./exception/404/index.js').default;
    } else if (routesData.filter(item => item.path === path).length === 0) {
      return routesContext('./exception/403/index.js').default;
    } else {
      return routesContext(key).default;
    }
  }

  render() {
    const { isMobile, location } = this.props;
    const component = this.createRouteComponent();
    return (
      <AppLayout
        isMobile={isMobile}
        location={location}
        component={component}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isMobile: state.layouts.isMobile,
    siderCollapsed: state.layouts.siderCollapsed,
  };
}

export default connect(mapStateToProps)(App);
