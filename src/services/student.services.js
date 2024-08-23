import axios from "axios";

export default class StudentServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async getAll(teacherId) {
    try {
      const response = await axios.get(`${this.baseUrl}/students`, {
        params: {
          teacherId,
        },
      });
      return response.data.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  async getAllAdmin() {
    try {
      const response = await axios.get(`${this.baseUrl}/students/admin`);
      return response.data.data;
    } catch (err) {}
  }
  async updateGrade(grade, id) {
    try {
      await axios.put(`${this.baseUrl}/students/${id}/update-grade`, {
        grade: grade.grade,
      });
    } catch (err) {
      console.log(err);
    }
  }
  match(string, stringTwo) {
    return string === stringTwo;
  }
  async create({ email, password, confirm_password, name, age, address }) {
    try {
      if (!this.match(password, confirm_password)) {
        return;
      }
      await axios.post(`${this.baseUrl}/students/create`, {
        email,
        password,
        name,
        age,
        address,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
