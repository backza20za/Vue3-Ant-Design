<template>
  <div style="padding-top: 20px">
    <a-row
      type="flex"
      :gutter="[16, 48]"
      style="display: flex; align-items: center; justify-content: center"
    >
      <a-col
        :xs="20"
        :sm="10"
        :md="8"
        :lg="7"
        :xl="5"
        v-for="(data, index) in books.getBooks"
        :key="index"
      >
        <a-card hoverable style="width: 100%; background-color: #f3f4ed">
          <template #cover>
            <img
              class="shop-img"
              alt="example"
              height="300"
              :src="data.images.jpeg"
            />
          </template>
          <a-card-meta :title="data.title">
            <template #description> Price : {{ data.price }}฿ </template>
          </a-card-meta>
          <br />
          <a-row :gutter="[16, 48]">
            <a-col :span="12"
              ><a-button
                type="primary"
                @click="
                  addtoCart({
                    id: books.getBooks[index].id,
                    title: books.getBooks[index].title,
                    author: books.getBooks[index].author,
                    price: books.getBooks[index].price,
                    count: 1,
                    description: books.getBooks[index].description,
                    images: books.getBooks[index].images,
                  })
                "
                >Add to cart</a-button
              ></a-col
            >
            <a-col :span="12"
              ><a-button
                @click="
                  showModal({
                    id: books.getBooks[index].id,
                    title: books.getBooks[index].title,
                    author: books.getBooks[index].author,
                    price: books.getBooks[index].price,
                    description: books.getBooks[index].description,
                    images: books.getBooks[index].images,
                  })
                "
                >Detail</a-button
              ></a-col
            >
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <!-- <a-button type="primary" @click="showModal">Open Modal</a-button> -->
    <a-modal
      v-model:visible="visible"
      :title="books.getDetail.title"
      @ok="handleOk"
    >
      <h4>{{ books.getDetail.author }}</h4>
      <center>
        <img :src="books.getDetail.images.jpeg" width="200" alt="" srcset="" />
      </center>
      <br />
      <p>{{ books.getDetail.description }}</p>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { TableOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";
import { useStore } from "../store";
import { bookType, cart } from "../types/books.type";
import router from "../router";
export default defineComponent({
  components: {
    TableOutlined,
    ShoppingCartOutlined,
  },
  setup() {
    const store = useStore();
    const books = ref(store.getters);
    const visible = ref<boolean>(false);

    const showModal = (value: bookType) => {
      visible.value = true;
      store.dispatch("addBookDetail", value);
    };

    const addtoCart = (value: cart) => {
      store.dispatch("addtoCart", value);
    };

    const handleOk = (e: MouseEvent) => {
      console.log(e);
      visible.value = false;
    };

    return {
      books,
      store,
      router,
      visible,
      showModal,
      handleOk,
      addtoCart,
    };
  },
});
</script>
