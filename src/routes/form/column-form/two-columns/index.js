import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TwoColumnsInput from './input';
import TwoColumnsOutput from './output';

class TwoColumns extends PureComponent {
  render() {
    const { history, isOutput } = this.props;
    const CurrentComponent = isOutput === true ? TwoColumnsOutput : TwoColumnsInput;
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

export default connect(mapStateToProps)(TwoColumns);
