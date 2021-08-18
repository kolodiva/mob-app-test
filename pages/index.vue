<template>
  <v-card
    flat
    tile
    width="100%"
    height="100%"
    img="/background-picture.jpg"
    class="d-flex flex-column justify-space-around align-center"
  >
    <v-btn
      v-for="(item, i) in points"
      :key="i"
      class="py-6"
      width="70%"
      rounded
      :style="backgroundColor"
      @click.stop="proxy(item[1], item[2])"
      >{{ item[0] }}
    </v-btn>

    <div />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // async fetch() {
  //   const rows = await this.$api("getInfo", {});
  //   console.log(rows);
  // },
  data: () => ({
    loading: false,
    selection: 1,
    backgroundColor: {
      backgroundColor: "#45f1e13b",
      color: "white",
      fontSize: "1.1rem",
    },
    points: [
      ["Сухая теория", "theory", 0],
      ["Простой тест", "clickButton", 2],
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
