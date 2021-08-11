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
      width="60%"
      large
      rounded
      :style="backgroundColor"
      @click="$sounds.gun.play"
      >{{ item }}
    </v-btn>
    <div />
    <div />
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
    backgroundColor: { backgroundColor: "#45f1e13b", color: "white" },
    points: [
      "Немного теории",
      "Простой тест",
      "Почти простой тест",
      "НЕ Простой тест",
    ],
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>
