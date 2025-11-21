import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from '@/components/Header'
import Employees from '@/pages/Employees'
import Home from '@/pages/Home'
import Jobs from "@/pages/Jobs";
import Schedule from "@/pages/Schedule";
function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  )
}

export default App
