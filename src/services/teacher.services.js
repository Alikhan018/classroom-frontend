import axios from "axios";

export default class TeacherServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async getAll(studentId) {
    try {
      const response = await axios.get(`${this.baseUrl}/teachers`, {
        params: {
          studentId: studentId,
        },
      });
      return response.data.data;
    } catch (err) {}
  }
  async getAllAdmin() {
    try {
      const response = await axios.get(`${this.baseUrl}/teachers/admin`);
      return response.data.data;
    } catch (err) {}
  }
  async update(formData, id) {
    try {
      await axios.put(`${this.baseUrl}/teachers/update/${id}`, {
        name: formData.name,
        address: formData.address,
      });
    } catch (err) {
      console.log(err);
    }
  }
  match(string, stringTwo) {
    return string === stringTwo;
  }
  async create({ email, password, confirm_password, name, address }) {
    try {
      if (!this.match(password, confirm_password)) {
        return;
      }
      await axios.post(`${this.baseUrl}/teachers/create`, {
        email,
        password,
        name,
        address,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
