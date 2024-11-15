import { ApiClient } from "@/app/api/apiClient";
import { Store, StoreL } from "../interfaces";

const api = new ApiClient();

export class CodeService {
  async getCodes(token: string | undefined) {
    const result = await api.get("codes", token);
    return result;
  }

  async searchCode(
    search: string | number,
    type: number,
    token: string | undefined
  ) {
    let query = type == 1 ? `language=${search}` : `text=${search}`;
    const result = await api.get(`codes/search?${query}`, token);
    return result;
  }

  async postCode(data: Store, token: string | undefined) {
    const result = await api.post("codes", data, token);
    return result;
  }

  async updateCode(
    id: number | undefined,
    data: Store,
    token: string | undefined
  ) {
    const result = await api.update(`codes/${id}`, data, token);
    return result;
  }

  async deleteCode(id: number | undefined, token: string | undefined) {
    const result = await api.delete(`codes/${id}`, token);
    return result;
  }

  async getMyCode(token: string | undefined) {
    const result = await api.get("codes/me", token);
    return result;
  }

  async getLanguages(token: string | undefined) {
    const result = await api.get("languages", token);
    return result;
  }

  async postLanguage(data: StoreL, token: string | undefined) {
    const result = await api.post("languages", data, token);
    return result;
  }

  async updateLanguage(
    id: number | undefined,
    data: StoreL,
    token: string | undefined
  ) {
    const result = await api.update(`languages/${id}`, data, token);
    return result;
  }

  async deleteLanguage(id: number | undefined, token: string | undefined) {
    const result = await api.delete(`languages/${id}`, token);
    return result;
  }
}
