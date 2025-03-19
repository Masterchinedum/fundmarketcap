"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions
} from "chart.js"

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

interface SparklineChartProps {
  data: number[]
  width?: number
  height?: number
  color: string
}

export function SparklineChart({ 
  data, 
  width = 120, 
  height = 40, 
  color 
}: SparklineChartProps) {
  const chartData = {
    labels: [...Array(data.length).keys()],
    datasets: [
      {
        data: data,
        fill: false,
        borderColor: color,
        tension: 0.3,
        borderWidth: 1.5,
        pointRadius: 0,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div style={{ width, height, margin: "0 auto" }}>
      <Line data={chartData} options={options} />
    </div>
  )
}