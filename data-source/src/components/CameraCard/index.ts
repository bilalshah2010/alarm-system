import { Component, Vue } from "vue-property-decorator";
import template from "./CameraCard.vue";

@Component({
  mixins: [template],
  components: {},
  props: ["id", "stationId", "onClick"]
})
export default class CameraCard extends Vue {
  onButtonPressed() {
    this.$emit("onClick", {
      id: this.$props.id,
      stationId: this.$props.stationId
    });
  }
}
