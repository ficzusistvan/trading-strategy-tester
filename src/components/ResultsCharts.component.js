import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import translate from 'redux-polyglot/translate';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

class ResultsChartsComponent extends Component {

  render() {
    let chartData1 = {
      labels: [],
      datasets: [
        {
          label: "volume",
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)',
          yAxisID: 'y-axis-1',
          fill: false,
          data: []
        },
        {
          label: "pip",
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          yAxisID: 'y-axis-2',
          fill: false,
          data: []
        },
        {
          label: "openMargin",
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgb(54, 162, 235)',
          yAxisID: 'y-axis-3',
          fill: false,
          data: []
        }
      ]
    };
    let chartOptions1 = {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      scales: {
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-1',
          scaleLabel: {
            display: true,
            fontColor: 'rgb(255, 99, 132)',
            labelString: 'volume',
          }
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-2',
          scaleLabel: {
            display: true,
            fontColor: 'rgb(75, 192, 192)',
            labelString: 'pip',
          },

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-3',
          scaleLabel: {
            display: true,
            fontColor: 'rgb(54, 162, 235)',
            labelString: 'openMargin',
          },

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }],
      }
    }
    let chartData2 = {
      labels: [],
      datasets: [
        {
          label: "profit",
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)',
          yAxisID: 'y-axis-1',
          fill: false,
          data: []
        },
        {
          label: "newBalance",
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          yAxisID: 'y-axis-2',
          fill: false,
          data: []
        }
      ]
    };
    let chartOptions2 = {
      responsive: true,
      hoverMode: 'index',
      stacked: false,
      scales: {
        yAxes: [{
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-1',
          scaleLabel: {
            display: true,
            fontColor: 'rgb(255, 99, 132)',
            labelString: 'profit'
          }
        }, {
          type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: 'left',
          id: 'y-axis-2',
          scaleLabel: {
            display: true,
            fontColor: 'rgb(75, 192, 192)',
            labelString: 'newBalance',
          },

          // grid line settings
          gridLines: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        }],
      }
    }
    this.props.trades.forEach((trade) => {
      chartData1.labels.push(moment(trade.enter.openDate).format('YY-M-D H:m'));
      chartData1.datasets[0].data.push(trade.enter.volume);
      chartData1.datasets[1].data.push(trade.enter.pip);
      chartData1.datasets[2].data.push(trade.enter.openMargin);

      chartData2.labels.push(moment(trade.exit.closeDate).format('YY-M-D H:m'));
      //chartData2.datasets[0].data.push(trade.exit.profit);
      chartData2.datasets[1].data.push(trade.exit.newBalance);
    });
    return (
      <Row>
        <Col>
          <Line data={chartData1} options={chartOptions1} width={600} height={250} />
          <Line data={chartData2} options={chartOptions2} width={600} height={250} />
        </Col>
      </Row>
    );
  }
}

export default translate(ResultsChartsComponent)