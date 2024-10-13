import React from "react";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { dummyMoodData } from "../../constants/DummyMoodData";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getLast7DaysMood = (moodData) => {
  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const date = dayjs().subtract(index, "day").format("YYYY-MM-DD");
    const moodEntry = moodData.find((entry) => entry.timestamp === date);
    return {
      date: dayjs(date).format("ddd, MMM D"),
      rating: moodEntry ? moodEntry.rating : 0,
    };
  }).reverse();
  return last7Days;
};

const MoodTrackerChart = ({ moodData }) => {
  const last7DaysMood = getLast7DaysMood(dummyMoodData);
  const labels = last7DaysMood.map((entry) => entry.date);
  const dataValues = last7DaysMood.map((entry) => entry.rating);

  const data = {
    labels,
    datasets: [
      {
        label: "Mood Level",
        data: dataValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Mood Tracker (Last 7 Days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Mood Level",
        },
      },
    },
  };

  return (
    <div className='shadow-lg bg-primary bg-opacity-40 rounded-b-lg p-4 h-80 w-full'>
      <Line data={data} options={options} />
    </div>
  );
};

export default MoodTrackerChart;
