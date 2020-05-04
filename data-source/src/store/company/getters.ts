import { GetterTree } from "vuex";
import { CompanyState } from "./states";
import { RootState } from "../rootState";
import login from "@/../login.config.json";

export const getters: GetterTree<CompanyState, RootState> = {
  getCompany(state) {
    return state.company;
  },
  getToken(state) {
    return state.token;
  },
  getCalipsaCredentials() {
    return login.calipsa;
  },
  getBranchStoreCredentials() {
    return login.branchStore;
  },
  getSocketConnectionStatus(state) {
    return state.isSocketConnected;
  }
};
