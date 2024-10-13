import React from "react";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-secondary h-screen w-screen'>
      <div className='flex flex-col items-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-4'></div>
        <p className='mt-4 text-white text-xl font-semibold'>{text}</p>
      </div>
    </div>
  );
};

export default Loading;
