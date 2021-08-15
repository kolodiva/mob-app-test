<template>
  <v-card
    v-if="quiz[quest]"
    flat
    tile
    width="100%"
    height="100%"
    img="/background-picture.jpg"
    class="pt-5"
  >
    <v-img :src="quiz[quest].pic" max-width="90%" contain class="mx-auto" />
    <v-card-title class="pb-1 d-flex justify-space-between">
      <div>Вопрос: {{ quest + 1 }}/{{ quiz.length }}</div>
      <div>Баллоф: {{ inTotale }}</div>
    </v-card-title>

    <v-card-text style="font-size: 1.2rem" class="white--text">
      {{ quiz[quest].quest }}
    </v-card-text>

    <v-card-title class="mt-n6">Варианты анализов</v-card-title>

    <v-card-text class="mt-n4">
      <v-chip-group
        v-model="selection2"
        active-class="blue accent-4 white--text"
        column
      >
        <v-chip
          v-for="(item, i) in Object.entries(quiz[quest].var2)"
          :key="i"
          style="font-size: 1.2rem"
          @click.stop="clickButton(2, i, selection2)"
        >
          {{ item[0] }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-title class="mt-n8">Варианты ответов</v-card-title>

    <v-card-text class="mt-n4">
      <v-chip-group
        v-model="selection1"
        active-class="blue accent-4 white--text"
        column
      >
        <v-chip
          v-for="(item, i) in Object.entries(quiz[quest].var1)"
          :key="i"
          style="font-size: 1.2rem"
          @click.stop="clickButton(1, i, selection1)"
        >
          {{ item[0] }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions class="my-3">
      <v-spacer />
      <v-btn light :disabled="!able" rounded @click="contin">
        {{ quiz.length === quest + 1 ? "Завершить" : "Далее" }}
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialogInTotal" persistent max-width="290">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="text-h5">
          Поздравляем,<br />
          Вы завершили тест!!!
        </v-card-title>
        <v-card-text
          >Результаты Вашего текущего теста будут помещены в Исторический Архив
          и будут доступны следующие 100 лет.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="resModalQuest(0)">
            Ок, Бро.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: ["redirect_home"],
  data: () => ({
    dialogInTotal: false,
    quest: 0,
    loading: false,
    selection1: undefined,
    selection2: undefined,
    backgroundColor: {
      backgroundColor: "#45f1e13b",
      color: "white",
      fontSize: "1.1rem",
    },
  }),

  computed: {
    ...mapGetters({
      quiz: "quiz/getQuiz",
      soundOff: "quiz/getSoundOff",
      inTotale: "quiz/getInTotale",
    }),
    able() {
      return this.selection1 !== undefined && this.selection2 !== undefined;
    },
  },

  mounted() {
    // console.log(this.quiz);
    this.quest =
      parseInt(this.$route.params.id) - 1 > 9
        ? 0
        : parseInt(this.$route.params.id) - 1;
    // console.log(this.quiz[this.quest]);
    if (this.quiz[this.quest].res.var1 > 0) {
      this.selection1 = this.quiz[this.quest].res.var1 - 1;
    }
    if (this.quiz[this.quest].res.var2 > 0) {
      this.selection2 = this.quiz[this.quest].res.var2 - 1;
    }
  },

  methods: {
    async resModalQuest(idx) {
      await this.$store.dispatch("quiz/closeResQuiz");
      await this.$store.dispatch("quiz/clearOnlyResQuiz");

      this.dialogInTotal = false;

      this.$router.push({
        path: "/",
      });

      // if (idx === 1) {
      //   await this.$store.dispatch("quiz/clearResQuiz");
      //
      //   this.$router.push({
      //     path: "/",
      //   });
      // }
    },
    clickButton(variant, ind, select) {
      if (!this.soundOff) {
        this.$sounds.itsok.play();
      }
    },
    async contin() {
      if (!this.soundOff) {
        this.$sounds.itsgood.play();
      }

      // console.log(this.lastQuiz);
      await this.$store.dispatch("quiz/updateResQuiz", {
        data: {
          quest: this.quest,
          var1: this.selection1,
          var2: this.selection2,
        },
      });

      // console.log(this.lastQuiz);
      if (this.quiz.length === this.quest + 1) {
        this.dialogInTotal = true;
      } else {
        const nextPage = this.quest + 2;

        this.$router.push({
          path: `/test/${nextPage}`,
        });
      }

      // const nextPage = this.quest + 2;
      //
      // if (nextPage > this.quiz.length) {
      //   await this.$store.dispatch("quiz/clearOnlyResQuiz");
      //
      //   this.$router.push({
      //     path: "/",
      //   });
      // } else {
      //   this.$router.push({
      //     path: `/test/${nextPage}`,
      //   });
      // }

      // this.loading = true;
      //
      // setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
