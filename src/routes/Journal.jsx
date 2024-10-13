import React, { useState } from "react";
import { TextField, Button, Modal, Box } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const Journal = ({ handleJournalToggle, isOpen }) => {
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [entries, setEntries] = useState([]);
  const [viewEntries, setViewEntries] = useState(false);
  const user = useSelector((state) => state.user.uid);

  const fetchJournalEntries = async () => {
    try {
      const response = await axios.get(
        `https://uta-flask-website.vercel.app/api/journal/fetchEntries`,
        {
          headers: {
            Authorization: user,
          },
        }
      );
      setEntries(response.data);
      console.log("Get Journal Entries", response.status, response.data);
    } catch (error) {
      console.error("Error fetching journal entries", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const addJournalEntry = async (newEntry) => {
    try {
      const response = await axios.post(
        `https://uta-flask-website.vercel.app/api/journal/addEntry`,
        newEntry,
        {
          headers: {
            Authorization: user,
          },
        }
      );
      console.log("Add Journal Entry", response.status, response.data);
    } catch (error) {
      console.error("Error adding journal entry", error);
    }
  };

  const handleEntrySubmit = (e) => {
    e.preventDefault();
    const newEntry = { text, location, image, date: new Date() };
    addJournalEntry(newEntry);
    setEntries([newEntry, ...entries]);
    setText("");
    setLocation("");
    setImage(null);
  };

  return (
    <Modal open={isOpen} onClose={handleJournalToggle}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          bgcolor: "#f4f4f9",
          boxShadow: 24,
          p: 4,
          borderRadius: "12px",
          outline: "none",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 1300,
        }}
      >
        {/* Sliding Toggle */}
        <div className='flex items-center justify-between mb-6 space-x-4'>
          <button
            className={`w-full py-2 px-4 text-sm font-semibold transition-all duration-300 rounded-full ${
              !viewEntries
                ? "bg-gradient-to-r from-primary to-secondary shadow"
                : "bg-gray-200"
            }`}
            onClick={() => setViewEntries(false)}
          >
            New Entry
          </button>
          <button
            className={`w-full py-2 px-4 text-sm font-semibold transition-all duration-300 rounded-full ${
              viewEntries
                ? "bg-gradient-to-r from-primary to-secondary shadow"
                : "bg-gray-200"
            }`}
            onClick={() => setViewEntries(true)}
          >
            Entries
          </button>
        </div>

        {/* Dynamic Content Based on Toggle */}
        {viewEntries ? (
          <div
            className='notebook-entries overflow-y-auto flex-grow'
            style={{ maxHeight: "60%", marginBottom: "1rem" }}
          >
            {entries.length === 0 ? (
              <p className='text-gray-600'>No entries yet.</p>
            ) : (
              entries.map((entry, index) => (
                <div
                  key={index}
                  className='bg-white shadow-lg rounded-lg p-6 mb-4 border relative'
                >
                  <button className='absolute top-2 right-2 text-white transition-colors duration-300 bg-red-600 cursor-pointer'>
                    X
                  </button>
                  <p className='text-gray-600 mb-2'>
                    {entry.date.toLocaleString()}
                  </p>
                  <p className='mb-2'>{entry.text}</p>
                  {entry.location && (
                    <p className='text-gray-600 mb-2'>📍 {entry.location}</p>
                  )}
                  {entry.image && (
                    <img
                      src={entry.image}
                      alt='Journal Entry'
                      className='w-full h-64 object-cover rounded-lg mb-2'
                    />
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <form
            onSubmit={handleEntrySubmit}
            className='notebook-style flex flex-col justify-between flex-grow'
            style={{ maxHeight: "80%" }}
          >
            <TextField
              label='Write your thoughts...'
              multiline
              rows={4}
              variant='outlined'
              fullWidth
              className='mb-4'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
            />
            <TextField
              label='Enter location (optional)'
              variant='outlined'
              fullWidth
              className='mb-4'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
            />
            {image ? (
              <div className='flex flex-row items-start justify-start text-center'>
                <input
                  type='file'
                  disabled={true}
                  accept='image/*'
                  className='mb-4 cursor-not-allowed opacity-50'
                  onChange={handleImageChange}
                />
                <p className='text-md text-black ml-4'>Image attached</p>
              </div>
            ) : (
              <input
                type='file'
                accept='image/*'
                className='mb-4'
                onChange={handleImageChange}
              />
            )}

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              className='py-2'
              sx={{
                backgroundColor: "#7D9BF8",
                "&:hover": { backgroundColor: "#406EFF" },
              }}
            >
              Save Entry
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default Journal;
