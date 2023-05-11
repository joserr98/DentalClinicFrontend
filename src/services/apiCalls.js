
import axios from 'axios';

export const loginMe = async (credentials) => {
    return await axios.post("https://dentalclinicbackend-production-7c9a.up.railway.app/user/log", credentials)
}
