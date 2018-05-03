import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { REPLACE_ROUTES_STATE } from 'constants/reducers';
import { FRAME_SAGA_CANCEL } from 'constants/frames';
import { SysUtils } from 'utils';

class CRoute extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const clearSign = SysUtils.getPropsValue(nextProps.location, ['state', 'clearSign'], true);
    if (this.props.location.pathname !== location.pathname) {
      this.props.dispatch({ type: FRAME_SAGA_CANCEL });
      if (clearSign === true) {
        this.props.dispatch({ type: REPLACE_ROUTES_STATE, payload: {} });
      }
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const userid = window.sessionStorage.getItem('userid');
    return (
      <Route
        {...rest}
        render={props =>
          (
            userid == null
              ? (<Redirect to={{ pathname: '/user/login', state: { from: props.location } }} />)
              : (<Component {...props} />)
          )
        }
      />
    );
  }
}

export default connect()(CRoute);
