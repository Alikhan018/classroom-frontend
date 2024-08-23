import axios from "axios";

export default class IndexServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async countAdmin(ent) {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      let response;
      if (ent === "roles" || ent === "groups") {
        response = await axios.get(`${this.baseUrl}/${ent}/count`);
      } else {
        console.log(1);
        response = await axios.get(`${this.baseUrl}/${ent}/count/admin`);
      }
      return response.data?.count;
    } catch (err) {
      console.log(err);
    }
  }
  async count(ent, id) {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.get(`${this.baseUrl}/${ent}/count`, {
        params: {
          id: id || null,
        },
      });
      return response.data?.count;
    } catch (err) {
      console.log(err);
    }
  }
  async fetchData(url) {
    try {
      const response = await axios.get(`http://localhost:3000/${url}`);
      const data = response.data.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async update(data, ent) {
    const { id, name, features } = data;
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.put(`${this.baseUrl}/${ent}/${id}/update`, {
        id,
        name,
        features,
      });

      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async create(ent, { name, features }) {
    try {
      const res = await axios.post(`${this.baseUrl}/${ent}/create`, {
        name,
        features,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
