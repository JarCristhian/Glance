import { ApiClient } from "@/app/api/apiClient";
import { Store } from "../interfaces";

const api = new ApiClient();

export class NotesService {
  async getNotes() {
    const result = await api.getAll("notes");
    return result;
  }

  async postNotes(data: Store) {
    const result = await api.postAll("notes", data);
    return result;
  }

  async getMyNotes(token: string | undefined) {
    const result = await api.get("notes/me", token);
    return result;
  }

  async postMyNotes(data: Store, token: string | undefined) {
    const result = await api.post("notes/me", data, token);
    return result;
  }

  async postLovedNotes(id: number, token: string | undefined) {
    const result = await api.post("notes/loved/", { noteId: id }, token);
    return result;
  }

  async updateProfile(
    id: number | undefined,
    data: { name: string | undefined; image: string | undefined },
    token: string | undefined
  ) {
    const result = await api.update(`users/${id}`, data, token);
    return result;
  }
}
