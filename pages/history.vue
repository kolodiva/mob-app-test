<template>
  <v-card
    flat
    tile
    width="100%"
    height="100%"
    img="/background-picture.jpg"
    class="d-flex flex-column justify-start align-center px-3 py-5"
  >
    <v-expansion-panels focusable inset>
      <v-expansion-panel
        v-for="(item, i) in rows"
        :key="i"
        :style="backgroundColor"
      >
        <v-expansion-panel-header style="font-size: 1.2rem">
          Тест от {{ item.data_test }},<br />{{ item.res.length }} вопр.,
          {{ item.score }} бал.<br />{{ getUserInfo(item) }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card-text
            v-for="(item1, i1) in item.res"
            :key="10 * i1"
            style="font-size: 1.1rem"
          >
            {{ i1 + 1 }}. {{ item1.quest }}
            <v-card-text style="font-size: 1rem">
              Баллов:
              {{ item1.score }},<br /><br />
              <span class="font-weight-bold">Ваш ответ:</span><br />
              {{ Object.entries(item1.var1)[item1.res.var1 - 1][0] }}
              <br /><br />
              <span class="font-weight-bold">Правильный ответ:</span><br />
              {{ Object.keys(item1.var1).find((key) => item1.var1[key] === 1) }}
            </v-card-text>
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <div />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
// #45f1e13b
export default {
  async fetch() {
    const connectionid = this.$cookies.get("connectionid");
    this.rows = await this.$api("getHistory", { connectionid });
    // console.log(rows);
  },
  data: () => ({
    rows: [],
    loading: false,
    selection: 1,
    backgroundColor: {
      backgroundColor: "rgba(17, 145, 133, 0.7)",
      color: "white",
      fontSize: "1.1rem",
    },
    points: [
      ["Сухая теория", "theory", 0],
      ["Простой тест", "clickButton", 5],
      ["Почти простой тест", "clickButton", 10],
      ["НЕ Простой тест", "clickButton", 15],
    ],
  }),
  computed: {
    ...mapGetters({
      soundOff: "quiz/getSoundOff",
    }),
  },

  mounted() {
    // console.log(this.quiz);
  },

  methods: {
    getUserInfo(item) {
      let res = "";

      if (item && item.userinfo) {
        res = `${item.userinfo.infoStudy}, возр: ${item.userinfo.infoAge}, курс/класс: ${item.userinfo.infoClass} `;
      }

      return res;
    },
    proxy(method, payload) {
      this[method](payload);
    },
    theory() {
      this.$router.push({
        path: "/theory",
      });
    },
    async clickButton(numQuest) {
      if (!this.soundOff) {
        this.$sounds.itsok.play();
      }

      await this.$store.dispatch("quiz/createNewQuiz", {
        numQuest,
      });

      this.$router.push({
        path: "/test/1",
      });
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
