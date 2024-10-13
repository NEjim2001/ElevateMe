import {
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/16/solid";
import React, { useState, useEffect } from "react";

const Meditation = () => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathStage, setBreathStage] = useState("Inhale");
  const [musicAudio] = useState(new Audio("src/assets/music.mp3")); // Replace with your meditation music file

  const handleMusicPlayPause = () => {
    if (isPlayingMusic) {
      musicAudio.pause();
    } else {
      musicAudio.play();
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  const startBreathingExercise = () => {
    setIsBreathing(true);
    let counter = 0;
    const breathCycle = setInterval(() => {
      if (counter % 2 === 0) {
        setBreathStage("Inhale");
      } else {
        setBreathStage("Exhale");
      }
      counter++;
      if (counter === 8) {
        clearInterval(breathCycle);
        setIsBreathing(false);
        setBreathStage("Inhale");
      }
    }, 4000);
  };

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-tertiary to-secondary flex flex-col items-center justify-center p-6'>
      <h1 className='text-4xl font-bold text-white mb-6'>Meditation</h1>

      {/* Meditation Music Section */}
      <div className='w-full md:w-2/3 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-6 mb-8'>
        <h2 className='text-2xl font-semibold text-white mb-4 flex items-center'>
          <MusicalNoteIcon className='h-8 w-8 mr-2 text-blue-400' />
          Meditation Music
        </h2>

        <div className='flex justify-center items-center'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg'
            onClick={handleMusicPlayPause}
          >
            {isPlayingMusic ? (
              <PauseIcon className='h-8 w-8' />
            ) : (
              <PlayIcon className='h-8 w-8' />
            )}
          </button>
          <span className='ml-4 text-white text-lg'>
            {isPlayingMusic ? "Playing..." : "Paused"}
          </span>
        </div>
      </div>

      {/* Breathing Exercise Section */}
      <div className='w-full md:w-2/3 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-6 mb-8'>
        <h2 className='text-2xl font-semibold text-white mb-4'>
          Breathing Exercise
        </h2>
        <p className='text-white mb-4'>
          Follow the breathing pattern: inhale and exhale for 4 seconds.
        </p>

        <div className='flex flex-col items-center'>
          <div
            className={`rounded-full bg-blue-300 flex items-center justify-center mb-4 transition-all duration-1000 ease-in-out ${
              breathStage === "Inhale" ? "w-48 h-48" : "w-24 h-24"
            }`}
          >
            <span className='text-white text-2xl font-bold'>{breathStage}</span>
          </div>

          <button
            className={`${
              isBreathing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-6 rounded-full shadow-lg`}
            onClick={startBreathingExercise}
            disabled={isBreathing}
          >
            {isBreathing ? "Breathing..." : "Start Breathing Exercise"}
          </button>
        </div>
      </div>

      {/* Meditation Guide from Spotify */}
      <div className='w-full md:w-2/3 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg p-6'>
        <h2 className='text-2xl font-semibold text-white mb-4'>
          Meditation Guide Podcast
        </h2>
        <p className='text-white mb-4'>
          Stream a guided meditation session directly from Spotify.
        </p>

        {/* Spotify Embed */}
        <iframe
          src='https://open.spotify.com/embed/artist/5A7xRgKUd1aEWZ3ZNi2fOp?utm_source=generator'
          width='100%'
          height='80'
          allow='encrypted-media'
          title='Spotify Meditation Guide'
        ></iframe>
      </div>
    </div>
  );
};

export default Meditation;
