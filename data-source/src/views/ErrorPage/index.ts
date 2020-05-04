import { Component, Vue } from "vue-property-decorator";
import template from "./errorPage.vue";
import Content from "@/components/Content";
import router from "@/router";

@Component({
  mixins: [template],
  components: { Content }
})
export default class ErrorPage extends Vue {
  goToHome() {
    router.push({ path: "/" });
  }
}
