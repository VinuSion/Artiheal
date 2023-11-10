import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface CircularProgressBarProps {
  percentage?: number;
  circleSize?: string,
  valueFontSize?: string,
  gradientEnabled?: boolean;
  showLabel?: boolean;
  height?: number;
  width?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage = 0,
  circleSize = "55%",
  valueFontSize = "14px",
  gradientEnabled = false,
  showLabel = false,
  height = 100,
  width = 100,
}) => {
  const options: ApexOptions = {
    chart: {
      height: height,
      width: width,
      type: "radialBar",
    },
    colors: ["#745cff"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: circleSize,
        },
        dataLabels: {
          name: {
            color: "#745cff",
            fontSize: "12px",
            show: showLabel,
          },
          value: {
            show: true,
            fontSize: valueFontSize,
            offsetY: showLabel ? 2 : 6,
            color: "#6b7280",
          },
        },
        track: {
          background: "#e5e7eb",
        },
      },
    },
    fill: {
      type: gradientEnabled ? "gradient" : "solid",
      gradient: {
        shade: "light",
        type: "vertical",
        gradientToColors: ["#c4b5fd"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progreso"],
  };

  const series: number[] = [percentage];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height={height}
      width={width}
    />
  );
};

export default CircularProgressBar;