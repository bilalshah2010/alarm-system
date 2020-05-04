import { MutationTree } from "vuex";
import { CompanyState } from "./states";
import * as types from "./types";

export const mutations: MutationTree<CompanyState> = {
  [types.COMPANY_VALIDATE_SUCCESS](state, payload) {
    state.error = "";
    state.company = payload.company;
    state.token = payload.token;
  },
  [types.COMPANY_VALIDATE_ERROR](state) {
    state.error = "Error occurred while fetching company details";
    state.company = undefined;
  },
  [types.FEED_VALIDATE_SUCCESS](state, payload) {
    state.error = "";
    if (state.company) {
      const newCompany = Object.assign({}, state.company);
      if (newCompany.stations) {
        for (const station of newCompany.stations) {
          for (const camera of station.cameras) {
            if (camera.id == payload.id) {
              camera.state = payload.state;
              camera.responseMessage = !payload.state
                ? "False alarm. No worries!"
                : "Call Police !";
            }
          }
        }
      }
      state.company = newCompany;
    }
  },
  [types.SOCKET_FEED_RESPONSE_SUCCESS](state, payload) {
    state.error = "";
    if (state.company) {
      const newCompany = Object.assign({}, state.company);
      if (newCompany.cameras) {
        for (const camera of newCompany.cameras) {
          if (camera.id == payload.camera_id) {
            camera.state = payload.state;
            camera.responseMessage = !payload.state
              ? "False alarm. No worries!"
              : "Call Police !";
          }
        }
      }
      state.company = newCompany;
    }
  },
  [types.FEED_VALIDATE_ERROR](state) {
    state.error = "Error occurred while getting feed results";
  },
  [types.SOCKET_CONNECTION_SUCCESS](state) {
    state.isSocketConnected = true;
  },
  [types.SOCKET_CONNECTION_ERROR](state) {
    state.isSocketConnected = false;
  }
};
