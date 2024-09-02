import Api from "../../../api";

export class ApiPatient extends Api {
  constructor() {
    super();
  }

  //Api Clientes
  async getPatient(id = -1) {
    let r = await super.get("patients", id);
    return r;
  }

  async patientList(search) {
    let r = await super.search("patients", search);
    return r;
  }

  async savePatient(obj) {
    let r = await super.save("patients", obj);
    return r;
  }

  async patientState(id) {
    let r = await super.get("patientstate", id);
    return r;
  }

  async deletePatient(id) {
    let r = await super.delete("patients", id);
    return r;
  }

  async getDocumentType(id = -1) {
    let r = await super.get("documenttype", id);
    return r;
  }

  // Api Ubigeo
  async getCountry(id = -1) {
    let r = await super.get("country", id);
    return r;
  }

  async getUbigeo(id = -1) {
    let r = await super.get("ubigeo", id);
    return r;
  }
  
  async getDocument(doc) {
    let r = await super.get("datacli", doc);
    return r;
  }

  //Api Tarifario
  async getTarifario(doc) {
    let r = await super.get("tarifario", doc);
    return r;
  }
}
