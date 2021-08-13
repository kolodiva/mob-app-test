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
    >
      <v-list nav>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item two-line>
            <v-list-item-avatar>
              <v-img src="/avatar_anonim.png" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Приветствуем Вас</v-list-item-title>
              <v-list-item-subtitle>Anonimus</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-title>Начать сначала</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Посмотреть историю</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
// const consola = require('consola')

export default {
  data: () => ({ drawer: false, group: null }),
  computed: {
    ...mapGetters({
      soundOff: "quiz/getSoundOff",
    }),
  },
  methods: {
    async switchSound() {
      await this.$store.dispatch("quiz/switchSound");
    },
  },
};
</script>
