import React from "react";

function ActionButton({ icon, text }) {
  return (
    <div className='h-full w-full flex flex-col items-center justify-around p-6 rounded-lg shadow-md transition cursor-pointer bg-gradient-to-r from-primaryOpacity to-secondaryOpacity hover:scale-105'>
      <img
        src={icon}
        alt={`${text} icon`}
        className='w-28 mb-2 cursor-pointer'
      />
      <span className='text-2xl font-bold cursor-pointer'>{text}</span>
    </div>
  );
}

export default ActionButton;
