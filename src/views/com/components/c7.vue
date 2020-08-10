<template>
  <div>
    <p>{{ title }}</p>
    <c8 v-for="item in list" :key="item.key" :item="item"></c8>
    <div v-once>
      <!-- any -->
    </div>
  </div>
</template>
<script>
import c8 from "./c8";
export default {
  props: ["title", "list"],
  components: {
    c8
  }
};
</script>
<style lang="scss" scoped></style>
