import React from "react";
import Chart from "react-apexcharts";

class CircleGoal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [70],
      options: {
        chart: {
          height: 350,
          type: "radialBar",
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#745cff'],
            inverseColors: true,

            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "70%",
            },
          },
        },
        labels: ["Objetivo"],
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="radialBar"
        height={350}
      />
    );
  }
}
export default  CircleGoal;

