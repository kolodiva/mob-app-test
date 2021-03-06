import _ from "lodash";

export const state = () => ({
  quiz: [],
  curQuiz: [],
  soundOff: false,
  userInfo: null,
});

export const mutations = {
  SET_QUIZ(state, data) {
    //
    if (data) {
      data.forEach((rec) => {
        rec.var1 = Object.fromEntries(
          Object.entries(rec.var1).sort(() => Math.random() - 0.5)
        );
      });
    }

    state.quiz = data;
  },
  SET_CUR_QUIZ(state, data) {
    if (data) {
      data.forEach((rec) => {
        rec.var1 = Object.fromEntries(
          Object.entries(rec.var1).sort(() => Math.random() - 0.5)
        );
      });
    }

    state.curQuiz = data;
  },
  SET_NEW_QUIZ(state, { numQuest }) {
    // state.quiz = data;

    let newQuiz = _.shuffle(JSON.parse(JSON.stringify(state.quiz)));

    if (numQuest === 15) {
      const newQuiz1 = _.shuffle(JSON.parse(JSON.stringify(state.quiz)));

      newQuiz = newQuiz.concat(newQuiz1);
    }
    // console.log(state.curQuiz);
    state.curQuiz = _.shuffle(newQuiz.slice(0, numQuest));
  },
  UPDATE_LAST_QUIZ(state, data) {
    state.curQuiz[data.quest].res = {
      var1: data.var1 + 1,
      var2: data.var2 + 1,
    };
    state.curQuiz[data.quest].score = data.score;
    state.curQuiz[data.quest].passed = data.passed;
  },
  SET_SOUND_OFF(state) {
    state.soundOff = !state.soundOff;
  },
  UPDATE_USER_INFO(state, data) {
    state.userInfo = data;
  },
};

export const getters = {
  getQuiz: (state) => {
    return state.curQuiz;
  },
  getInTotale: (state) => {
    let inTotal = 0;

    state.curQuiz.forEach((item, i) => {
      inTotal += item.score;
    });

    return inTotal;
  },
  getSoundOff: (state) => {
    return state.soundOff;
  },
  getUserInfo: (state) => {
    return state.userInfo;
  },
};

export const actions = {
  async setQuiz({ commit, dispatch, state }, { connectionid }) {
    let rows = await this.$api("getInfo");
    await commit("SET_QUIZ", rows);
    rows = await this.$api("getInfoCurQuiz", { connectionid });
    if (rows[0]) {
      await commit("SET_CUR_QUIZ", rows[0].res);
      await commit("UPDATE_USER_INFO", rows[0].userinfo);
    }
  },
  async switchSound({ commit, dispatch, state }) {
    await commit("SET_SOUND_OFF");
  },
  async createNewQuiz({ commit, dispatch, state }, data) {
    // const { rows } = await this.$api("createNewQuiz", { connectionid });
    // consola.info(rows);
    const newTest =
      state.curQuiz.length === 0 || state.curQuiz.length !== data.numQuest;

    if (newTest) {
      const rows = await this.$api("getInfo");

      await commit("SET_QUIZ", rows);

      await commit("SET_NEW_QUIZ", data);
    }

    if (newTest) {
      const connectionid = this.$cookies.get("connectionid");

      await this.$api("createNewQuiz", {
        connectionid,
        test: state.curQuiz,
        userinfo: state.userInfo,
      });
    }
  },
  async updateResQuiz({ commit, dispatch, state }, { data }) {
    // consola.info(rows);
    await commit("UPDATE_LAST_QUIZ", data);

    // console.log(state.curQuiz);
    const connectionid = this.$cookies.get("connectionid");

    await this.$api("createNewQuiz", {
      connectionid,
      test: state.curQuiz,
      userinfo: state.userInfo,
    });
  },
  async clearOnlyResQuiz({ commit, dispatch, state }) {
    // consola.info(rows);
    await commit("SET_CUR_QUIZ", []);
  },
  async clearResQuiz({ commit, dispatch, state }) {
    // consola.info(rows);
    await commit("SET_CUR_QUIZ", []);

    // console.log(state.curQuiz);
    const connectionid = this.$cookies.get("connectionid");

    await this.$api("createNewQuiz", {
      connectionid,
      test: state.curQuiz,
    });
  },
  async closeResQuiz({ commit, dispatch, state }, { data }) {
    // consola.info(rows);
    // await commit("SET_CUR_QUIZ", []);

    // console.log(state.curQuiz);
    let score = 0;

    state.curQuiz.forEach((item, i) => {
      score += item.score;
    });

    const connectionid = this.$cookies.get("connectionid");

    await this.$api("closeNewQuiz", {
      connectionid,
      score,
      test: state.curQuiz,
      userinfo: state.userInfo,
      lastquestion: data.lastquiestion,
    });
  },
  async updateUserInfo({ commit, dispatch, state }, { data }) {
    // consola.info(rows);
    await commit("UPDATE_USER_INFO", data);
  },
};
