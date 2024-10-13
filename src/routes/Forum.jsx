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
    {
      category: "General Discussion",
      title: "Welcome to the forum!",
      content: "Introduce yourself to the community.",
      author: "Admin",
    },
    {
      category: "Mental Health",
      title: "Dealing with Anxiety",
      content: "How do you cope with anxiety on a daily basis?",
      author: "User123",
    },
    {
      category: "Fitness",
      title: "Best exercises for reducing stress",
      content: "What are your go-to exercises when you feel stressed?",
      author: "FitLife",
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
