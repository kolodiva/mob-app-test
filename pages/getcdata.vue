<template>
  <client-only>
    <pre>
           {{ jsonObject }}
       </pre
    >
  </client-only>
</template>

<script>
export default {
  layout: "api",
  async fetch() {
    this.jsonObject = await this.$api("getcdata", {});
  },
  data: () => ({
    jsonObject: null,
  }),
  // computed: {},
  //
  // mounted() {},
  //
  // methods: {},
};
</script>
