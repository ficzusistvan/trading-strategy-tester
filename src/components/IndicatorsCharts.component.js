import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

class IndicatorsChartsComponent extends Component {

  render() {
    let chartData1 = {
      labels: [],
      datasets: [
        {
          label: "k",
          borderColor: 'rgb(255, 0, 0)',
          backgroundColor: 'rgb(255, 0, 0)',
          fill: false,
          lineTension: 0,
          data: []
        },
        {
          label: "d",
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(255, 255, 255)',
          fill: false,
          lineTension: 0,
          data: []
        }
      ]
    };
    let chartOptions1 = {
      responsive: true
    }

    const arr = this.props.indicators.slice(this.props.indicators.length - 100);

    arr.forEach((ind) => {
      chartData1.labels.push(moment(ind.date).format('YY-M-D H:m'));
      chartData1.datasets[0].data.push(ind.k);
      chartData1.datasets[1].data.push(ind.d);
    });
    return (
      <Row>
        <Col>
          <Line data={chartData1} options={chartOptions1} width={600} height={250} />
        </Col>
      </Row>
    );
  }
}

export default translate(IndicatorsChartsComponent)