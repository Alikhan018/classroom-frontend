import axios from "axios";

export default class FeatureServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async getAll() {
    const features = await axios.get(`${this.baseUrl}/features`);
    return features.data.data;
  }
}
