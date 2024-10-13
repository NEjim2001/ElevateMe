import React, { useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
import MoodTrackerChart from "../components/MoodTrackerChart";
import MoodTrackerCalender from "../components/MoodTrackerCalender";
import ActionButton from "../components/ActionButton";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoading, setUser } from "../redux/slices/user";
import { auth } from "../config/firebase";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import Journal from "./Journal";
import Chatbot from "../components/ChatBot";
import DailyMoodCheckPopup from "../components/DailyMoodCheckPopup";
import axios from "axios";

const Dashboard = () => {
  const [showChart, setShowChart] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [calenderData, setCalenderData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const fetchMoodResponses = async () => {
    try {
      const response = await axios.get(
        "https://uta-flask-website.vercel.app/api/check/fetchResponses",
        {
          headers: {
            Authorization: user,
          },
        }
      );
      setCalenderData(response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await fetchMoodResponses();
    };

    fetchData();
  }, []);

  const handleToggle = () => {
    setIsSliding(true); // Start animation
    setTimeout(() => {
      setShowChart(!showChart); // Switch after the animation completes
      setIsSliding(false); // End animation
    }, 300); // Duration should match the animation timing
  };

  // Modal toggle handler
  const handleJournalToggle = () => {
    setIsJournalOpen(!isJournalOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='w-screen h-screen bg-gradient-to-tl from-tertiary to-secondary flex flex-col items-center px-44 justify-around'>
          {/* Profile and Mood Tracker/Chart Section */}
          <section className='px-32 flex flex-row items-center justify-between w-full mt-10  '>
            <UserProfile />
            {calenderData[0]?.rating == 0 && <DailyMoodCheckPopup />}
            <div className='flex flex-row items-center w-3/4 justify-center h-full border-l border-white border-opacity-10 '>
              <ChevronDoubleLeftIcon
                className='h-10 w-10  cursor-pointer text-white hover:bg-gray-200 rounded-full p-2 mx-2'
                onClick={handleToggle}
              />

              <div
                className={`w-3/4  transition-transform duration-300 ease-in-out transform h-96  ${
                  isSliding ? "translate-x-full" : ""
                }`}
              >
                <div className='bg-gradient-to-br from-primary to-secondary rounded-t-md items-center justify-center flex'>
                  <p className='text-3xl font-bold text-white p-4'>
                    {showChart ? "MOOD TRACKER" : "MOOD CALENDER"}
                  </p>
                </div>
                {showChart ? (
                  <MoodTrackerChart />
                ) : (
                  <MoodTrackerCalender moodData={calenderData} />
                )}
              </div>

              <ChevronDoubleRightIcon
                className='h-10 w-10 cursor-pointer text-white hover:bg-gray-200 rounded-full p-2 mx-2'
                onClick={handleToggle}
              />
            </div>
          </section>

          {/* Action Buttons Section */}
          <section className=' flex-row items-center w-3/4  my-8 space-x-24   h-1/3 flex justify-between '>
            <div
              onClick={handleJournalToggle}
              className='h-full w-full flex flex-col items-center justify-around p-6 rounded-lg shadow-md transition cursor-pointer bg-gradient-to-r from-primaryOpacity to-secondaryOpacity hover:scale-105'
            >
              <img
                src='/image/journal-icon.svg'
                alt={`journal icon`}
                className='w-28 mb-2 cursor-pointer'
              />
              <span className='text-2xl font-bold cursor-pointer'>Journal</span>
            </div>

            <div
              onClick={() => {
                navigate("/forum");
              }}
              className='h-full w-full flex flex-col items-center justify-around p-6 rounded-lg shadow-md transition cursor-pointer bg-gradient-to-r from-primaryOpacity to-secondaryOpacity hover:scale-105'
            >
              <img
                src='/image/forum-icon.svg'
                alt={`forum icon`}
                className='w-28 mb-2 cursor-pointer'
              />
              <span className='text-2xl font-bold cursor-pointer'>Forum</span>
            </div>

            <div
              onClick={() => {
                navigate("/meditation");
              }}
              className='h-full w-full flex flex-col items-center justify-around p-6 rounded-lg shadow-md transition cursor-pointer bg-gradient-to-r from-primaryOpacity to-secondaryOpacity hover:scale-105'
            >
              <img
                src='/image/meditation-icon.svg'
                alt={`mediation icon`}
                className='w-28 mb-2 cursor-pointer'
              />
              <span className='text-2xl font-bold cursor-pointer'>
                Meditation
              </span>
            </div>
          </section>
        </div>
      )}

      <Chatbot />

      {isJournalOpen && (
        <Journal
          handleJournalToggle={handleJournalToggle}
          isOpen={isJournalOpen}
        />
      )}
    </>
  );
};

export default Dashboard;
