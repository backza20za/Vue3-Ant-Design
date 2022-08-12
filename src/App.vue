<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Header from "../src/components/Header.vue";
import { defineComponent, onMounted } from "vue";
import { useStore } from "./store";
export default defineComponent({
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("getBook");
    });
    return {};
  },
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
