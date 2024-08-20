import axios from "axios";

export default class RolesServices {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL;
  }
  async getAllRoles() {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.get(`${this.baseUrl}/roles`);
      return response.data?.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async deleteRole(id) {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.delete(`${this.baseUrl}/roles/${id}/delete`);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async create(role) {
    const { name, users, groups, features } = role;
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.post(`${this.baseUrl}/roles/create`, {
        name,
        groups,
        users,
        features,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async count() {
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.get(`${this.baseUrl}/roles/count`);
      return response.data.count[0].count;
    } catch (err) {
      console.log(err);
    }
  }
  async update(role) {
    const { id, name, users, groups, features } = role;
    try {
      if (!this.baseUrl) {
        throw new Error("Base URL is not defined");
      }
      const response = await axios.put(`${this.baseUrl}/roles/${id}/update`, {
        name,
        groups,
        users,
        features,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
