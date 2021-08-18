<template>
  <v-card
    flat
    tile
    width="100%"
    height="100%"
    img="/background-picture.jpg"
    class="d-flex flex-column justify-start align-center"
  >
    <v-card dark width="90%" class="mt-3">
      <v-card-text style="font-size: 1.1rem" class="">
        Теоретические основы Медицины на пальцах в 2 словах...
      </v-card-text>
    </v-card>
    <v-card light width="90%" class="mt-3">
      <v-card-text style="font-size: 1.1rem" class="">
        Медицине более 1000 лет. Ее усилия сосредоточены на увеличении
        продолжительности жизни человека и что еще более важно ее качества.
      </v-card-text>
    </v-card>
    <v-card dark width="90%" class="mt-3">
      <v-card-text style="font-size: 1.1rem" class="">
        В идеале Человек хотел бы, продожая веселиться всю свою жизнь в полной
        мере, делать это хотя бы еще 100 лет.
      </v-card-text>
    </v-card>
    <v-card light width="90%" class="mt-3">
      <v-card-text style="font-size: 1.1rem" class="">
        Воевать, курить табак, употреблять вино, размножаться и много думать.
        Это серьезный вызов всей современной медицине, как бы кто ни говорил.
      </v-card-text>
    </v-card>
    <v-card dark width="90%" class="mt-3">
      <v-card-text style="font-size: 1.1rem" class="">
        Именно поэтому последующие 5-10 лет Вы будете детально изучать эту сферу
        деятельности и возможно внесете свою лепту в это великолепие. Удачи Вам
        в этом нелегком труде...
      </v-card-text>
    </v-card>
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
