const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // vue: path.resolve(__dirname, "node_modules/vue/dist/vue.esm.js"),
        _c: path.resolve(__dirname, "src/components"),
        "@": path.resolve(__dirname, "src")
      }
    }
  }
};
