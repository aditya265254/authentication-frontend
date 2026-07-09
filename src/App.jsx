import React, { Children } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AdminDashbord from './pages/AdminDashbord'

const ProtectedAdminRoute =  ({ Children }) => {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  if (!token || role !== "admin") {
    return <Navigate to='/' replace />
  }
  return Children
 
}

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<Dashboard/>} />

      <Route 
          path='/admin/dashboard' 
          element={
            <ProtectedAdminRoute>
              <AdminDashbord />
            </ProtectedAdminRoute>
          } 
        />
    </Routes>
    </BrowserRouter>
  )
}

export default App