import axios from "axios";
import { BASE_URL } from "./constant";

export const getTodoList = async () => {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (err) {
    return Promise.reject(err.response);
  }
};

export const postTodo = async (todo) => {
  try {
    const { data } = await axios.post(BASE_URL, {
      text: todo,
      isCompleted: false,
    });
    return data;
  } catch (err) {
    alert(err.response.statusText);
    return Promise.reject(err.response);
  }
};

export const updateTodo = async (todo) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/${todo.id}`, {
      ...todo,
    });
    return data;
  } catch (err) {
    alert(err.response.statusText);
    return Promise.reject(err.response);
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (err) {
    alert(err.response.statusText);
    return Promise.reject(err.response);
  }
};
