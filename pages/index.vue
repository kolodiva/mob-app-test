<template>
  <v-card
    flat
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
      @click.stop="clickButton"
      >{{ item }}
    </v-btn>

    <div />
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
      "Немного теории",
      "Простой тест",
      "Почти простой тест",
      "НЕ Простой тест",
    ],
  }),
  computed: {
    ...mapGetters({
      quiz: "quiz/getQuiz",
      soundOff: "quiz/getSoundOff",
    }),
  },

  mounted() {
    // console.log(this.quiz);
  },

  methods: {
    clickButton() {
      if (!this.soundOff) {
        this.$sounds.gun.play();
      }
      this.$router.push({
        path: "/simpletest/1",
      });
    },
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
