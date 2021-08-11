<template>
  <v-card
    flat
    width="100%"
    height="100%"
    img="/background-picture.jpg"
    class="d-flex flex-column justify-space-around align-center"
  >
    <v-btn width="50%" color="primary" @click="$sounds.gun.play">Теория</v-btn>
    <v-btn width="50%" color="primary" @click="$sounds.gun.play"
      >Простой тест</v-btn
    >
    <v-btn width="50%" color="primary" @click="$sounds.gun.play"
      >Средний тест</v-btn
    >
    <v-btn width="50%" color="primary" @click="$sounds.gun.play"
      >Сложный тест</v-btn
    >
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
