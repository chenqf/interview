<template>
  <div>
    <dom></dom>
    <com v-model="comVal" :value2="comVal2" @input2="comVal2 = $event"></com>
  </div>
</template>

<script>
import Dom from "./components/dom.vue";
import Com from "./components/com.vue";
export default {
  data() {
    return { comVal: 1, comVal2: 1 };
  },
  components: {
    Dom,
    Com
  }
};
</script>

<style lang="scss" scoped></style>
