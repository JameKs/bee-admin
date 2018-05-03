import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ThreeColumnsInput from './input';
import ThreeColumnsOutput from './output';

class ThreeColumns extends PureComponent {
  render() {
    const { history, isOutput } = this.props;
    const CurrentComponent = isOutput === true ? ThreeColumnsOutput : ThreeColumnsInput;
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

export default connect(mapStateToProps)(ThreeColumns);
