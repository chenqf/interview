<template>
  <div class="m20 p20 bg-green">
    <p>parentValue:{{ parentValue }}</p>
    <c2
      class="flex1"
      :rootValue="rootValue"
      :parentValue="parentValue"
      @update:rootValue="$emit('update:rootValue', $event)"
      @update:parentValue="parentValue = $event"
    ></c2>
  </div>
</template>
<script>
import C2 from "./c2";
export default {
  props: ["rootValue"],
  data() {
    return {
      parentValue: 1
    };
  },
  created() {},

  methods: {},
  components: {
    C2
  },
  watch: {}
};
</script>
<style lang="scss" scoped></style>
