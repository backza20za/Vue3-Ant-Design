<template>
  <a-result
    status="success"
    title="Order Successfully"
    sub-title="Thank you for ordering books from us."
  >
    <template #extra>
      <a-button @click="goHome" type="primary">Go Shop</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import router from "../router";
import { useStore } from "../store";
export default defineComponent({
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("buySuccess");
    });
    const goHome = () => {
      router.push("/");
    };
    return {
      goHome,
    };
  },
});
</script>
