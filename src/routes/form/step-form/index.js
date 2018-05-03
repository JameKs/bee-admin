import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Steps } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const { Step } = Steps;
const indexRoute = '/form/step-form';
class StepForm extends PureComponent {
  getCurrentComponent = (step) => {
    const componentMap = {
      0: Step1,
      1: Step2,
      2: Step3,
      3: Step4,
      4: Step5,
    };
    return componentMap[step];
  }

  render() {
    const { history, formData, nextStep } = this.props;
    const currentStep = nextStep == null ? 0 : nextStep;
    const CurrentComponent = this.getCurrentComponent(currentStep);
    return (
      <Card title="分步表单" bordered={false}>
        <div>
          <Steps style={{ marginBottom: 32 }} current={currentStep}>
            <Step title="填写基本信息" />
            <Step title="填写详细信息" />
            <Step title="填写其他信息" />
            <Step title="确认输入信息" />
            <Step title="完成" />
          </Steps>
          <CurrentComponent
            history={history}
            indexRoute={indexRoute}
            formData={formData}
          />
        </div>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    formData: state.routes.formData,
    nextStep: state.routes.nextStep,
  };
}

export default connect(mapStateToProps)(StepForm);
