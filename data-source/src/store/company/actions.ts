import { ActionTree } from "vuex";
import { CompanyState } from "./states";
import { RootState } from "../rootState";
import * as types from "./types";
import { CompanyService } from "@/services/company.service";
import { SendFeedPayload } from "@/Models/SendFeedPayload";
import { CompanyLogin } from "@/Models/CompanyLogin";

export const actions: ActionTree<CompanyState, RootState> = {
  validateCompany: async function({ commit }, data: CompanyLogin) {
    try {
      const response = await CompanyService.validateCompany(data);
      const payload = response && response.data;
      commit(types.COMPANY_VALIDATE_SUCCESS, payload);
      return payload.company;
    } catch (error) {
      console.log(error);
      commit(types.COMPANY_VALIDATE_ERROR, null);
    }
  },
  validateFeed: async function({ commit }, data: SendFeedPayload) {
    try {
      const response = await CompanyService.sendFeed(data);
      const payload = response && response.data;
      commit(types.FEED_VALIDATE_SUCCESS, payload);
      return payload;
    } catch (error) {
      console.log(error);
      commit(types.FEED_VALIDATE_ERROR, null);
    }
  },
  setSocketConnectionStatus: function({ commit }, status) {
    status
      ? commit(types.SOCKET_CONNECTION_SUCCESS, status)
      : commit(types.SOCKET_CONNECTION_ERROR, status);
  },
  socketValidateFeed: function({ commit }, data) {
    commit(types.SOCKET_FEED_RESPONSE_SUCCESS, data);
  }
};
