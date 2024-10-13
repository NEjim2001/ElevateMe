import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setUser, setUserLoading } from "../redux/slices/user";
import { auth } from "../config/firebase";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";

// Make sure to register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    dispatch(setUserLoading(true));
    try {
      let userCredential;
      if (isSignup) {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
      dispatch(setUser(userCredential.user));
      navigate("/dashboard");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Authentication error:", error.message);
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  // Chart Data
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Anxiety",
        data: [2, 3, 2.5, 4, 3.8, 5, 3, 4.2, 3.6, 3.5, 3.9, 4.5],
        borderColor: "rgba(125, 155, 248, 1)", // Primary
        backgroundColor: "rgba(125, 155, 248, 0.3)", // Primary with 30% opacity
        fill: true,
        tension: 0.4,
      },
      {
        label: "Stress",
        data: [1.5, 2, 3, 3.5, 4, 3.6, 4.2, 3.8, 4.1, 3.7, 3.5, 4.9],
        borderColor: "rgba(64, 110, 255, 1)", // Secondary
        backgroundColor: "rgba(64, 110, 255, 0.3)", // Secondary with 30% opacity
        fill: true,
        tension: 0.4,
      },
      {
        label: "Burnout",
        data: [1.2, 2.8, 3.1, 3.4, 3.6, 4.0, 3.9, 4.1, 3.8, 4.3, 4.6, 4.8],
        borderColor: "rgba(151, 200, 194, 1)", // Tertiary
        backgroundColor: "rgba(151, 200, 194, 0.3)", // Tertiary with 30% opacity
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Mood Tracker (Anxiety vs. Stress)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Severity",
        },
      },
    },
  };

  return (
    <div className='w-screen min-h-screen bg-gradient-to-r from-tertiary to-blue-600 flex flex-col justify-between '>
      {/* Header */}
      <header className='bg-white bg-opacity-10 backdrop-blur-md py-4 mb-8'>
        <div className='container mx-auto px-4 flex justify-between items-center'>
          <h1 className='text-3xl text-white font-bold'>ElevateMe</h1>
          <nav>
            <ul className='flex space-x-6'>
              <li>
                <a href='#features' className='text-white hover:underline'>
                  Features
                </a>
              </li>
              <li>
                <a href='#about' className='text-white hover:underline'>
                  About Us
                </a>
              </li>
              <li>
                <a href='#contact' className='text-white hover:underline'>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Body */}
      <main className='h-full'>
        <div className='flex flex-col md:flex-row justify-between space-y-10 md:space-y-0 md:space-x-8 h-full mx-10 items-center'>
          {/* Hero Section */}
          <div className='text-center md:text-left py-16 mx-16 rounded-lg w-full md:w-1/2 p-8 h-full'>
            <h1 className='text-4xl font-bold text-white mb-4'>
              Your Personalized Path to Mental Wellness
            </h1>
            <p className='text-lg text-white mb-6'>
              Start your mental health journey today with ElevateMe.
            </p>
            <button
              className='bg-white text-primary font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition'
              onClick={() => setIsModalOpen(true)} // Open modal
            >
              Begin Your Journey
            </button>
          </div>

          {/* Global Mental Health Data Section (Chart) */}
          <div className='p-8 rounded-lg w-full md:w-1/2 text-center h-full'>
            <p className='text-2xl font-bold text-white mb-4'>
              Global Mental Health Trends
            </p>
            <p className='text-lg text-white mb-6'>
              Visualizing the rise in Anxiety and Stress over the year.
            </p>
            <div className='bg-white bg-opacity-30 rounded-lg shadow-lg h-full flex items-center justify-center p-5'>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        id='features'
        className='py-16 text-white bg-white bg-opacity-10'
      >
        <p className='text-4xl font-bold mb-12 text-center'>Our Features</p>

        {/* Journal Feature */}
        <div className='flex flex-col items-center mb-12'>
          <img
            src='/image/journal-icon.svg'
            alt='Journal Icon'
            className='w-16 h-16 mb-4'
          />
          <h3 className='text-3xl font-semibold mb-4'>Personal Journal</h3>
          <p className='text-lg text-center w-4/5'>
            Keep a personal log of your thoughts, feelings, and progress. Use
            the journal feature to reflect on your mental health journey, track
            moods, and set goals. ElevateMe's journal feature makes it easy to
            see your growth and identify patterns in your well-being.
          </p>
        </div>

        {/* Forum Feature */}
        <div className='flex flex-col items-center mb-12'>
          <img
            src='/image/forum-icon.svg'
            alt='Forum Icon'
            className='w-16 h-16 mb-4'
          />
          <h3 className='text-3xl font-semibold mb-4'>Community Forum</h3>
          <p className='text-lg text-center w-4/5'>
            Join a supportive community where you can share experiences, ask
            questions, and connect with others. The forum feature offers a safe
            space to talk about mental health topics and gain valuable insights
            from others on similar journeys.
          </p>
        </div>

        {/* Meditation Feature */}
        <div className='flex flex-col items-center'>
          <img
            src='/image/meditation-icon.svg'
            alt='Meditation Icon'
            className='w-16 h-16 mb-4'
          />
          <h3 className='text-3xl font-semibold mb-4'>Guided Meditation</h3>
          <p className='text-lg text-center w-4/5'>
            Relax and rejuvenate with our guided meditation sessions. Whether
            you're new to meditation or experienced, this feature helps you calm
            your mind, reduce stress, and improve mindfulness. With various
            sessions available, you'll find the perfect meditation to fit your
            needs.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className='backdrop-blur-md py-4 mt-8 mb-8'>
        <div className='container mx-auto px-4 text-center text-white'>
          <p>&copy; 2024 ElevateMe. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal for Login/Signup */}
      {isModalOpen && (
        <LoginModal isModalOpen={isModalOpen} closeModal={setIsModalOpen} />
      )}
    </div>
  );
};

export default Home;
