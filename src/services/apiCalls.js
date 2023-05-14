
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

export const getDetailedAppointment = async (credentials,data) => {

    const config = {
        headers: { 
          'Authorization': 'Bearer '+ credentials.bearer,  
        }
    };
    
    return await axios.get(`http://localhost:5690/appointment/${data._id}`, config)
}

export const deleteAppointment = async (id,credentials) => {
    
    const config = {
        headers: { 
          'Authorization': 'Bearer '+ credentials.bearer,  
        }
    };
    return await axios.delete(`http://localhost:5690/appointment/${id}`, config)
}

export const editAppointment = async (credentials, data, body) => {
    const config = {
        headers: { 
          'Authorization': 'Bearer ' + credentials.bearer,  
        }
    };
    return await axios.put(`http://localhost:5690/appointment/${data._id}`, body, config)
};