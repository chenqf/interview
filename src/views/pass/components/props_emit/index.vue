<template>
  <div>
    <cc-block title="验证props-$emit">
      <div>
        <p>rootValue:{{ rootValue }}</p>
        <c1
          class="flex1"
          :rootValue="rootValue"
          @update:rootValue="rootValue = $event"
        ></c1>
      </div>
    </cc-block>
  </div>
</template>
<script>
import C1 from "./c1";
export default {
  data() {
    return {
      rootValue: 1
    };
  },
  components: {
    C1
  }
};
</script>
<style lang="scss" scoped></style>
