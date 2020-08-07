<template>
  <div>
    <dom></dom>
    <com v-model="comVal" :value2="comVal2" @input2="comVal2 = $event"></com>
    <com2 v-model="comVal3"></com2>
  </div>
</template>

<script>
import Dom from "./components/dom.vue";
import Com from "./components/com.vue";
import Com2 from "./components/com2.vue";
export default {
  data() {
    return { comVal: 1, comVal2: 1, comVal3: 1 };
  },
  components: {
    Dom,
    Com,
    Com2
  }
};
</script>

<style lang="scss" scoped></style>
