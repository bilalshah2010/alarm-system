import { Component, Vue } from "vue-property-decorator";
import template from "./Content.vue";

@Component({
  mixins: [template],
  components: {}
})
export default class Content extends Vue {}
