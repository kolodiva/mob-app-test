<template>
  <v-btn @click="getParam">Тестить нечто</v-btn>
</template>

<script>
export default {
  layout: "test",

  data() {
    return {};
  },

  mounted() {},
  methods: {
    async getParam() {
      const rows = await this.$api("getParams", {
        param: "email_order_response",
      });
      console.log(rows.length, rows[0].content.email);
    },
  },
};
</script>

<style scoped></style>
