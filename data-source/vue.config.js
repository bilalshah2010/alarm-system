module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                    @import "@/styles/_variables.scss";
                    @import "@/styles/_mixins.scss";
                `
      }
    }
  },
  devServer: {
    watchOptions: {
      clientLogLevel: "warning"
    }
  }
};
