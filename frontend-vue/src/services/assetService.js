import axios from "axios";

const API = "http://localhost:3000/asset";

export default {
  getAll() {
    return axios.get(API);
  },
  create(data) {
    return axios.post(API, data);
  },
  update(id, data) {
    return axios.put(`${API}/${id}`, data);
  },
  delete(id) {
    return axios.delete(`${API}/${id}`);
  }
};
