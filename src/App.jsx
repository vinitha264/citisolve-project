import React from 'react'
import{ BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ComplaintForm from './Components/ComplaintForm'
import { AuthProvider } from './Context/AuthContext'
import MyComplaint from './Components/MyComplaint'

const App = () => {
  return (
    <>
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/complaintform'} element={<ComplaintForm/>}></Route>
        <Route path={'/my-complaint'} element={<MyComplaint/>}></Route>
      </Routes>
      </AuthProvider>
    </>
  )
}

export default App