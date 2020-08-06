<template>
  <div class="container">
    <p class="title">验证html元素的v-model</p>
    <input type="text" v-model="v1" /> 普通:[{{ v1 }}]<br />
    <input type="text" v-model.lazy="v2" /> lazy:[{{ v2 }}]<br />
    <input type="text" v-model.number="v3" /> number:[{{ v3 }}]<br />
    <input type="text" v-model.trim="v4" /> trim:[{{ v4 }}]<br />
    <input type="text" v-model.lazy.trim="v5" /> lazy.trim:[{{ v5 }}]<br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      v1: null,
      v2: null,
      v3: null,
      v4: null,
      v5: null
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped></style>
