import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import BasicTwoInput from './input';
import BasicTwoOutput from './output';

class BasicTwo extends PureComponent {
  render() {
    const { history, isOutput } = this.props;
    const CurrentComponent = isOutput === true ? BasicTwoOutput : BasicTwoInput;
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

export default connect(mapStateToProps)(BasicTwo);
