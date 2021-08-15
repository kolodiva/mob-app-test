import _ from "lodash";

export const state = () => ({
  quiz: [],
  curQuiz: [],
  soundOff: false,
  inTotale: 0,
});

export const mutations = {
  SET_QUIZ(state, data) {
    state.quiz = data;
  },
  SET_CUR_QUIZ(state, data) {
    state.curQuiz = data;
  },
  SET_NEW_QUIZ(state, { connectionid, numQuest }) {
    // state.quiz = data;

    let newQuiz = _.shuffle(state.quiz).slice(0, numQuest);

    if (numQuest === 15) {
      newQuiz = _.shuffle(newQuiz.concat(newQuiz)).slice(0, numQuest);
    }

    state.curQuiz = _.shuffle(newQuiz);
  },
  UPDATE_LAST_QUIZ(state, data) {
    state.curQuiz[data.quest].res = {
      var1: data.var1 + 1,
      var2: data.var2 + 1,
    };
  },
  SET_SOUND_OFF(state) {
    state.soundOff = !state.soundOff;
  },
};

export const getters = {
  getQuiz: (state) => {
    return state.curQuiz;
  },
  getInTotale: (state) => {
    return state.inTotale;
  },
  getSoundOff: (state) => {
    return state.soundOff;
  },
};

export const actions = {
  async setQuiz({ commit, dispatch, state }, { connectionid }) {
    let rows = await this.$api("getInfo");
    await commit("SET_QUIZ", rows);
    rows = await this.$api("getInfoCurQuiz", { connectionid });

    if (rows[0]) {
      await commit("SET_CUR_QUIZ", rows[0].res);
    }
  },
  async switchSound({ commit, dispatch, state }) {
    await commit("SET_SOUND_OFF");
  },
  async createNewQuiz({ commit, dispatch, state }, data) {
    // const { rows } = await this.$api("createNewQuiz", { connectionid });
    // consola.info(rows);
    if (state.curQuiz.length === 0) {
      await commit("SET_NEW_QUIZ", data);
    }
  },
  async updateResQuiz({ commit, dispatch, state }, { data }) {
    // consola.info(rows);
    await commit("UPDATE_LAST_QUIZ", data);

    // console.log(state.curQuiz);

    await this.$api("createNewQuiz", {
      connectionid: data.connectionid,
      test: state.curQuiz,
    });
  },
};
