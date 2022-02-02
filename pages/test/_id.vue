<template>
  <v-card
    v-if="quiz[quest]"
    flat
    tile
    width="100%"
    min-height="100%"
    img="/background-picture.jpg"
    class="pt-5"
  >
    <v-toolbar dense color="transparent" flat>
      <v-chip style="font-size: 1.2rem"
        >Вопрос: {{ quest + 1 }}/{{ quiz.length }}</v-chip
      >
      <v-spacer />
      <v-chip style="font-size: 1.2rem">Баллов: {{ inTotale }}</v-chip>
    </v-toolbar>

    <v-sheet
      color="grey lighten-3"
      rounded="xl"
      class="mx-auto mt-3 pa-3"
      width="90%"
      ><span style="font-size: 1.2rem">{{ quiz[quest].quest }}</span></v-sheet
    >

    <v-row justify="center" class="mt-4">
      <v-col cols="11">
        <v-sheet elevation="10" rounded="xl">
          <v-sheet
            class="pa-3 teal text-center"
            style="font-size: 1.2rem"
            dark
            rounded="t-xl"
          >
            <v-toolbar dense color="transparent" flat>
              <v-toolbar-title
                style="font-size: 1.4rem"
                color="transparent"
                class="ml-n3"
                >Варианты</v-toolbar-title
              >
              <v-spacer />
              <v-btn light :disabled="!able" rounded @click="contin">
                {{ quiz.length === quest + 1 ? "Завершить" : "Далее" }}
              </v-btn>
            </v-toolbar>
          </v-sheet>

          <div class="pa-2">
            <v-chip-group
              v-model="selection1"
              active-class="blue accent-4 white--text"
              column
            >
              <v-chip
                v-for="(item, i) in Object.entries(quiz[quest].var1)"
                :key="i"
                class="pa-3 my-3"
                style="font-size: 1.3rem; height: auto; white-space: normal"
                @click.stop="clickButton(1, i, selection1)"
              >
                {{ item[0] }}
                <v-chip
                  v-if="i === trueAnswer[0] && passed"
                  class="ml-1"
                  color="green"
                  x-small
                  >ок</v-chip
                >
              </v-chip>
            </v-chip-group>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogInTotal" persistent max-width="290">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="text-h6">
          Поздравляем,<br />
          Вы завершили тест.<br />Ваш результат<br />{{ inTotale }} балла(ов).
        </v-card-title>
        <v-card-text style="font-size: 1.1rem"
          >Благодарим Вас за участие в тесте. Ваши Результаты будут помещены в
          Архив и будут доступны для просмотра.</v-card-text
        >
        <v-card-actions class="px-3 mt-n11">
          <v-radio-group v-model="radios" class="">
            <template v-slot:label>
              <v-card-text style="font-size: 1.1rem"
                ><strong>Как Вам кажется</strong>, помог (помогут) ли этот
                (подобный) тест повысить интерес к здоровью и здоровому образу
                жизни?</v-card-text
              >
            </template>
            <v-radio value="yes" class="ml-3" color="success">
              <template v-slot:label>
                <div><strong class="success--text">Да</strong></div>
              </template>
            </v-radio>
            <v-radio value="no" class="ml-3" color="error">
              <template v-slot:label>
                <div><strong class="red--text">Нет</strong></div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-actions>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            :disabled="radios === ''"
            text
            @click="resModalQuest(0)"
          >
            Понятно.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogNoChange" persistent max-width="290">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="text-h5"> Сожалеем !!! </v-card-title>
        <v-card-text
          >Данный пункт был пройден Вами и изменить его уже нельзя. Допустимо
          только созерцание.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogNoChange = false">
            Ок, Бро.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDopInfo" persistent max-width="85%">
      <v-card>
        <v-card-title
          v-html="
            'Правильный ответ:<br/>' +
            Object.keys(quiz[quest].var1).find(
              (key) => quiz[quest].var1[key] === 1
            )
          "
        />

        <v-stepper v-model="e6" vertical>
          <div
            v-for="(pos, i) in [quiz[quest].quest].concat(quiz[quest].theory)"
            :key="i"
          >
            <v-stepper-step
              :complete="e6 > i + 1"
              :step="i + 1"
              editable
              class="pt-6 mb-3"
              style="font-size: 1.2rem"
              >{{ dopInfo[i] }}</v-stepper-step
            >
            <v-stepper-content :step="i + 1" class="ml-1 mt-n10">
              <v-card-text style="font-size: 1.1rem">{{ pos }}</v-card-text>

              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-chip
                  class=""
                  :color="
                    e6 === quiz[quest].theory.length + 1 ? 'red' : 'green'
                  "
                  outlined
                  @click="dopInfoContin(i)"
                >
                  {{
                    e6 === quiz[quest].theory.length + 1
                      ? "След.вопрос"
                      : "Далее"
                  }}
                </v-chip>
              </div>
            </v-stepper-content>
          </div>
        </v-stepper>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: ["redirect_home"],
  data: () => ({
    radios: "",
    dialogInTotal: false,
    dialogNoChange: false,
    dialogDopInfo: false,
    quest: 0,
    loading: false,
    selection1: undefined,
    selection2: undefined,
    backgroundColor: {
      backgroundColor: "#45f1e13b",
      color: "white",
      fontSize: "1.1rem",
    },
    trueAnswer: [],
    score: 0,
    passed: 0,
    dopInfo: [
      "Вопрос",
      "Подробное описание болезни",
      "Факторы риска",
      "Профилактика",
    ],
    e6: 1,
  }),

  computed: {
    ...mapGetters({
      quiz: "quiz/getQuiz",
      soundOff: "quiz/getSoundOff",
      inTotale: "quiz/getInTotale",
    }),
    able() {
      return this.selection1 !== undefined;
    },
  },

  watch: {
    selection1(newVal, oldVal) {
      if (this.passed === 1 && oldVal) {
        this.dialogNoChange = true;
      }
    },
    selection2(newVal, oldVal) {
      if (this.passed === 1 && oldVal) {
        this.dialogNoChange = true;
      }
    },
  },

  mounted() {
    // console.log(this.quiz);
    this.quest =
      parseInt(this.$route.params.id) > this.quiz.length
        ? 0
        : parseInt(this.$route.params.id) - 1;
    // console.log(this.quiz[this.quest]);
    if (this.quiz[this.quest].res.var1 > 0) {
      this.selection1 = this.quiz[this.quest].res.var1 - 1;
    }

    //
    const quiz = this.quiz[this.quest];

    this.trueAnswer = [];

    Object.entries(quiz.var1).forEach((item, i) => {
      if (item[1] === 1) {
        this.trueAnswer.push(i);
      }
    });

    Object.entries(quiz.var2).forEach((item, i) => {
      if (item[1] === 1) {
        this.trueAnswer.push(i);
      }
    });

    this.score = quiz.score;
    this.passed = quiz.passed;
  },

  methods: {
    async resModalQuest(idx) {
      await this.$store.dispatch("quiz/closeResQuiz", {
        data: { lastquiestion: this.radios },
      });
      await this.$store.dispatch("quiz/clearOnlyResQuiz");

      this.dialogInTotal = false;

      this.$router.push({
        path: "/",
      });
    },
    clickButton(variant, ind, select) {
      if (!this.soundOff) {
        this.$sounds.itsok.play();
      }
    },
    dopInfoContin(i) {
      if (this.e6 === this.quiz[this.quest].theory.length + 1) {
        this.contin();
      } else {
        this.e6 = i + 2;
      }
    },
    async contin() {
      // после ответа прогоняем теорию
      if (!this.dialogDopInfo) {
        if (this.passed === 1) {
        } else {
          const score = this.trueAnswer[0] === this.selection1 ? 1 : 0;

          if (!this.soundOff) {
            if (score === 1) {
              this.$sounds.itsgood.play();
            } else {
              this.$sounds.itsbad.play();
            }
          }

          // console.log(quiz);

          // console.log(this.lastQuiz);
          await this.$store.dispatch("quiz/updateResQuiz", {
            data: {
              quest: this.quest,
              var1: this.selection1,
              var2: this.selection2,
              score,
              passed: 1,
            },
          });
        }
        this.dialogDopInfo = true;
      } else {
        this.dialogDopInfo = false;
        if (this.quiz.length === this.quest + 1) {
          this.dialogInTotal = true;
        } else {
          const nextPage = this.quest + 2;

          this.$router.push({
            path: `/test/${nextPage}`,
          });
        }
      }
    },
  },
};
</script>
