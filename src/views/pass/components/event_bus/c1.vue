<template>
  <div class="m20 p20 bg-green">
    <p>I'm c1.</p>
    <button @click="changeVal">change c1 value</button>
    <p>currentVal:{{ currentVal }}</p>
    <p>c2 value:{{ otherVal }}</p>
  </div>
</template>
<script>
import EventBus from "./event.bus";
export default {
  data() {
    return {
      currentVal: 1,
      otherVal: null
    };
  },
  created() {
    EventBus.$on("c2", val => {
      console.log("监听到c2");
      this.otherVal = val;
    });
    this.$nextTick().then(() => {
      EventBus.$emit("c1", this.currentVal);
    });
  },
  beforeDestroy() {
    EventBus.$off("c2");
  },
  methods: {
    changeVal() {
      this.currentVal++;
    }
  },
  watch: {
    currentVal(val) {
      EventBus.$emit("c1", this.currentVal);
    }
  }
};
</script>
<style lang="scss" scoped></style>
