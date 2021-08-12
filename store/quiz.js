export const state = () => ({
  quiz: [],
  windowSize: {
    x: 0,
    y: 0,
  },
});

export const mutations = {
  SET_QUIZ(state, data) {
    state.quiz = data;
  },
  SET_WINDOW_SIZE(state, { x, y }) {
    state.windowSize = { x, y };
  },
};

export const getters = {
  getQuiz: (state) => {
    return state.quiz;
  },
  getWindowSize: (state) => {
    return state.windowSize;
  },
};

export const actions = {
  async setQuiz({ commit, dispatch, state }) {
    const rows = await this.$api("getInfo");
    // consola.info(rows);
    await commit("SET_QUIZ", rows);
  },
};
