import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function DailyMoodCheckPopup({ closePopup }) {
  const [userMood, setUserMood] = useState(0);
  const user = useSelector((state) => state.user.uid);
  const [isOpen, setIsOpen] = useState(true); // Set to true to make it open initially

  // Emoji and description for each mood
  const moodEmojis = [
    { mood: 1, emoji: "😞", description: "Very Bad" },
    { mood: 2, emoji: "😕", description: "Bad" },
    { mood: 3, emoji: "😐", description: "Neutral" },
    { mood: 4, emoji: "🙂", description: "Good" },
    { mood: 5, emoji: "😁", description: "Very Good" },
  ];

  // Send mood response to the backend
  const addResponse = async () => {
    try {
      await axios.post(
        "https://uta-flask-website.vercel.app/api/check/addResponse",
        {
          rating: userMood,
        },
        {
          headers: {
            Authorization: user,
          },
        }
      );
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  // Submit mood and close the popup
  const handleMoodSubmit = () => {
    addResponse();
    setIsOpen(false); // Close the modal after submitting
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='rounded-lg shadow-2xl relative w-3/4 h-1/2 ring-2 ring-primary bg-white px-8'>
            {/* Close Button */}
            <button
              className='absolute top-2 right-2 text-white transition-colors duration-300 bg-red-600'
              onClick={() => {
                setIsOpen(false);
              }}
            >
              ✕
            </button>

            {/* Elevate Logo */}
            <div className=' justify-center mx-10 flex flex-row items-center gap-1'>
              <img
                src='//image/logo.png'
                alt='Elevate Logo'
                className='w-10 h-10 '
              />
              <h1 className=' text-black font-bold mt-5 text-2xl'>ElevateMe</h1>
            </div>

            {/* Title */}
            <h3 className='text-2xl font-bold mb-4 text-gray-800 text-center'>
              How Are You Feeling Today?
            </h3>

            {/* Emoji Mood Scale with Descriptions */}
            <div className='grid grid-cols-5 mb-6  gap-4 '>
              {moodEmojis.map((moodItem) => (
                <div
                  key={moodItem.mood}
                  className='flex flex-col items-center text-center bg-primary   rounded-lg'
                >
                  <button
                    className={`text-4xl focus:outline-none transition-transform duration-200 ${
                      userMood === moodItem.mood ? "scale-125" : ""
                    }`}
                    onClick={() => setUserMood(moodItem.mood)}
                    aria-label={`Rate mood ${moodItem.mood}`}
                    style={{ backgroundColor: "transparent" }}
                  >
                    {moodItem.emoji}
                  </button>
                  <p className='text-white font-bold text-xl mt-2'>
                    {moodItem.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className='text-center'>
              <button
                onClick={handleMoodSubmit}
                className='bg-gradient-to-br from-primary to-secondary text-white p-3 rounded-lg w-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300'
                disabled={userMood === 0} // Disable until a mood is selected
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
