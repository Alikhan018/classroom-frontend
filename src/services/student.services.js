import axios from "axios";

export default class StudentServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async getAll() {
    try {
      const response = await axios.get(`${this.baseUrl}/students`);
      return response.data.data;
    } catch (err) {}
  }
  async updateGrade(grade) {
    
  }
}
