<template>
  <div>
    <a-list
      class="demo-loadmore-list"
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="cart2.getCart"
      style="padding: 15px"
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
        <a-list-item style="background-color: #cccecc; padding: 20px">
          <template #actions></template>
          <!-- <a-skeleton avatar :title="false" :loading="!!item.loading" active> -->
          <a-list-item-meta
            :description="`
            ${item.price}฿
          `"
          >
            <template #title>
              {{ item.title }}
            </template>
            <template #avatar>
              <!-- <a-avatar :src="item.picture.large" /> -->
              <img width="50" alt="logo" :src="item.images.jpeg" />
            </template>
          </a-list-item-meta>

          <div>x{{ item.count }}</div>

          <!-- </a-skeleton> -->
        </a-list-item>
      </template>
    </a-list>
    <br /><br /><br /><br /><br /><br />
    <div
      style="
        bottom: 0;
        position: fixed;
        width: 100%;
        background-color: white;
        border: solid #dcdcdc;
      "
    >
      <a-row type="flex" v-if="cart2.getDiscount > 0">
        <a-col :flex="3">
          <h4>Promotion : {{ promotion.type }}</h4>
          <p>{{ promotion.name }}</p>
          discount : {{ parseInt(cart2.getDiscount) }}%
        </a-col>
        <a-col :flex="2">
          <del>{{ cart2.getPrice.toFixed(2) }} ฿</del>&nbsp;
          <p>
            {{
              (
                cart2.getPrice -
                (parseFloat(cart2.getPrice) * parseFloat(cart2.getDiscount)) /
                  100
              ).toFixed(2)
            }}
            ฿
          </p>
          <hr />
          <p>
            {{
              (
                (parseFloat(cart2.getPrice) * parseFloat(cart2.getDiscount)) /
                100
              ).toFixed(2)
            }}
            ฿
          </p>
        </a-col>
      </a-row>
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
            {{
              (
                cart2.getPrice -
                (parseFloat(cart2.getPrice) * parseFloat(cart2.getDiscount)) /
                  100
              ).toFixed(2)
            }}
            ฿
          </p>
        </a-col>
        <a-col :flex="1">
          <a-button
            @click="comfirm"
            type="primary"
            block
            style="min-height: 100%"
            >PaymentNow</a-button
          >
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import { useStore } from "../store";
import router from "../router";
export default defineComponent({
  components: {
    DeleteOutlined,
  },
  setup() {
    const initLoading = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const store = useStore();
    const allPrice = ref<number>(0);
    const value = ref<string>("");

    const cart = ref(store.getters.getCart);
    const cart2 = ref(store.getters);
    const promotion = reactive(store.getters.getPromotion);
    const data = reactive(cart);
    const list = reactive(cart);

    const comfirm = () => {
      router.push("/complete");
    };
    return {
      loading,
      cart2,
      initLoading,
      data,
      list,
      value,
      allPrice,
      store,
      promotion,
      comfirm,
    };
  },
});
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
