import axios from "axios";

export default class IndexServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async count(ent, id) {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.get(`${this.baseUrl}/${ent}/count`, {
        params: {
          id,
        },
      });
      return response.data.count;
    } catch (err) {
      console.log(err);
    }
  }
}
