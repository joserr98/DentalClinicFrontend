import axios from "axios";

// Users API Calls
export const loginMe = async (credentials) => {
  return await axios.post("http://localhost:5690/user/log", credentials);
};

export const getUserProfile = async (credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };

  return await axios.get(
    `http://localhost:5690/user/${credentials.token.id}`,
    config
  );
};

export const createUser = async (credentials) => {
  credentials.role = "client";
  console.log(credentials);
  return await axios.post(`http://localhost:5690/user`, credentials);
};

export const getDentists = async () => {
  return await axios.get(`http://localhost:5690/user/dentists`);
};

export const getClients = async () => {
  return await axios.get(`http://localhost:5690/user/clients`);
};

// Appointments API Calls
export const getUserAppointments = async (credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };

  return await axios.get(`http://localhost:5690/appointment/`, config);
};

export const getDetailedAppointment = async (credentials, data) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };

  return await axios.get(
    `http://localhost:5690/appointment/${data._id}`,
    config
  );
};

export const deleteAppointment = async (id, credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  return await axios.delete(`http://localhost:5690/appointment/${id}`, config);
};

export const editAppointment = async (credentials, data, body) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  return await axios.put(
    `http://localhost:5690/appointment/${data._id}`,
    body,
    config
  );
};

export const createAppointment = async (credentials, body) => {
    console.log(credentials)
  if (credentials.token.role === "client") {
    body.client = credentials.token.id;
  }
  if (credentials.token.role === "dentist") {
    body.dentist = credentials.token.id;
  }
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  
  return await axios.post(`http://localhost:5690/appointment`, body, config);
};

// Treatments API Calls
export const listTreatment = async () => {
  return await axios.get(`http://localhost:5690/treatment`);
};

export const createTreatment = async (credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  return await axios.post(`http://localhost:5690/treatment`, credentials);
};

export const deleteTreatment = async (credentials, id) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.bearer,
    },
  };
  return await axios.delete(
    `http://localhost:5690/treatment/${id}`,
    credentials
  );
};
