<template>
  <v-app>
    <v-app-bar
      absolute
      app
      color="blue darken-3"
      dark
      dense
      inverted-scroll
      scroll-target="#scrolling-techniques-8"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Gonoreya</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="volumeHigh = !volumeHigh"
        ><v-icon>{{
          volumeHigh ? "mdi-volume-high" : "mdi-volume-mute"
        }}</v-icon></v-btn
      >
    </v-app-bar>

    <v-sheet
      id="scrolling-techniques-8"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px"> </v-container>
    </v-sheet>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      disable-route-watcher
    >
      <v-list nav dense>
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
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
export default {
  data: () => ({ drawer: false, group: null, volumeHigh: true }),
};
</script>
