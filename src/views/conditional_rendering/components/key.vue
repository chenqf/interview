<template>
  <div class="container">
    <p class="title">验证条件分支中key管理复用元素</p>
    <div class="m20">
      <template v-if="noKey.flg">
        <input style="color:red" type="text" />
        <input style="color:green" type="text" />
        <input style="color:blue" type="text" />
      </template>
      <template v-else>
        <input style="color:pink" type="text" />
        <span>间隔</span>
        <input style="color:grey" type="text" />
        <span>
          <input style="color:brown" type="text" />
        </span>
      </template>
      <button @click="changeNoKeyFlg">changeNoKeyFlg</button>
    </div>
    <div class="m20">
      <template v-if="hasKey.flg">
        <input key="1" style="color:red" type="text" />
      </template>
      <template v-else>
        <input key="2" style="color:blue" type="text" />
      </template>
      <button @click="changeHasKeyFlg">changeHasKeyFlg</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasKey: { flg: true },
      noKey: { flg: true }
    };
  },
  methods: {
    changeNoKeyFlg() {
      this.noKey.flg = !this.noKey.flg;
    },
    changeHasKeyFlg() {
      this.hasKey.flg = !this.hasKey.flg;
    }
  }
};
</script>
<style lang="scss" scoped>
input {
  margin: 10px;
}
</style>
