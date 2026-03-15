import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProtectedRoute from './component/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import MoneyTransfer from './pages/MoneyTransfer'
import AccountStatement from './pages/AccountStatement'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>

          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }/>

          <Route path='/money-transfer' element={
            <ProtectedRoute>
              <MoneyTransfer/>
            </ProtectedRoute>
          }/>

          <Route path='/account-statement' element={
            <ProtectedRoute>
              <AccountStatement/>
            </ProtectedRoute>
          }/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
