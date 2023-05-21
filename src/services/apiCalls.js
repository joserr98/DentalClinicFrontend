import axios from "axios";

const url = "http://localhost:5690"

// Users API Calls
export const loginMe = async (credentials) => {
  return await axios.post(`${url}/user/log`, credentials);
};

export const getUsers = async (credentials, query) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
    params:{
      name: query
    }
  };

  return await axios.get(`${url}/user/`, config);
};

export const getUserProfile = async (credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };

  return await axios.get(
    `${url}/user/${credentials.token.id}`,
    config
  );
};

export const createUser = async (credentials) => {
  credentials.role = "client";
  return await axios.post(`${url}/user`, credentials);
};

export const editUser = async (credentials, user, body) => {

  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    }
  }
  return await axios.put(`${url}/user/${user._id}`, body, config);
};

export const deleteUser = async (credentials, user) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    }
  }
  return await axios.delete(`${url}/user/${user}`, config);
};

export const getDentists = async () => {
  return await axios.get(`${url}/user/dentists`);
};

export const getClients = async () => {
  return await axios.get(`${url}/user/clients`);
};

// Appointments API Calls
export const getUserAppointments = async (credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };

  return await axios.get(`${url}/appointment/`, config);
};

export const getDetailedAppointment = async (credentials, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  
  return await axios.get(
    `${url}/appointment/${data._id}`,
    config
  )
};

export const deleteAppointment = async (id, credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  return await axios.delete(`${url}/appointment/${id}`, config);
};

export const editAppointment = async (credentials, data, body) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  return await axios.put(
    `${url}/appointment/${data._id}`,
    body,
    config
  );
};

export const createAppointment = async (credentials, body) => {

  if (credentials.token.role === "client") {
    body.client = credentials.token.id;
  }
  if (credentials.token.role === "dentist") {
    body.dentist = credentials.token.id;
  }

  if(!body.client || !body.dentist || !body.start_date || !body.end_date){
    throw new Error ('UNCOMPLETED_FORM')
  }

  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  
  return await axios.post(`${url}/appointment`, body, config);
};

// Treatments API Calls
export const listTreatment = async () => {
  return await axios.get(`${url}/treatment`);
};

export const createTreatment = async (credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  return await axios.post(`${url}/treatment`, credentials);
};

export const deleteTreatment = async (credentials, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  return await axios.delete(
    `${url}/treatment/${id}`,
    credentials
  );
};
