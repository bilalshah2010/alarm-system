import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { company } from "./company";
import { RootState } from "./rootState";
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0.0"
  },
  modules: {
    company
  }
};

export default new Vuex.Store<RootState>(store);
