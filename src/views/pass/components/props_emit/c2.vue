<template>
  <div class="m20 p20 bg-grey">
    <button @click="addParentValue">add parentValue</button>
    <button @click="addRootValue">add rootValue</button>
  </div>
</template>
<script>
export default {
  props: ["parentValue", "rootValue"],
  created() {},

  methods: {
    addRootValue() {
      this.$emit("update:rootValue", this.rootValue + 1);
    },
    addParentValue() {
      this.$emit("update:parentValue", this.parentValue + 1);
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
