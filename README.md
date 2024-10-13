# Elevate Me

### _Your Personalized Path to Mental Wellness_

Elevate Me is a mental health app designed to provide **personalized mental wellness assistance**. The app enables users to track their mental health journey, rate their emotional state, and receive personalized suggestions based on their profile.

## 🧠 Project Overview

Elevate Me empowers individuals to manage their mental well-being by offering:

- A simple **rating system** to evaluate how much help they might need.
- Personalized suggestions for improving mental health.
- A dashboard where users can view their progress over time.

## ✨ Features

- **Personalized User Profiles**:
  - Name
  - Age
  - Gender
  - Occupation
- **Mental Health Ratings**:
  - Users can rate their current emotional state on a scale from 1 to 10.
- **AI-Powered Recommendations**:
  - Based on the user’s ratings, Elevate Me offers suggestions for improvement.
- **Mental Health Tracking**:
  - Users can track their mental health progress over time.
- **Secure User Sign-up**:
  - Firebase Authentication is used for secure user login and registration.

## 🚀 Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask
- **Database**: MongoDB for storing AI chatbot conversations, Firebase for user authentication
- **AI**: AI-based recommendations system
- **Hosting**: Netlify (Frontend), Flask API (Backend)

## 💡 How It Works

1. **User Sign-Up**: Users create an account using their email via Firebase Authentication.
2. **Profile Creation**: Users fill in basic details like name, age, gender, and occupation.
3. **Daily Ratings**: Users rate their emotional state from 1 to 10 on the dashboard.
4. **Personalized Suggestions**: Based on the rating, the app provides personalized wellness suggestions.
5. **Progress Tracking**: Users can track their mental health progress over time through the dashboard.

## 🛠 Installation

To run this project locally, follow these steps:

### Frontend (React):

1. Clone the repository:
   ```bash
   git clone https://github.com/username/ElevateMe-frontend.git
   cd ElevateMe-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Backend (Flask):

1. Clone the repository:
   ```bash
   git clone https://github.com/username/ElevateMe-backend.git
   cd ElevateMe-backend
   ```
2. Set up a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```
3. Run the Flask app:
   ```bash
   flask run
   ```

### MongoDB Setup:

1. Ensure MongoDB is running locally or configure it with your MongoDB Atlas connection string.
2. Update the MongoDB connection string in the backend's configuration file.

## 🎯 Future Enhancements

- **Mood Journaling**: A feature where users can write journal entries to accompany their mental health ratings.
- **Community Support**: A section where users can connect and share their mental wellness journeys.
- **Advanced AI**: More sophisticated AI suggestions based on deeper analysis of user data.

## 🙌 Contributions

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Tagline**: _"Elevate Me - Your Personalized Path to Mental Wellness"_
