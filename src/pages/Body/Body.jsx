import React from 'react'
import './Body.css'
import {Route, Routes} from "react-router-dom"
import {Home} from "../Home/Home"
import {Login} from "../Login/Login"
import {Register} from "../Register/Register"
import { Profile } from '../Profile/Profile'
import { Appointment } from '../Appointment/Appointment'
import { AppointmentDetail } from '../AppointmentDetail/AppointmentDetail'
import { AppointmentEdit } from '../AppointmentEdit/AppointmentEdit'
import { AppointmentNew } from '../AppointmentNew/AppointmentNew'
import { ProfileEdit } from '../ProfileEdit/ProfileEdit'
import { Admin } from '../Admin/Admin'

export const Body = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/appointments" element={<Appointment/>} />
        <Route path="/appointment_detail" element={<AppointmentDetail/>} />
        <Route path="/appointment_edit" element={<AppointmentEdit/>} />
        <Route path="/appointment_new" element={<AppointmentNew/>} />
        <Route path="/appointment_new" element={<ProfileEdit/>} />
        <Route path="/admin" element={<Admin/>} />
    </Routes>
  )
}
