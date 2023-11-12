import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface PieChartProps {
  pieChartData?: number[];
}

const PieChart: React.FC<PieChartProps> = ({ pieChartData = [0, 0, 0, 0, 0] }) => {
  const options: ApexOptions = {
    chart: {
      width: "100%",
      type: "pie",
    },
    colors: ["#a5b4fc", "#6366f1", "#8b5cf6", "#6d28d9", "#41076e"],
    labels: ["N/A", "Desayuno", "Almuerzo", "Cena", "Merienda"],
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -7,
        },
      },
    },
    legend: {
      position: "bottom",
    },
  };

  const series = pieChartData;

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="pie"
      height={300}
      width="100%"
    />
  );
};

export default PieChart;
