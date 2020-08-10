<template>
  <div class="m20 p20 bg-grey">
    <p>I'm c2.</p>
    <button @click="changeVal">change c2 value</button>
    <p>currentVal:{{ currentVal }}</p>
    <p>c1 value:{{ otherVal }}</p>
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
    EventBus.$on("c1", val => {
      console.log("监听到c1");
      this.otherVal = val;
    });
    this.$nextTick().then(() => {
      EventBus.$emit("c2", this.currentVal);
    });
  },
  beforeDestroy() {
    EventBus.$off("c1");
  },
  methods: {
    changeVal() {
      this.currentVal++;
    }
  },
  watch: {
    currentVal(val) {
      EventBus.$emit("c2", this.currentVal);
    }
  }
};
</script>
<style lang="scss" scoped></style>
