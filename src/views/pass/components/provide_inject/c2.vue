<template>
  <div>
    <div class="m20 p20 bg-red">inject num: {{ num }}</div>
  </div>
</template>
<script>
export default {
  inject: ["num"]
};
</script>
<style lang="scss" scoped></style>
