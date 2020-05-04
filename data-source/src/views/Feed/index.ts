import { Component, Vue } from "vue-property-decorator";
import template from "./feed.vue";
import Content from "@/components/Content";
import { Action, Getter } from "vuex-class";
import { Company } from "@/Models/Company";
import router from "@/router";
import CameraCard from "@/components/CameraCard";
import { SendFeedPayload } from "@/Models/SendFeedPayload";
const namespace = "company";

@Component({
  mixins: [template],
  components: { Content, CameraCard }
})
export default class Feed extends Vue {
  @Action("validateFeed", { namespace }) validateFeed;
  @Getter("getCompany", { namespace }) getCompany;
  @Getter("getBranchStoreCredentials", { namespace }) getBranchStoreCredentials;
  public company: Company = {} as Company;

  created(): void {
    this.company = this.getCompany;
    if (!this.company) {
      router.push({ path: "/" });
    }
    this.$store.watch(
      () => this.getCompany,
      company => {
        if (!company) {
          router.push({ path: "/" });
        }
        this.company = company;
      }
    );
  }

  sendFeed(req) {
    if (this.company.username == "calipsa") {
      // Send feed by HTTP
      const payload: SendFeedPayload = {
        id: req.id,
        stationID: req.stationId,
        companyID: this.company.id,
        companyName: this.company.username,
        message: "This a test feed via HTTP"
      };

      this.validateFeed(payload).then(() => {
        this.company = this.getCompany;
      });
    } else {
      // Send feed by Socket
      const payload: SendFeedPayload = {
        id: req.id,
        companyID: this.company.id,
        companyName: this.company.username,
        password: this.getBranchStoreCredentials.password,
        message: "This a test feed via Socket"
      };

      this.$root.$emit("FEED_SOCKET", payload);
    }
  }

  goToHome() {
    router.push({ path: "/" });
  }
}
