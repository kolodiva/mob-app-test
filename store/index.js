// const consola = require('consola')
const { v4: uuidv4 } = require("uuid");

export const strict = false;

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req }) {
    let connectionid = this.$cookies.get("connectionid");

    if (!connectionid) {
      connectionid = uuidv4();
      this.$cookies.set("connectionid", connectionid);
    }

    await dispatch("quiz/setQuiz", { connectionid });

    // await dispatch("service/setSlider");
    // await dispatch("nomenklator/loadSeoTextMain");
    // await dispatch("nomenklator/getStrucCatalog");

    // const connectionid = this.$cookies.get("connectionid");
    // await dispatch("nomenklator/setUserInfo", { connectionid });
    // await dispatch("nomenklator/refreshCountCart");
  },
};
