<template>
  <v-card
    flat
    tile
    width="100%"
    height="100%"
    img="/background-picture.jpg"
    class="d-flex flex-column justify-start align-center"
  >
    <v-card-text style="font-size: 1.2rem" class="white--text">
      Теоретические основы Медицины на пальцах в 2 словах...
    </v-card-text>
  </v-card>
</template>

<script>
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
      ["Сухая теория", "theory", 0],
      ["Простой тест", "clickButton", 5],
      ["Почти простой тест", "clickButton", 10],
      ["НЕ Простой тест", "clickButton", 15],
    ],
  }),
  computed: {},

  mounted() {},

  methods: {},
};
</script>
