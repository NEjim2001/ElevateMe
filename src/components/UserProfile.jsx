import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setUserLoading } from "../redux/slices/user";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userID = useSelector((state) => state.user.user.uid);

  const handleLogout = async () => {
    dispatch(setUserLoading(true));
    try {
      await signOut(auth);
      dispatch(setUser(null));
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      dispatch(setUserLoading(false));
      navigate("/");
    }
  };

  const getInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <div className='text-center h-full flex flex-col justify-around items-center '>
      {/* Profile Picture or Initial */}
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt='User Icon'
          className='w-28 h-28 object-cover rounded-full mb-4'
        />
      ) : (
        <div className='w-28 h-28 bg-blue-400 text-white text-5xl flex items-center justify-center rounded-full mb-4'>
          {getInitial()}
        </div>
      )}

      {/* Welcome Message */}
      <h2 className='text-2xl font-bold mb-2 w-full'>
        WELCOME
        <br />
        <span className='block w-full text-xl whitespace-nowrap overflow-hidden'>
          BACK!
        </span>
      </h2>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className='bg-blue-400 font-bold text-white py-2 px-6 rounded-full hover:bg-blue-500 w-full'
      >
        LOGOUT
      </button>

      {/* Icons Section */}
      <div className='flex justify-center mt-4 space-x-4'>
        <UserCircleIcon className='h-10 cursor-pointer' />
        <Cog6ToothIcon className='h-10 cursor-pointer' />
        <QuestionMarkCircleIcon className='h-10 cursor-pointer' />
      </div>
    </div>
  );
}

export default UserProfile;
