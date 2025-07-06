import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/welcome';
import ProtectedRoute from './component/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import ChartHistory from './pages/ChartHistory';


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/upload' element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>} />
        <Route path='/history' element={
          <ProtectedRoute>
            <ChartHistory />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
