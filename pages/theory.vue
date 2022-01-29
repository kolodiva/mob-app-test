<template>
  <v-sheet class="d-flex flex-column justify-start align-center">
    <v-card v-for="(item, i) in rows" :key="i" shaped width="90%" class="mt-3">
      <v-card-text style="font-size: 1.2rem" class="">
        Тестовое задание № {{ i + 1 }}
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text style="font-size: 1.1rem">
        <span style="font-weight: bold">Симптоматика:</span><br />
        {{ item.quest }}
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text style="font-size: 1.1rem" class="pt-2">
        <span style="font-weight: bold">Болезнь:</span>
        {{ Object.keys(item.var1).find((key) => item.var1[key] === 1) }}
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
// import TheVideo1 from "@/components/TheVideo1.vue";

export default {
  async fetch() {
    this.rows = await this.$api("getInfo", {});
  },
  data: () => ({
    rows: null,
    backgroundColor: {
      backgroundColor: "#45f1e13b",
      color: "white",
      fontSize: "1.1rem",
    },
  }),
};
</script>

<style lang="scss" scoped>
.video-player-box {
  min-height: 200px;
}
</style>
