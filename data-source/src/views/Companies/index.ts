import { Component, Vue } from "vue-property-decorator";
import template from "./companies.vue";
import Content from "@/components/Content";
import { Action, Getter } from "vuex-class";
import router from "@/router";
const namespace = "company";

@Component({
  mixins: [template],
  components: { Content }
})
export default class Companies extends Vue {
  @Action("validateCompany", { namespace }) validateCompany;
  @Getter("getCalipsaCredentials", { namespace }) getCalipsaCredentials;
  @Getter("getBranchStoreCredentials", { namespace }) getBranchStoreCredentials;
  @Getter("getSocketConnectionStatus", { namespace }) getSocketConnectionStatus;
  public isSocketConnected = false;
  created() {
    this.isSocketConnected = this.getSocketConnectionStatus;
    this.$store.watch(
      () => this.getSocketConnectionStatus,
      isSocketConnected => {
        this.isSocketConnected = isSocketConnected;
      }
    );
  }
  loginCalipsa() {
    this.validateCompany(this.getCalipsaCredentials).then(res => {
      if (res) {
        router.push({ path: "feed/" });
      }
    });
  }
  loginBranchStore() {
    this.validateCompany(this.getBranchStoreCredentials).then(res => {
      if (res) {
        router.push({ path: "feed/" });
      }
    });
  }
}
