
import axios from 'axios';

export const loginMe = async (credentials) => {
    return await axios.post("http://localhost:5690/user/log", credentials)
}

export const getUserProfile = async (credentials) => {
    const config = {
        headers: { 
          'Authorization': 'Bearer '+ credentials.bearer,  
        }
    };

    return await axios.get(`http://localhost:5690/user/${credentials.token.id}`, config)
}

export const getUserAppointments = async (credentials) => {
    const config = {
        headers: { 
          'Authorization': 'Bearer '+ credentials.bearer,  
        }
    };
    
    return await axios.get(`http://localhost:5690/appointment/`, config)
}

export const deleteAppointment = async (id,credentials) => {
    
    const config = {
        headers: { 
          'Authorization': 'Bearer '+ credentials.bearer,  
        }
    };
    return await axios.delete(`http://localhost:5690/appointment/${id}`, config)
}