<template>
  <v-app>
    <v-app-bar absolute app color="teal darken-2" dark dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer />
      <v-btn icon @click.stop="switchSound"
        ><v-icon>{{
          soundOff === true ? "mdi-volume-mute" : "mdi-volume-high"
        }}</v-icon></v-btn
      >
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      disable-route-watcher
      src="/background-picture2.jpg"
      dark
    >
      <v-list nav shaped>
        <v-list-item-group v-model="group">
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-img src="/avatar_anonim.png" style="background-color: white" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title style="font-size: 1.2rem"
                >Приветствуем Вас</v-list-item-title
              >
              <v-list-item-subtitle style="font-size: 1.2rem"
                >Anonimus</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item
            :disabled="this.$route && this.$route.name === 'index'"
            @click="startAgain"
          >
            <v-list-item-title style="font-size: 1.2rem"
              >Начать сначала</v-list-item-title
            >
          </v-list-item>
          <v-list-item nuxt to="/" @click="drawer = false">
            <v-list-item-title style="font-size: 1.2rem"
              >Посмотреть историю</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <Nuxt />
    </v-main>

    <v-dialog v-model="dialogStartPage" persistent max-width="290">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="text-h5">
          Вы хотите начать<br />сначала?
        </v-card-title>
        <v-card-text
          >Результаты Вашего текущего теста будут преданы забвенью.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="resModalQuest(0)">
            Не стоит
          </v-btn>
          <v-btn color="green darken-1" text @click="resModalQuest(1)">
            Сначала
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
// const consola = require('consola')

export default {
  data: () => ({ drawer: false, group: null, dialogStartPage: false }),
  computed: {
    ...mapGetters({
      soundOff: "quiz/getSoundOff",
    }),
  },
  methods: {
    resModalQuest(idx) {
      this.dialogStartPage = false;
      if (idx === 1) {
        this.$router.push({
          path: "/",
        });
      }
    },
    startAgain() {
      this.drawer = !this.drawer;
      this.dialogStartPage = true;
    },
    async switchSound() {
      await this.$store.dispatch("quiz/switchSound");
    },
  },
};
</script>
