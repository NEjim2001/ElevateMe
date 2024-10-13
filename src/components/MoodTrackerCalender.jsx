import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

function MoodTrackerCalender({ moodData }) {
  const moodDates = moodData?.map((entry) => ({
    date: dayjs(entry.timestamp).toDate(),
    rating: entry.rating,
  }));

  const getMoodColor = (rating) => {
    switch (rating) {
      case 1:
        return "bg-red-600";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-400";
      case 4:
        return "bg-green-400";
      case 5:
        return "bg-green-600";
      default:
        return "";
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const moodDay = moodDates.find((mood) =>
        dayjs(mood.date).isSame(dayjs(date), "day")
      );
      if (moodDay) {
        return `${getMoodColor(moodDay.rating)} text-white hover:opacity-90`;
      }
    }
    return "text-black";
  };

  return (
    <div className='text-center'>
      <div className='shadow-lg bg-gradient-to-tl to-primaryOpacity from-secondaryOpacity rounded-b-lg p-4 w-full flex items-center justify-center'>
        <Calendar
          tileClassName={tileClassName}
          className='bg-transparent text-white'
        />
      </div>
    </div>
  );
}

export default MoodTrackerCalender;
