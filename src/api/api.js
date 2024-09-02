import axios from "axios";
import { ApiLogin } from "./layout/layoutComposition/login/apiLogin";
let URL = import.meta.env.VITE_APP_URL;
const apiLogin = new ApiLogin();

export default class Api {
  constructor() {
    this.SERVER_URL = `${URL}/api/`;
    this.USER = "";
    this.PASSWORD = "";
    this.credencials = { username: this.USER, password: this.PASSWORD };
  }

  async getToken() {
    const token = await apiLogin.getToken();
    return token;
  }

  async get(name, id = -1) {
    const token = await this.getToken();

    let url = this.SERVER_URL + name + "/";
    if (id !== -1) {
      url += id + "/";
    }

    let response;

    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        response = res.data;
      })
      .catch((error) => {
        response = error.response;
      });
    return response;
  }

  async search(name, search) {
    const token = await this.getToken();
    let url = this.SERVER_URL + name + "/" + search;
    let response;

    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        response = res.data;
      })
      .catch((error) => {
        response = error.response;
      });
    return response;
  }

  async save(name, obj) {
    const token = await this.getToken();
    let url = this.SERVER_URL + name + "/";
    let response;

    if (!obj.id) {
      await axios
        .post(url, obj, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          response = res;
        })
        .catch((error) => {
          response = error.response.data;
        });
    } else {
      await axios
        .put(url + "" + obj.id + "/", obj, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          response = res;
        })
        .catch((error) => {
          response = error.response.data;
        });
    }
    return response;
  }

  async delete(name, id) {
    const token = await this.getToken();
    let url = this.SERVER_URL + name + "/" + id;
    let response = null;

    response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  async saveCompany(name, id, obj) {
    const token = await this.getToken();
    let url = this.SERVER_URL + name + "/" + id + "/";
    let response = null;

    await axios
      .put(url, obj, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        response = res;
      })
      .catch((error) => {
        response = error.response.data;
      });
    return response;
  }
}
