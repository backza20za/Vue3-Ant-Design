<template>
  <div>
    {{ count.getDetail }}

    <del>About</del>
    <button @click="add">clickm</button>
    <button @click="getBooks">getbooks</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "../store";
export default defineComponent({
  setup() {
    const store = useStore();
    const count = ref(store.getters);
    function add() {
      store.dispatch("increment");
    }
    const getBooks = async () => {
      store.dispatch("getBook");
    };
    return {
      add,
      count,
      getBooks,
    };
  },
});
</script>
