<template>
  <div
    class="components-page-header-demo-content"
    style="
      background-color: #bbf799;
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 1;
    "
  >
    <a-page-header
      title="Vue3"
      class="site-page-header"
      sub-title="Book Shop Ant-Design"
      :avatar="{
        src: '/vite.svg',
      }"
      @back="Home"
    >
      <template #extra>
        <a-button
          type="text"
          @click="
            checkCart({
              cartCount: cart.getCount,
              type: 'warning',
            })
          "
        >
          <a-badge :count="cart.getCount">
            <ShoppingCartOutlined :style="{ fontSize: '25px' }" />
          </a-badge>
        </a-button>
      </template>
    </a-page-header>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, h } from "vue";
import { notification } from "ant-design-vue";

import { ShoppingCartOutlined, WarningOutlined } from "@ant-design/icons-vue";
import { useStore } from "../store";
import { NotiData } from "../types/component.type";
import router from "../router";
export default defineComponent({
  components: {
    ShoppingCartOutlined,
    WarningOutlined,
  },
  setup() {
    const store = useStore();
    const cart = ref(store.getters);

    const Home = () => {
      router.push("/");
    };
    const checkCart = (value: NotiData) => {
      if (value.cartCount !== 0) {
        router.push("/checkcart");
      } else {
        notification.open({
          message: "No item Selected",
          description: "Please add items to your basket for payment.",
          icon: () => h(WarningOutlined, { style: "color: #FFCC33" }),
        });
      }
    };

    return {
      cart,
      Home,
      checkCart,
    };
  },
});
</script>
<style scoped>
#components-page-header-demo-content .image {
  margin: 0 0 0 60px;
  display: flex;
  align-items: center;
}

#components-page-header-demo-content .ant-page-header-rtl .image {
  margin: 0 60px 0 0;
}

#components-page-header-demo-content .example-link {
  line-height: 24px;
  margin-right: 16px;
}
[data-theme="compact"] #components-page-header-demo-content .example-link {
  line-height: 20px;
}
#components-page-header-demo-content .example-link-icon {
  margin-right: 8px;
}

[data-theme="compact"] #components-page-header-demo-content .example-link-icon {
  width: 20px;
  height: 20px;
}

#components-page-header-demo-content .ant-page-header-rtl .example-link {
  float: right;
  margin-right: 0;
  margin-left: 16px;
}
#components-page-header-demo-content .ant-page-header-rtl .example-link-icon {
  margin-right: 0;
  margin-left: 8px;
}
#components-page-header-demo-content .content p {
  margin-bottom: 1em;
  color: rgba(0, 0, 0, 0.85);
  overflow-wrap: break-word;
}

@media (max-width: 768px) {
  #components-page-header-demo-content .image {
    flex: 100%;
    margin: 24px 0 0;
  }
}
</style>
