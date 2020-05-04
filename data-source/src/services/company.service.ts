import axios from "axios";

export class CompanyService {
  /**
   ******************************
   * @API
   ******************************
   */

  static api_root = process.env.VUE_APP_API_URL;

  static validateCompany(payload) {
    return axios.post(this.api_root + "auth/validate", payload);
  }

  static sendFeed(payload) {
    return axios.post(this.api_root + "validateFeed", payload);
  }
}
