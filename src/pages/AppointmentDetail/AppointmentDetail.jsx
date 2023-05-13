import React, {useState, useEffect} from 'react'
import './AppointmentDetail.css'
import { getDetailedAppointment } from '../../services/apiCalls'
import { useSelector } from "react-redux";
import { userData } from "../userSlice.js";
import { detailData } from '../detailSlice';

export const AppointmentDetail = () => {

    const userDataRdx = useSelector(userData)
    const detailDataRdx = useSelector(detailData)
    const [detailedAppointment, setDetailedAppointment] = useState([]);

    useEffect(()=>{
      getDetailedAppointment(userDataRdx.credentials,detailDataRdx.data)
      .then((results) => {
        setDetailedAppointment(results.data.appointment);
      })
      .catch((err) => console.error(err));
    },[])

    return (
      Object.keys(detailedAppointment).length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className='detailDesign'>
          <div>{detailedAppointment.start_date}</div>  
          <div>{detailedAppointment.end_date}</div> 
          <div>{detailedAppointment.type.treatment}</div>
          <div>{detailedAppointment.dentist.name}</div>
          <div>{detailedAppointment.dentist.lastname}</div> 
          <div>{detailedAppointment.client.name}</div>
          <div>{detailedAppointment.client.lastname}</div>
        </div>
      )
    );
}
