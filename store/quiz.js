import _ from "lodash";

export const state = () => ({
  quiz: [],
  curQuiz: [],
  soundOff: false,
});

export const mutations = {
  SET_QUIZ(state, data) {
    state.quiz = data;
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
    return state.curQuiz;
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
  async createNewQuiz({ commit, dispatch, state }, data) {
    // const { rows } = await this.$api("createNewQuiz", { connectionid });
    // consola.info(rows);
    await commit("SET_NEW_QUIZ", data);
  },
  async updateResQuiz({ commit, dispatch, state }, { data }) {
    // const { rows } = await this.$api("createNewQuiz", { connectionid });
    // consola.info(rows);
    await commit("UPDATE_LAST_QUIZ", data);
  },
};
