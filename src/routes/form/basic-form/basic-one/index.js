import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import BasicOneInput from './input';
import BasicOneOutput from './output';

class BasicOne extends PureComponent {
  render() {
    const { history, isOutput } = this.props;
    const CurrentComponent = isOutput === true ? BasicOneOutput : BasicOneInput;
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

export default connect(mapStateToProps)(BasicOne);
