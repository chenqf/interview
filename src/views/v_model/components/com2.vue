<template>
  <cc-block title="验证组件的v-model 自定义v-model">
    <div class="container">
      当前otherValue:{{ otherValue }}<br /><button @click="addOtherValue">
        add otherValue
      </button>
    </div>
  </cc-block>
</template>
<script>
export default {
  props: ["otherValue"],
  model: {
    prop: "otherValue",
    event: "otherEvent"
  },
  methods: {
    addOtherValue() {
      this.$emit("otherEvent", this.otherValue + this.otherValue);
    }
  }
};
</script>
<style lang="scss" scoped></style>
