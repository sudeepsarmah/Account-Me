// important components:
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
// pages:
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SignUp from './pages/SignUp'
import InvitePage from './pages/InvitePage'
import PartnerDashboard from './pages/PartnerDashboard'
import LandingPage from './pages/LandingPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Documentation from './pages/Documentation'
// css stylesheets:
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className='flex-1'>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/documentation' element={<Documentation />} />
              <Route path='/dashboard'
                element={<ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>} />
              <Route path='/invite/:code' element={<InvitePage />} />
              <Route path='/partner-dashboard' element={<PartnerDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
