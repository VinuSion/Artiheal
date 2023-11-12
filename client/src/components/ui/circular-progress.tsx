import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface CircularProgressBarProps {
  percentage?: number;
  circleSize?: string,
  valueFontSize?: string,
  labelFontSize?: string,
  labelOffset?: number,
  gradientEnabled?: boolean;
  showLabel?: boolean;
  label?: string;
  height?: number;
  width?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage = 0,
  circleSize = "55%",
  valueFontSize = "14px",
  labelFontSize = "12px",
  labelOffset = 0,
  gradientEnabled = false,
  showLabel = false,
  label = "Progreso",
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
            fontSize: labelFontSize,
            offsetY: labelOffset,
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
        inverseColors: true,
        type: "vertical",
        gradientToColors: ["#c4b5fd"],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: [label],
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