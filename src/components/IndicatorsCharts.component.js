import React, { Component } from 'react'
import { Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

class IndicatorsChartsComponent extends Component {

  render() {
    let charts = [];
    let mycolorIdx = 0;

    const mycolors = [
      'rgb(0,0,0)',
      'rgb(0,0,255)',
      'rgb(0,255,0)',
      'rgb(0,255,255)',
      'rgb(255,0,0)',
      'rgb(255,0,255)',
      'rgb(255,255,255)'
    ];

    const NR_OF_VALUES = 500;

    const chartOptions = {
      responsive: true
    }

    for (let i = 0; i < this.props.indicators.nrOfCharts; i++) {
      let chartData = {
        labels: [],
        datasets: []
      }
      const trimmedValues = this.props.indicators.values.slice(this.props.indicators.values.length - NR_OF_VALUES);
      for (let prop of this.props.indicators.props) {
        if (prop.chartIdx === i) {
          const mycolor = mycolors[mycolorIdx];
          mycolorIdx++;
          let dataset = {
            label: prop.label,
            borderColor: mycolor,
            backgroundColor: mycolor,
            fill: false,
            lineTension: 0,
            data: []
          }
          for (const value of trimmedValues) {
            dataset.data.push(value[prop.key]);
          }
          chartData.datasets.push(dataset);
        }
      }
      for (let value of trimmedValues) {
        chartData.labels.push(moment(value.date).format('YY-M-D H:m'));
      }
      charts.push(<Line data={chartData} options={chartOptions} width={600} height={250} key={i} />);
    }

    return (
      <Row>
        {charts}
      </Row>
    );
  }
}

export default IndicatorsChartsComponent