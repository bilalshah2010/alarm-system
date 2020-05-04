<template>
  <div class="wrapper">
    <Navbar />
    <router-view />
  </div>
</template>
<style lang="scss">
@import "./styles/app.scss";
.wrapper {
  height: 100%;
}
</style>
<script>
import Navbar from "./components/Navbar";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import router from "./router";
const namespace = "company";
import io from "socket.io-client";

@Component({
  components: { Navbar }
})
export default class App extends Vue {
  @Action("socketValidateFeed", { namespace }) socketValidateFeed;
  @Action("setSocketConnectionStatus", { namespace }) setSocketConnectionStatus;
  @Getter("getToken", { namespace }) getToken;
  @Getter("getCompany", { namespace }) getCompany;
  created() {
    // Interceptors for 401 404 and 500 handling
    axios.interceptors.request.use(
      config => {
        if (this.getToken !== "") {
          config.headers.Authorization = `Bearer ${this.getToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response.status === 401) {
          alert("Sorry, Unauthorized");
          router.currentRoute.name !== "Companies"
            ? router.push({ path: "/" })
            : "";
        } else if (error.response.status === 500) {
          router.currentRoute.name !== "ErrorPage"
            ? router.push({ path: "error-page/" })
            : "";
        }
        return Promise.reject(error);
      }
    );

    // Socket connection and events
    const socket = io(process.env.VUE_APP_SOCKET_URL);
    socket.on("connect", () => {
      this.setSocketConnectionStatus(true);
      socket.on("FEED_RESPONSE", data => {
        // Necessary when multiple companies are using socket
        if (data.companyId === this.getCompany.id) {
          if (data.message === "Success") {
            this.socketValidateFeed(data.feed);
          } else {
            alert(data.message);
          }
        }
      });
    });
    socket.on("disconnect", () => {
      this.setSocketConnectionStatus(false);
    });

    this.$root.$on("FEED_SOCKET", payload => {
      socket.emit("FEED", payload);
    });
  }
}
</script>
