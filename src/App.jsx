import { Route, Routes } from 'react-router-dom'
import ChallengeDay from './pages/ChallengeDay.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Landing from './pages/Landing.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/day/:dayNumber" element={<ChallengeDay />} />
    </Routes>
  )
}

export default App
