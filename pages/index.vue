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

    <v-dialog v-model="dialogContactInfo" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h6">
          Перед началом немного информации о себе</v-card-title
        >
        <v-container fluid>
          <v-radio-group v-model="infoStudy" row class="mt-0 pl-5">
            <v-radio label="Школьник" value="школьник"></v-radio>
            <v-radio label="Студент" value="студент"></v-radio>
          </v-radio-group>

          <v-select
            v-model="infoAge"
            :items="itemsAges"
            label="Специализация"
            dense
            style="width: 90%"
            class="mx-auto"
          ></v-select>
          <v-select
            v-model="infoClass"
            :items="itemsClasses"
            label="Класс/Курс"
            dense
            style="width: 90%"
            class="mx-auto"
            :menu-props="{
              contentClass: 'my_select_class',
            }"
          ></v-select>
        </v-container>

        <v-card-actions>
          <v-btn color="red darken-1" text @click="clickOkContactInfo(0)">
            НЕ хочу.
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="clickOkContactInfo(1)">
            Ок.
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" class="mb-10" timeout="2000">
      <span style="font-size: 1.2rem">Необходимо указать все данные...</span>

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
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
      ["Теория", "theory", 0],
      ["Пройти тест (10 в.)", "clickButton", 10],
      ["Архив", "history", 0],
    ],
    itemsAges: ["медицинский профиль", "иное"],
    itemsClasses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    infoStudy: null,
    infoAge: null,
    infoClass: null,
    dialogContactInfo: false,
    snackbar: false,
    numQuestMem: null,
  }),
  computed: {
    ...mapGetters({
      soundOff: "quiz/getSoundOff",
      userInfo: "quiz/getUserInfo",
    }),
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
    history() {
      this.$router.push({
        path: "/history",
      });
    },
    async clickButton(numQuest) {
      if (!this.soundOff) {
        this.$sounds.itsok.play();
      }

      if (!this.userInfo) {
        this.numQuestMem = numQuest;
        this.dialogContactInfo = true;
        return;
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
    async clickOkContactInfo(res) {
      if (res === 0) {
        this.dialogContactInfo = false;
      } else if (this.infoStudy && this.infoAge && this.infoClass) {
        await this.$store.dispatch("quiz/updateUserInfo", {
          data: {
            infoStudy: this.infoStudy,
            infoAge: this.infoAge,
            infoClass: this.infoClass,
          },
        });

        this.dialogContactInfo = false;

        this.clickButton(this.numQuestMem);
      } else {
        this.snackbar = true;
      }
    },
  },
};
</script>

<style scoped>
div.my_select_class div.v-list {
  display: flex !important;
  flex-wrap: wrap !important;
  padding: 5px;
}

div.my_select_class div.v-list >>> div.v-list-item {
  background: #f8f7f7 !important;
  padding: 2px !important;
  max-width: 40px !important;
  max-height: 20px !important;
  margin: 5px !important;

  line-height: 20px !important;
  color: grey !important;
  font-weight: bold;
  text-align: center !important;
}

div.my_select_class
  div.v-list
  >>> div.v-list-item
  .v-list-item__content
  .v-list-item__title {
  font-size: 1.2em !important;
}
</style>
