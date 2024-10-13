import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const Forum = () => {
  const [activeCategory, setActiveCategory] = useState("General Discussion");

  const categories = [
    "General Discussion",
    "Mental Health",
    "Fitness",
    "Hobbies",
    "Stress Management",
  ];

  const posts = [
    // General Discussion Posts
    {
      category: "General Discussion",
      title: "Welcome to the forum!",
      content: "Introduce yourself to the community.",
      author: "Admin",
    },
    {
      category: "General Discussion",
      title: "Favorite Pokémon?",
      content: "What is everyone's favorite Pokémon and why?",
      author: "PokéFan2024",
    },
    {
      category: "General Discussion",
      title: "Upcoming Game Releases",
      content: "What games are you excited for this year?",
      author: "GamerGirl",
    },

    // Mental Health Posts
    {
      category: "Mental Health",
      title: "Dealing with Anxiety",
      content: "How do you cope with anxiety on a daily basis?",
      author: "User123",
    },
    {
      category: "Mental Health",
      title: "Mental Health Resources",
      content:
        "Are there any free or affordable mental health resources available?",
      author: "HealthGuru",
    },
    {
      category: "Mental Health",
      title: "Mindfulness Tips",
      content:
        "I've been practicing mindfulness recently. Does anyone have any tips?",
      author: "PeacefulMind",
    },

    // Fitness Posts
    {
      category: "Fitness",
      title: "Best exercises for reducing stress",
      content: "What are your go-to exercises when you feel stressed?",
      author: "FitLife",
    },
    {
      category: "Fitness",
      title: "Running vs. Weightlifting",
      content:
        "What are the pros and cons of running versus weightlifting for fitness?",
      author: "GymRat",
    },
    {
      category: "Fitness",
      title: "Home Workouts",
      content:
        "What are the best home workouts for staying in shape without equipment?",
      author: "NoGymNoProblem",
    },

    // Hobbies Posts
    {
      category: "Hobbies",
      title: "Photography Tips",
      content:
        "Does anyone have tips for beginners in photography? I'm just getting started.",
      author: "ShutterBug",
    },
    {
      category: "Hobbies",
      title: "Favorite Hobbies During the Pandemic",
      content:
        "What new hobbies have you picked up during the pandemic? I've been learning to knit!",
      author: "CraftyGirl",
    },
    {
      category: "Hobbies",
      title: "Learning a Musical Instrument",
      content:
        "I recently started learning the guitar. What tips do you have for beginners?",
      author: "StrumMaster",
    },

    // Stress Management Posts
    {
      category: "Stress Management",
      title: "Meditation for Stress Relief",
      content:
        "Has anyone tried meditation to relieve stress? How did it work for you?",
      author: "ZenMaster",
    },
    {
      category: "Stress Management",
      title: "Work-Life Balance",
      content:
        "How do you balance work and life responsibilities to manage stress?",
      author: "BusyBee",
    },
    {
      category: "Stress Management",
      title: "Breathing Exercises",
      content:
        "I've heard breathing exercises can help reduce stress. What techniques do you recommend?",
      author: "CalmBreath",
    },
  ];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #7D9BF8, #406EFF)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: 4,
          boxShadow: 3,
          padding: 4,
          width: { xs: "100%", md: "66%", lg: "50%" },
        }}
      >
        {/* Category Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
            gap: 2,
          }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "contained" : "outlined"}
              sx={{
                borderRadius: 20,
                backgroundColor:
                  activeCategory === category ? "#406EFF" : "white",
                color: activeCategory === category ? "white" : "#7D9BF8",
                "&:hover": {
                  backgroundColor:
                    activeCategory === category ? "#305bc1" : "#e0e0e0",
                },
                px: 4,
              }}
            >
              {category}
            </Button>
          ))}
        </Box>

        {/* Post Content */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: 3,
            padding: 3,
            mb: 4,
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          {posts
            .filter((post) => post.category === activeCategory)
            .map((post, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  padding: 3,
                  boxShadow: 1,
                  mb: 3,
                }}
              >
                <Typography variant='h6' color='primary' gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant='body1' color='textPrimary'>
                  {post.content}
                </Typography>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  display='block'
                  mt={2}
                >
                  Posted by: {post.author}
                </Typography>
              </Box>
            ))}
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            variant='contained'
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#7D9BF8",
              "&:hover": { backgroundColor: "#406EFF" },
            }}
          >
            <ArrowLeftIcon sx={{ mr: 1 }} />
            Previous
          </Button>
          <Button
            variant='contained'
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#7D9BF8",
              "&:hover": { backgroundColor: "#406EFF" },
            }}
          >
            Next
            <ArrowRightIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Forum;
