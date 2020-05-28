
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
  CandlestickSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import algo from "react-stockcharts/lib/algorithm";
import {
  LabelAnnotation,
  Annotate,
  SvgPathAnnotation,
  buyPath,
  sellPath
} from "react-stockcharts/lib/annotation";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
  OHLCTooltip
} from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

const annotationProps = {
  fontSize: 18,
  fill: d => {
    if (d.text === 'b') return '#35FF35';
    if (d.text === 's') return '#FF3535';
    if (d.text === 'ep') return '#00FF00';
    if (d.text === 'en') return '#FF0000';
    if (d.text === 'ez') return '#0000FF';
  },
  opacity: 0.8,
  text: d => d.text,
  y: ({ yScale }) => yScale.range()[0],
};

const defaultAnnotationProps = {
  onClick: console.log.bind(console),
};

const longAnnotationProps = {
  ...defaultAnnotationProps,
  y: ({ yScale, datum }) => yScale(datum.low),
  fill: "#006517",
  path: buyPath,
  tooltip: "Go long",
};

const shortAnnotationProps = {
  ...defaultAnnotationProps,
  y: ({ yScale, datum }) => yScale(datum.high),
  fill: "#FF0000",
  path: sellPath,
  tooltip: "Go short",
};

class MyCandleStickChart extends React.Component {
  render() {
    const height = 750;
    const { type, data: initialData, width, ratio } = this.props;
    const margin = { left: 70, right: 70, top: 20, bottom: 30 };

    const gridHeight = height - margin.top - margin.bottom;
    const gridWidth = width - margin.left - margin.right;

    const showGrid = true;
    const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 } : {};
    const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.1 } : {};

    const buySell = algo()
      .windowSize(2)
      .accumulator(([prev, now]) => {
        if (now.text === 'b') return "LONG";
        if (now.text === 's') return "SHORT";
      })
      .merge((d, c) => { d.longShort = c; });

    const calculatedData = buySell(initialData);
    console.log(calculatedData);
    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date);
    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(calculatedData);

    const start = xAccessor(last(data));
    const end = xAccessor(data[Math.max(0, data.length - 150)]);
    const xExtents = [start, end];

    return (
      <ChartCanvas height={600}
        width={width}
        ratio={ratio}
        margin={margin}
        type={type}
        seriesName="ToTheTop"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
      >

        <Chart id={1}
          yExtents={d => [d.high, d.low]}
        >
          <XAxis axisAt="bottom" orient="bottom" {...xGrid} />
          <YAxis axisAt="right" orient="right" ticks={5} {...yGrid} />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")} />

          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")} />

          <CandlestickSeries />

          <EdgeIndicator itemType="last" orient="right" edgeAt="right"
            yAccessor={d => d.close} fill={d => d.close > d.open ? "#6BA583" : "#FF0000"} />

          <OHLCTooltip xDisplayFormat={timeFormat("%Y-%m-%d %H:%M")} origin={[-40, 0]} />

          <Annotate with={LabelAnnotation}
            when={d => d.text.length > 0}
            usingProps={annotationProps} />

          <Annotate with={SvgPathAnnotation} when={d => d.longShort === "LONG"}
            usingProps={longAnnotationProps} />

          <Annotate with={SvgPathAnnotation} when={d => d.longShort === "SHORT"}
            usingProps={shortAnnotationProps} />

        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

MyCandleStickChart.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

MyCandleStickChart.defaultProps = {
  type: "svg",
};
MyCandleStickChart = fitWidth(MyCandleStickChart);

export default MyCandleStickChart;
