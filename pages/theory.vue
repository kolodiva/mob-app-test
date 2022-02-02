<template>
  <v-sheet class="d-flex flex-column justify-start align-center">
    <v-card shaped width="90%" class="mt-3">
      <v-card-text style="font-size: 1.1rem">
        <span style="font-weight: bold">Введение:</span><br />
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text style="font-size: 1.1rem">
        <span
          >“Грамотность вообще и медицинская грамотность в частности – это
          фундаментальные составляющие всех усилий по достижению здоровья и
          благополучия в современном обществе”</span
        ><br /><br /><span
          >Zsuzsanna Jakab Директор Европейского регионального бюро ВОЗ</span
        ><br /><br />
        Опыт США, стран Европейского союза, Всемирной организации
        здравоохранения, а также специалистов ФГБУ «Национальный медицинский
        исследовательский центр терапии и профилактической медицины» Минздрава
        России говорит как о недостатке инструментов по измерению грамотности в
        вопросах здоровья в Российской Федерации, так и о низком уровне
        медицинской грамотности во всем мире.
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
