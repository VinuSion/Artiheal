import React from "react";
import Chart from "react-apexcharts";

const color = ['#745cff']; // Define your colors

class SplineArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          data: [21, 22, 10, 50, 16, 21, 13],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          endingShape: 'rounded'

         
        },
        colors: color,
        
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ['Lunes'],
            ['Martes'],
            ['Miercoles'],
            ['Jueves'],
            ['Viernes'],
            ['Sabado'],
            ['Domingo'],
          ],
          labels: {
            style: {
              colors: color,
              fontSize: '12px',
            },
          },
        },
        yaxis:{
            title:{
                text: '(XXXXXXX)'

            }
        

        }
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="area"
        height={350}
        width={350}
      />
    );
  }
}

export default SplineArea;
