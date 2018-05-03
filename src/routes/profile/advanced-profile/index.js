import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AdvancedProfileDetail from './detail';
import AdvancedProfileOutput from './output';

class AdvancedProfile extends PureComponent {
  render() {
    const { history, isOutput } = this.props;
    const CurrentComponent = isOutput === true ? AdvancedProfileOutput : AdvancedProfileDetail;
    return (
      <CurrentComponent history={history} />
    );
  }
}

function mapStateToProps(state) {
  return {
    isOutput: state.routes.isOutput,
  };
}

export default connect(mapStateToProps)(AdvancedProfile);
