export const state = () => ({
  quiz: [],
  soundOff: false,
});

export const mutations = {
  SET_QUIZ(state, data) {
    state.quiz = data;
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
};
