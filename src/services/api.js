import axios from "axios";

const API_URL = "/items"; // Assuming your endpoint is /items

export const getData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateItem = async (id, updatedItem) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem);
  return response.data;
};

export const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
