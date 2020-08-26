<template>
  <div>
    <p>{{ name }}</p>
    <p>{{ value }}</p>
    <button @click="add">add</button>
  </div>
</template>
<script>
export default {
  props: ["name", "value"],
  data() {
    return {
      num: 0
    };
  },
  methods: {
    add() {
      this.num++;
    }
  }
};
</script>
<style lang="scss" scoped></style>
