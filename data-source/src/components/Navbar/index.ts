import { Component, Vue } from "vue-property-decorator";
import template from "./Navbar.vue";

@Component({
  mixins: [template],
  components: {}
})
export default class Navbar extends Vue {}
