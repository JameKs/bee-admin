import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SingleColumnInput from './input';
import SingleColumnOutput from './output';

class SingleColumn extends PureComponent {
  render() {
    const { history, isOutput } = this.props;
    const CurrentComponent = isOutput === true ? SingleColumnOutput : SingleColumnInput;
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

export default connect(mapStateToProps)(SingleColumn);
