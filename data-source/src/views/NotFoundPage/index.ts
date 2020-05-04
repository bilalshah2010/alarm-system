import { Component, Vue } from "vue-property-decorator";
import template from "./notFound.vue";
import Content from "@/components/Content";
import router from "@/router";

@Component({
  mixins: [template],
  components: { Content }
})
export default class NotFoundPage extends Vue {
  goToHome() {
    router.push({ path: "/" });
  }
}
