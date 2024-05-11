import axios from "axios";

const BASE_URL = "http://192.168.96.46:5000";

export const systemTurnOn = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/start_prediction`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const systemTurnOff = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/stop_prediction`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const turnNightModeOn = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/night_mode`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const turnDayModeOn = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/day_mode`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const caliberate = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/caliberate`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
