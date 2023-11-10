import ReactApexChart from "react-apexcharts";

const CircleGoal = () => {
  const options = {
    chart: {
      height: 350,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        track: {
          background: "light",
        },
      },
    },
    labels: ["Objetivo"],
  };

  const series = [70];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radialBar"
      height={350}
    />
  );
};

export default CircleGoal;

