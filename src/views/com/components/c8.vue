<template>
  <c7 :title="item.title" :list="item.list"> </c7>
</template>
<script>
// import c7 from "./c7";
export default {
  props: ["item"],
  components: {
    c7: () => import("./c7.vue")
  }
};
</script>
<style lang="scss" scoped></style>
