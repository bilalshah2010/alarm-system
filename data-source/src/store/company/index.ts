import { Module } from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { CompanyState } from "./states";
import { getters } from "./getters";
import { RootState } from "../rootState";

export const state: CompanyState = {
  company: undefined,
  token: "",
  error: "",
  isSocketConnected: false
};

const namespaced = true;

export const company: Module<CompanyState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
