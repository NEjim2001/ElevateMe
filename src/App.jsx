import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import SignUp from "./routes/SignUp";
import Forum from "./routes/Forum";
import Meditation from "./routes/Meditation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/meditation' element={<Meditation />} />
      </Routes>
    </Router>
  );
}
export default App;
