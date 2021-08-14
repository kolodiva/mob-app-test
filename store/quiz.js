export const state = () => ({
  quiz: [],
  soundOff: false,
});

export const mutations = {
  SET_QUIZ(state, data) {
    state.quiz = data;
  },
  UPDATE_LAST_QUIZ(state, data) {
    state.quiz[data.quest].res = {
      var1: data.var1 + 1,
      var2: data.var2 + 1,
    };
    // const found = state.lastQuiz.filter((item) => {
    //   return item.quest === data.quest;
    // });
    //
    // if (found.length === 0) {
    //   state.lastQuiz.push({
    //     quest: data.quest,
    //     var1: data.var1,
    //     var2: data.var2,
    //   });
    //   // console.log(this.lastQuiz);
    // } else {
    //   found[0] = {
    //     quest: data.quest,
    //     var1: data.var1,
    //     var2: data.var2,
    //   };
    // }
  },
  SET_SOUND_OFF(state) {
    state.soundOff = !state.soundOff;
  },
};

export const getters = {
  getQuiz: (state) => {
    return state.quiz;
  },
  getSoundOff: (state) => {
    return state.soundOff;
  },
};

export const actions = {
  async setQuiz({ commit, dispatch, state }) {
    const rows = await this.$api("getInfo");
    // consola.info(rows);
    await commit("SET_QUIZ", rows);
  },
  async switchSound({ commit, dispatch, state }) {
    await commit("SET_SOUND_OFF");
  },
  async createNewQuiz({ commit, dispatch, state }, connectionid) {
    const { rows } = await this.$api("createNewQuiz", { connectionid });
    // consola.info(rows);
    await commit("SET_LAST_QUIZ", rows.res);
  },
  async updateResQuiz({ commit, dispatch, state }, { data }) {
    // const { rows } = await this.$api("createNewQuiz", { connectionid });
    // consola.info(rows);
    await commit("UPDATE_LAST_QUIZ", data);
  },
};
