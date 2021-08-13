<template>
  <v-card
    flat
    width="100%"
    height="100%"
    img="/background-picture.jpg"
    class="pt-5"
  >
    <v-img :src="quiz[quest].pic" height="150px" contain class="" />
    <v-card-title>Вопрос: {{ quest + 1 }}/{{ quiz.length }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="2.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
          class="mb-4"
        ></v-rating>
      </v-row>

      <div>{{ quiz[quest].quest }}</div>
    </v-card-text>

    <v-card-title class="mt-n8">Варианты анализов</v-card-title>

    <v-card-text class="mt-n4">
      <v-chip-group
        v-model="selection1"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip v-for="(item, i) in Object.entries(quiz[quest].var2)" :key="i">
          {{ item[0] }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-title class="mt-n8">Варианты ответов</v-card-title>

    <v-card-text class="mt-n4">
      <v-chip-group
        v-model="selection2"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip v-for="(item, i) in Object.entries(quiz[quest].var1)" :key="i">
          {{ item[0] }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions class="mt-n4" fixed>
      <v-spacer />
      <v-btn light rounded small @click="reserve"> Продолжить </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  // async fetch() {
  //   const rows = await this.$api("getInfo", {});
  //   console.log(rows);
  // },
  // fetch({ params }) {
  //   if (params && params.id) {
  //     this.quest = params.id;
  //   }
  // },
  data: () => ({
    quest: 0,
    loading: false,
    selection1: -1,
    selection2: -1,
    backgroundColor: {
      backgroundColor: "#45f1e13b",
      color: "white",
      fontSize: "1.1rem",
    },
    points: ["Тест1", "Тест2"],
  }),
  computed: {
    ...mapGetters({
      quiz: "quiz/getQuiz",
      soundOff: "quiz/getSoundOff",
    }),
  },

  mounted() {
    // console.log(this.quiz);
    this.quest =
      parseInt(this.$route.params.id) - 1 > 9
        ? 0
        : parseInt(this.$route.params.id) - 1;
  },

  methods: {
    clickButton() {
      if (!this.soundOff) {
        this.$sounds.gun.play();
      }
    },
    reserve() {
      const nextPage = this.quest + 2;

      if (nextPage > this.quiz.length) {
        this.$router.push({
          path: "/",
        });
      } else {
        this.$router.push({
          path: `/simpletest/${nextPage}`,
        });
      }

      // this.loading = true;
      //
      // setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
