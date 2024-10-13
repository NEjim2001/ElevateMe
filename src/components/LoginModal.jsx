import React, { useState } from "react";
import { TextField, Button, Modal, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setUser, setUserLoading } from "../redux/slices/user";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isModalOpen, closeModal }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    dispatch(setUserLoading(true));
    try {
      let userCredential;

      userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser(userCredential.user));
      navigate("/dashboard");
      closeModal(); // Close modal on success
    } catch (error) {
      console.error("Authentication error:", error.message);
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          bgcolor: "#f4f4f9", // Matching journal modal background
          boxShadow: 24,
          p: 4,
          borderRadius: "12px",
          outline: "none",
          height: "auto", // Adjust height dynamically
          zIndex: 1300,
        }}
      >
        {/* Close Button */}
        <button
          className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-300'
          onClick={closeModal}
        >
          ✕
        </button>

        {/* Login/Signup Title */}
        <div className='text-center mb-6'>
          <p className='text-2xl font-bold text-gray-800'>
            {isSignup ? "Sign Up" : "Login"}
          </p>
        </div>

        {/* Form Fields */}
        <form className='notebook-style space-y-4'>
          <TextField
            label='Email'
            type='email'
            variant='outlined'
            fullWidth
            className='mb-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
          />
          <TextField
            label='Password'
            type='password'
            variant='outlined'
            fullWidth
            className='mb-4'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
          />

          <Button
            variant='contained'
            fullWidth
            sx={{
              backgroundColor: "#7D9BF8",
              "&:hover": { backgroundColor: "#406EFF" },
              mb: 2,
            }}
            onClick={handleAuth}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            className='py-2'
            onClick={() => navigate("/signup")}
            sx={{
              backgroundColor: "#7D9BF8",
              "&:hover": { backgroundColor: "#406EFF" },
            }}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Don’t have an account? Sign Up"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;
