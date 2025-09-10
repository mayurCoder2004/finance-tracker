import axios from "axios";

const BASE = import.meta.env.VITE_API_URL;

export const getTransactions = (filters) =>
  axios.get(BASE, { params: filters }).then((r) => r.data);

export const getTransaction = (id) =>
  axios.get(`${BASE}/${id}`).then((r) => r.data);

export const createTransaction = (data) =>
  axios.post(BASE, data).then((r) => r.data);

export const updateTransaction = (id, data) =>
  axios.put(`${BASE}/${id}`, data).then((r) => r.data);

export const deleteTransaction = (id) =>
  axios.delete(`${BASE}/${id}`).then((r) => r.data);
