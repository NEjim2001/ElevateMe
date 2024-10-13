import React, { useState } from "react";
import { TextField, Button, MenuItem, Slider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    occupation: "",
    hobbies: "",
    fitnessLevel: "",
    reason: "",
    feelingFrequency: 1,
    isolationFrequency: 1,
    sleepQuality: 1,
    exhaustionFrequency: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSliderChange = (name) => (event, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(setUser(userCredential.user));
    navigate.apply("/dashboard");
    console.log(formData);
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-primary to-secondary flex items-center justify-center w-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2'>
        <h2 className='text-3xl font-bold text-black text-center mb-4'>
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className='space-y-4'>
              <TextField
                fullWidth
                label='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                variant='outlined'
                required
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              />
              <TextField
                fullWidth
                label='Username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                variant='outlined'
                required
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              />
              <TextField
                fullWidth
                label='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                variant='outlined'
                type='email'
                required
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              />
              <TextField
                fullWidth
                label='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                variant='outlined'
                type='password'
                required
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              />
              <div className='text-right'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={nextStep}
                  sx={{ backgroundColor: "#406EFF", width: "100%" }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className='space-y-4'>
              <TextField
                fullWidth
                label='Age'
                name='age'
                value={formData.age}
                onChange={handleChange}
                variant='outlined'
                type='number'
                required
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              />
              <TextField
                fullWidth
                label='Gender'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                variant='outlined'
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              >
                <MenuItem value=''>Select...</MenuItem>
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
                <MenuItem value='Non-binary'>Non-binary</MenuItem>
                <MenuItem value='Prefer not to say'>Prefer not to say</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label='Occupation'
                name='occupation'
                value={formData.occupation}
                onChange={handleChange}
                variant='outlined'
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              />
              <TextField
                fullWidth
                label='Hobbies'
                name='hobbies'
                value={formData.hobbies}
                onChange={handleChange}
                variant='outlined'
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              />
              <TextField
                fullWidth
                label='Fitness Level'
                name='fitnessLevel'
                value={formData.fitnessLevel}
                onChange={handleChange}
                variant='outlined'
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              />
              <div className='flex justify-between'>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={prevStep}
                  sx={{ width: "48%", backgroundColor: "#f57c00" }}
                >
                  Previous
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={nextStep}
                  sx={{ width: "48%", backgroundColor: "#406EFF" }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='space-y-4'>
              <TextField
                fullWidth
                label='Why are you currently here today?'
                name='reason'
                value={formData.reason}
                onChange={handleChange}
                variant='outlined'
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  marginBottom: 2,
                }}
              >
                <MenuItem value=''>Select...</MenuItem>
                <MenuItem value='Depression'>Depression</MenuItem>
                <MenuItem value='Anxiety'>Anxiety</MenuItem>
                <MenuItem value='Stress'>Stress</MenuItem>
                <MenuItem value='Loneliness'>Loneliness</MenuItem>
                <MenuItem value='Burnout'>Burnout</MenuItem>
              </TextField>

              {/* Feeling Frequency */}
              <div>
                <label className='block text-gray-700 mb-2'>
                  How often do you experience this feeling?
                </label>
                <Slider
                  name='feelingFrequency'
                  value={formData.feelingFrequency}
                  onChange={handleSliderChange("feelingFrequency")}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay='auto'
                />
              </div>

              {/* Isolation Frequency */}
              <div>
                <label className='block text-gray-700 mb-2'>
                  How often do you feel isolated or disconnected?
                </label>
                <Slider
                  name='isolationFrequency'
                  value={formData.isolationFrequency}
                  onChange={handleSliderChange("isolationFrequency")}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay='auto'
                />
              </div>

              {/* Sleep Quality */}
              <div>
                <label className='block text-gray-700 mb-2'>
                  How well have you been sleeping lately?
                </label>
                <Slider
                  name='sleepQuality'
                  value={formData.sleepQuality}
                  onChange={handleSliderChange("sleepQuality")}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay='auto'
                />
              </div>

              {/* Exhaustion Frequency */}
              <div>
                <label className='block text-gray-700 mb-2'>
                  How often do you feel exhausted or mentally drained?
                </label>
                <Slider
                  name='exhaustionFrequency'
                  value={formData.exhaustionFrequency}
                  onChange={handleSliderChange("exhaustionFrequency")}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  valueLabelDisplay='auto'
                />
              </div>

              <div className='flex justify-between'>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={prevStep}
                  sx={{ width: "48%", backgroundColor: "#f57c00" }}
                >
                  Previous
                </Button>
                <Button
                  variant='contained'
                  color='success'
                  type='submit'
                  sx={{ width: "48%", backgroundColor: "#388e3c" }}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
