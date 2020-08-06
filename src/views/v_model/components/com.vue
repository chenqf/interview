<template>
  <div class="container">
    <p class="title">验证组件的v-model</p>
    <div class="container">
      当前value:{{ value }}<br /><button @click="addValue">add value</button>
    </div>
    <div class="container">
      当前value2:{{ value2 }}<br /><button @click="addValue2">
        add value2
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["value", "value2"],
  methods: {
    addValue() {
      this.$emit("input", this.value + this.value);
    },
    addValue2() {
      this.$emit("input2", this.value2 + this.value2);
    }
  }
};
</script>
<style lang="scss" scoped></style>
