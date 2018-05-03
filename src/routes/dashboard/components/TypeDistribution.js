import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Theme } from 'utils';

class TypeDistribution extends PureComponent {
  getOption = () => {
    const option = {
      title: {
        text: '类型分布',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
      // 需要填充数据
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      color: [
        Theme.color.sky,
        Theme.color.green,
        Theme.color.grass,
        Theme.color.purple,
        Theme.color.peach,
        Theme.color.shallowRed,
        Theme.color.blue,
        Theme.color.green],
      xAxis: [
      // 需要填充数据
      ],
      yAxis: [{
        type: 'value',
      }],
      series: [
      // 需要填充数据
      ],
    };
    return option;
  }


  render() {
    const { data } = this.props;
    let option = this.getOption();
    option = { ...option, ...data };
    for (let i = 0; i < option.xAxis.length; i += 1) {
      option.xAxis[i] = { ...option.xAxis[i], type: 'category', boundaryGap: false };
    }

    for (let i = 0; i < option.series.length; i += 1) {
      option.series[i] = { ...option.series[i], type: 'line', smooth: 'true', stack: '总量', areaStyle: { normal: {} } };
    }
    return (
      <ReactEcharts
        style={{ height: 350, width: '100%' }}
        option={option}
        className="react_for_echarts"
      />
    );
  }
}

export default TypeDistribution;
