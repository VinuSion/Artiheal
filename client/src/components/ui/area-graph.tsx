import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import {
  resetIcon,
  zoominIcon,
  zoomoutIcon,
  downloadIcon,
} from "@/lib/constants";

interface AreaGraphProps {
  height?: number;
  width?: number;
  graphData?: number[];
}

const AreaGraph: React.FC<AreaGraphProps> = ({
  height = 400,
  width = 400,
  graphData = [0, 0, 0, 0, 0, 0, 0],
}) => {
  const options: ApexOptions = {
    chart: {
      height: height,
      width: width,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: -3,
        tools: {
          download: downloadIcon,
          selection: false,
          zoom: false,
          zoomin: zoominIcon,
          zoomout: zoomoutIcon,
          pan: false,
          reset: resetIcon,
        },
      },
    },
    colors: ["#745cff"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    markers: {
      size: 5,
      colors: ["#ffffff"],
      strokeColors: ["#745cff"],
      strokeWidth: 3,
    },
    xaxis: {
      categories: [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ],
      labels: {
        style: {
          colors: ["#000000"],
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Calorías/dia en la semana (k/cal)",
      },
    },
    responsive: [
      {
        breakpoint: 320,
        options: {
          chart: {
            height: 220,
            width: 220,
          },
        }
      },
      {
        breakpoint: 460,
        options: {
          chart: {
            height: 300,
            width: 300,
          },
        }
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 380,
            width: 380,
          },
        }
      },
      {
        breakpoint: 700,
        options: {
          chart: {
            height: 250,
            width: 250,
          },
        }
      },
      {
        breakpoint: 800,
        options: {
          chart: {
            height: 300,
            width: 300,
          },
        }
      },
      {
        breakpoint: 900,
        options: {
          chart: {
            height: 350,
            width: 350,
          },
        }
      },
      {
        breakpoint: 1000,
        options: {
          chart: {
            height: 400,
            width: 400,
          },
        }
      },
      {
        breakpoint: 1150,
        options: {
          chart: {
            height: 400,
            width: 450,
          },
        }
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 400,
            width: 500,
          },
        }
      },
      {
        breakpoint: 1400,
        options: {
          chart: {
            height: 400,
            width: 550,
          },
        }
      },
      {
        breakpoint: 1500,
        options: {
          chart: {
            height: 400,
            width: 600,
          },
        }
      },
      {
        breakpoint: 1600,
        options: {
          chart: {
            height: 400,
            width: 650,
          },
        }
      },
      {
        breakpoint: 1700,
        options: {
          chart: {
            height: 400,
            width: 700,
          },
        }
      },
      {
        breakpoint: 1800,
        options: {
          chart: {
            height: 400,
            width: 750,
          },
        }
      },
      {
        breakpoint: 1900,
        options: {
          chart: {
            height: 400,
            width: 900,
          },
        }
      },
    ]
  };

  const series = [
    {
      data: graphData,
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={height}
      width={width}
    />
  );
};

export default AreaGraph;
