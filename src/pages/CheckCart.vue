<template>
  <div style="min-height: 100vh">
    <a-list
      class="demo-loadmore-list"
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="cart2.getCart"
      style="padding: 10px"
    >
      <template #loadMore>
        <div
          v-if="!initLoading && !loading"
          :style="{
            textAlign: 'center',
            marginTop: '12px',
            height: '32px',
            lineHeight: '32px',
          }"
        ></div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item style="background-color: #f8f9ef">
          <template #actions>
            <a
              key="list-loadmore-edit"
              @click="
                dropBook({
                  id: item.id,
                  title: item.title,
                  author: item.author,
                  price: item.price,
                  count: item.count,
                  description: item.description,
                  images: item.images,
                })
              "
              ><DeleteOutlined style="color: red; font: 1.5em sans-serif"
            /></a>
          </template>
          <!-- <a-skeleton avatar :title="false" :loading="!!item.loading" active> -->
          <a-list-item-meta
            :description="`
          By : ${item.author}
            ${parseFloat(item.price).toFixed(2)}฿
          `"
          >
            <template #title>
              {{ item.title }}
            </template>
            <template #avatar>
              <!-- <a-avatar :src="item.picture.large" /> -->
              <img width="100" alt="logo" :src="item.images.jpeg" />
            </template>
          </a-list-item-meta>
          <a-button
            type="dashed"
            shape="circle"
            @click="
              addBookCount({
                id: item.id,
                title: item.title,
                author: item.author,
                price: item.price / item.count,
                count: 1,
                description: item.description,
                images: item.images,
              })
            "
            >+</a-button
          >
          <div style="width: 35px; margin: 2px">
            <a-input
              :value="item.count"
              style="text-align: center"
              size="small"
            />
          </div>
          <a-button
            type="dashed"
            shape="circle"
            @click="
              delBookCount({
                id: item.id,
                title: item.title,
                author: item.author,
                price: item.price / item.count,
                count: 1,
                description: item.description,
                images: item.images,
              })
            "
            >-</a-button
          >
          <div style="display: none">
            {{ allPrice + parseFloat(item.price) }}
          </div>
          <!-- </a-skeleton> -->
        </a-list-item>
      </template>
    </a-list>
    <div style="bottom: 0; position: fixed; width: 100%">
      <a-row type="flex">
        <a-col
          :flex="4"
          style="border-top: solid #f5f5f5; background-color: #f8f8ff"
        >
          <p
            style="
              padding-top: 10px;
              margin-right: 15px;
              display: flex;
              align-items: flex-end;
              justify-content: flex-end;
            "
          >
            Total
            <br />
            {{ cart2.getPrice.toFixed(2) }} ฿
          </p>
        </a-col>
        <a-col :flex="1">
          <a-button
            type="primary"
            block
            style="min-height: 100%"
            @click="
              confirm({
                cartCount: cart2.getCount,
                type: 'error',
              })
            "
            >payment ({{ cart2.getCount }})</a-button
          >
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, h } from "vue";
import { DeleteOutlined, CloseOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { useStore } from "../store";
import { NotiData } from "../types/component.type";
import { cart } from "../types/books.type";
import router from "../router";

export default defineComponent({
  components: {
    DeleteOutlined,
    CloseOutlined,
  },
  setup() {
    const initLoading = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const store = useStore();
    const allPrice = ref<number>(0);
    const value = ref<string>("");

    const cart = ref(store.getters.getCart);
    const cart2 = ref(store.getters);
    const data = reactive(cart);
    const list = reactive(cart);

    const confirm = async (value: NotiData) => {
      if (value.cartCount !== 0) {
        await store.dispatch("getPromotion");
        router.push("/confirm");
      } else {
        notification.open({
          message: "No item Selected",
          description: "Please add items to your cart for payment.",
          icon: () => h(CloseOutlined, { style: "color: #FF0000" }),
        });
      }
    };
    const dropBook = (value: cart) => {
      store.dispatch("dropBook", value);
    };
    const delBookCount = (value: cart) => {
      store.dispatch("delBookCount", value);
    };
    const addBookCount = (value: cart) => {
      store.dispatch("addBookCount", value);
    };

    return {
      loading,
      cart2,
      initLoading,
      data,
      list,
      value,
      allPrice,
      confirm,
      dropBook,
      delBookCount,
      addBookCount,
    };
  },
});
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
