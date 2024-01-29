import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Table from '../pages/table/Table'
import Login from '../pages/login/Login'
import Information from '../pages/register/Information'
import UserRegister from '../pages/register/UserRegister'
const MainRouter = () => {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Home/>} />
        <Route path='/table' element={<Table/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<UserRegister/>} />
        <Route path='/infor' element={<Information/>} />
      </Route>
    </Routes>
  )
}

export default MainRouter