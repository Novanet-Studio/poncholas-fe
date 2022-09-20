<template lang="html">
  <div class="ps-product">
    <div class="ps-product__thumbnail">
      <module-product-thumbnail-image :product="product" />
      <div v-if="isSale === true" class="ps-product__badge">Sale</div>
      <module-product-actions
        :product="product"
        @toParent="listenEventFromChildren"
      />
    </div>
    <div class="ps-product__container">
      <div class="ps-product__content">
        <module-product-title :product="product" />

        <module-product-price :product="product" />
      </div>
      <div class="ps-product__content hover">
        <module-product-title :product="product" />
        <module-product-price :product="product" />
      </div>
    </div>
    <v-dialog v-model="quickviewDialog" width="1200">
      <div class="ps-dialog">
        <a
          class="ps-dialog__close"
          @click.prevent="quickviewDialog = false"
          href=""
        >
          <i class="icon icon-cross"></i>
        </a>
        <product-quickview :product="product" :showAll="showAll" />
      </div>
    </v-dialog>
  </div>
</template>
<script>
import ModuleProductActions from "@/components/elements/product/modules/ModuleProductActions";
import ModuleProductPrice from "@/components/elements/product/modules/ModuleProductPrice";
import ModuleProductThumbnailImage from "@/components/elements/product/modules/ModuleProductThumbnailImage";
import ModuleProductTitle from "@/components/elements/product/modules/ModuleProductTitle";
import { mapState } from "vuex";
import ProductQuickview from "~/components/elements/detail/ProductQuickview";
import { baseUrl } from "~/repositories/Repository";
import Rating from "../Rating";

export default {
  components: {
    ModuleProductActions,
    ModuleProductThumbnailImage,
    ModuleProductPrice,
    ModuleProductTitle,
    ProductQuickview,
    Rating,
  },
  props: {
    product: "",
  },

  computed: {
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
      currency: (state) => state.app.currency,
    }),
    baseUrl() {
      return baseUrl;
    },
    isSale() {
      if (this.product.attributes.is_sale) {
        return true;
      }
      return false;
    },
  },
  data: () => ({
    productRating: 5,
    productModal: false,
    productPreload: true,
    isImageLoaded: false,
    quickviewDialog: false,
    showAll: true,
  }),
  methods: {
    listenEventFromChildren(payload) {
      // console.log("lo del dial", payload);
      if (payload.isQuickview === true) {
        this.quickviewDialog = true;
      }
      if (payload.all === true) {
        this.showAll = true;
      } else {
        this.showAll = false;
      }
    },
  },
};
</script>
