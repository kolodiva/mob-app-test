<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
export default {
  data: () => ({ drawer: null }),
};
</script>

<style lang="scss">
body,
html {
  max-width: 100%;
  overflow-x: hidden;
}
</style>
