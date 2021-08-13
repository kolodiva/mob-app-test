// const consola = require('consola')
const { v4: uuidv4 } = require("uuid");

export const strict = false;

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req }) {
    await dispatch("quiz/setQuiz");

    const connectionid = this.$cookies.get("connectionid");

    if (!connectionid) {
      this.$cookies.set("connectionid", uuidv4());
    }

    // await dispatch("service/setSlider");
    // await dispatch("nomenklator/loadSeoTextMain");
    // await dispatch("nomenklator/getStrucCatalog");

    // const connectionid = this.$cookies.get("connectionid");
    // await dispatch("nomenklator/setUserInfo", { connectionid });
    // await dispatch("nomenklator/refreshCountCart");
  },
};
