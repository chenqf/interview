<template>
  <div>
    <event-bus></event-bus>
    <props-emit></props-emit>
    <attrs-listeners></attrs-listeners>
    <provide-inject></provide-inject>
  </div>
</template>
<script>
import EventBus from "./components/event_bus/index";
import PropsEmit from "./components/props_emit/index";
import AttrsListeners from "./components/attrs_listeners/index";
import ProvideInject from "./components/provide_inject/index";
export default {
  components: {
    EventBus,
    PropsEmit,
    AttrsListeners,
    ProvideInject
  }
};
</script>
<style lang="scss" scoped></style>
