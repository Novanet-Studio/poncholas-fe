<template lang="html">
  <div class="">
    <div class="ps-product__shopping los--drop">
      <div
        class="div--overflow-btn-custom"
        v-if="customItem"
        id="fabric--container"
      >
        <v-container id="fabric" class="el--drop">
          <v-overflow-btn
            class="my-2"
            :items="dropdown_fabric"
            label="Selecciona la tela"
            item-value="id"
            item-text="text"
            dense
            editable
            v-model="fabric"
            >hola
          </v-overflow-btn>
        </v-container>
      </div>
      <div class="div--overflow-btn-custom" id="size--container">
        <v-container id="size" class="el--drop">
          <v-overflow-btn
            class="my-3"
            :items="getRealSize()"
            label="selecciona la talla"
            item-value="id"
            item-text="text"
            dense
            id="size-btn"
            editable
            v-model="size"
          ></v-overflow-btn>
        </v-container>
      </div>
    </div>
    <div class="ps-product__shopping">
      <figure>
        <figcaption>Cantidad</figcaption>
        <div class="form-group--number">
          <button class="up" @click.prevent="handleIncreaseQuantity">
            <i class="fa fa-plus"></i>
          </button>
          <button class="down" @click.prevent="handleDescreaseQuantity">
            <i class="fa fa-minus"></i>
          </button>
          <input v-model="quantity" class="form-control" type="text" disabled />
        </div>
      </figure>
      <a
        v-if="loading === false"
        class="ps-btn ps-btn--black"
        href="#"
        @click.prevent="handleAddToCart"
      >
        Agregar al carrito
      </a>
      <a
        v-if="loading === false"
        class="ps-btn"
        href="#"
        @click.prevent="handleAddToCart(true)"
      >
        Comprar
      </a>
      <div v-if="loading === false" class="ps-product__actions ">
        <a
          href="#"
          title="Add to wishlist"
          @click.prevent="handleAddItemToWishlist()"
        >
          <i class="icon-heart"></i>
        </a>
      </div>
      <loading v-if="loading === true" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "~/components/elements/commons/Loading";

export default {
  name: "ModuleProductShopping",
  components: { Loading },
  props: {
    product: "",
  },
  computed: {
    ...mapState({
      cartItems: (state) => state.cart.cartItems,
      dropdown_size: (state) => state.app.sizes,
      dropdown_fabric: (state) => state.app.fabrics,
    }),
    // dropdown_fabric() {
    // 	const response = this.$cookies.get("fabrics", { parseJSON: true });
    // 	if (response.data.length > 0) {
    // 		return response.data.map((item) => {
    // 			return {
    // 				text: item.attributes.name,
    // 				id: item.id,
    // 			};
    // 		});
    // 	}
    // },
    // dropdown_size() {
    // 	const response = this.$cookies.get("sizes", { parseJSON: true });
    // 	if (response.data.length > 0) {
    // 		return response.data.map((item) => {
    // 			return {
    // 				text: item.attributes.talla,
    // 				id: item.id,
    // 			};
    // 		});
    // 	}
    // },
  },
  data() {
    return {
      quantity: 1,
      customItem: false,
      // dropdown_fabric: [],
      // dropdown_size: [],
      fabric: null,
      size: null,
      loading: false,
    };
  },
  mounted() {
    // console.log(this.product)
    if (
      this.product.attributes.category.data.attributes.name === "Personalizada"
    ) {
      this.customItem = true;
    }
    // this.getCustomDetails();
  },

  methods: {
    getRealSize() {
      const productName = this.product.attributes.name.toLowerCase();
      if (productName === "niños") {
        const boysAllowedSizes = ["6", "7", "8", "9", "10"];
        const sizes = this.dropdown_size
          .filter((item) => boysAllowedSizes.includes(item.text))
          .sort((a, b) => a.text - b.text);

        return sizes;
      }

      if (productName.includes("adultos")) {
        const allowedSizes = ["12", "S", "M", "L"];

        const sizes = this.dropdown_size.filter((item) =>
          allowedSizes.includes(item.text)
        );

        return sizes;
      }

      return this.dropdown_size;
    },
    validateItem() {
      this.loading = true;
      //validations
      var continueAddToCart = false;
      const btn = document.getElementById("size").childNodes[0].children[0]
        .children[0];
      var btn2 = null;
      if (this.customItem === true) {
        btn2 = document.getElementById("fabric").childNodes[0].children[0]
          .children[0];
        btn2.style.border = "none";
      }
      btn.style.border = "none";
      if (this.customItem === false) {
        if (this.size !== null) {
          //la talla se ha seleccionado y no es un item custom
          continueAddToCart = true;
        } else {
          this.loading = false;
          continueAddToCart = false;
          this.$notify({
            group: "all",
            title: "¡Hay un error!",
            text: `Debes seleccionar una talla para continuar!`,
          });
          console.log(btn);
          btn.style.border = "1px solid red";
        }
      } else if (this.customItem === true) {
        //la talla se ha seleccionado y el item si es custom
        if (this.fabric !== null && this.size !== null) {
          continueAddToCart = true;
        } else if (this.fabric !== null && this.size === null) {
          this.loading = false;

          continueAddToCart = false;
          this.$notify({
            group: "all",
            title: "¡Hay un error!",
            text: `Debes seleccionar una talla para continuar!`,
          });
          // console.log(btn);
          btn.style.border = "1px solid red";
        } else if (this.fabric === null && this.size !== null) {
          this.loading = false;

          continueAddToCart = false;

          this.$notify({
            group: "all",
            title: "¡Hay un error!",
            text: `Debes seleccionar una tela para continuar!`,
          });
          // console.log(btn2);
          btn2.style.border = "1px solid red";
        } else {
          this.loading = false;

          continueAddToCart = false;

          this.$notify({
            group: "all",
            title: "¡Hay un error!",
            text: `Debes seleccionar una talla para continuar!`,
          });

          // console.log(btn);
          btn.style.border = "1px solid red";
          this.$notify({
            group: "all",
            title: "¡Hay un error!",
            text: `Debes seleccionar una tela para continuar!`,
          });

          // console.log(btn2);
          btn2.style.border = "1px solid red";
        }
      }

      return continueAddToCart;
    },
    addNameDetails(sizeId, fabricId) {
      const findedSize = this.dropdown_size.find((item) => item.id === sizeId);
      var findedFabric;
      // console.log(fabricId);
      if (fabricId === null) {
        findedFabric = {
          text: "stock",
        };
      } else {
        findedFabric = this.dropdown_fabric.find(
          (item) => item.id === fabricId
        );
      }
      var responseDetail = {
        sizeName: findedSize.text,
        fabricName: findedFabric.text,
      };
      return responseDetail;
    },
    handleIncreaseQuantity() {
      this.quantity++;
    },

    handleDescreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    handleAddToCart(isBuyNow) {
      //validations
      var continueAddToCart = this.validateItem();

      if (continueAddToCart === true) {
        const cartItemsOnCookie = this.$cookies.get("cart", {
          parseJSON: true,
        });
        let existItem;
        if (this.customItem === false) {
          // si no es un item custom revisar si el item ya esta en el carrito
          if (cartItemsOnCookie) {
            const findedItem = cartItemsOnCookie.cartItems.find(
              (item) => item.id === this.product.id
            );
            // verificar que este producto no sea custom
            // console.log("el customItem ===>", findedItem);
            if (findedItem && findedItem.customItem === false) {
              existItem = findedItem;
            }
            // existItem = cartItemsOnCookie.cartItems.find(
            //     (item) => item.id === this.product.id
            // );
          }
        }

        let item = {
          id: this.product.id,
          fakeId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
          quantity: this.quantity,
          price: this.product.attributes.price,
          size: this.size,
          sizeName: this.addNameDetails(this.size, this.fabric).sizeName,
          fabricName: this.addNameDetails(this.size, this.fabric).fabricName,
          custom: this.customItem,
          fabric: "stock",
          name: this.product.attributes.name,
          image: this.product.attributes.images.data[0].attributes.url,
        };

        if (this.customItem === true && this.fabric !== null) {
          item.fabric = this.fabric;
        }
        // console.log(item);

        if (existItem !== undefined) {
          if (this.quantity + existItem.quantity > 10) {
            this.loading = false;

            this.$notify({
              group: "all",
              title: "Waring!",
              text: `Can't add more than 10 items`,
            });
          } else {
            this.addItemToCart(item);
            if (isBuyNow && isBuyNow === true) {
              setTimeout(
                function() {
                  this.$router.push("/account/checkout");
                }.bind(this),
                500
              );
              this.loading = false;
            }
          }
        } else {
          this.addItemToCart(item);
          if (isBuyNow && isBuyNow === true) {
            setTimeout(
              function() {
                this.$router.push("/account/checkout");
              }.bind(this),
              500
            );
            this.loading = false;
          }
        }
      }
    },

    async addItemToCart(payload) {
      this.$store.dispatch("cart/addProductToCart", payload);
      // this.getCartProduct(this.cartItems);
      let queries = [];
      if (this.cartItems.length > 0) {
        this.cartItems.forEach((item) => {
          queries.push(item);
        });
      }
      var respuesta = await this.$store.dispatch(
        "product/getCartProducts",
        queries
      );

      this.$notify({
        group: "all",
        title: "¡Producto agregado!",
        text: `${this.product.attributes.name} ha sido agregado al carrito!`,
      });
      this.size = null;
      this.fabric = null;
      this.quantity = 1;
      this.loading = false;
    },

    async getCartProduct(products) {
      let listOfIds = [];
      products.forEach((item) => {
        listOfIds.push(item);
      });
      await this.$store.dispatch("product/getCartProducts", listOfIds);
    },

    async loadCartProducts() {
      const cartItemsOnCookie = this.$cookies.get("cart", {
        parseJSON: true,
      });
      let queries = [];
      cartItemsOnCookie.cartItems.forEach((item) => {
        queries.push(item);
      });
      if (this.cartItems.length > 0) {
        await this.$store.dispatch("product/getCartProducts", queries);
      } else {
        this.$store.commit("product/setCartProducts", null);
      }
    },
    handleAddItemToWishlist() {
      const continueAddToWisht = this.validateItem();
      // let item = {
      // 	id: this.product.id,
      // };
      if (continueAddToWisht === true) {
        let item = {
          id: this.product.id,
          fakeId: Math.floor(Math.random() * (999 - 100 + 1) + 100),
          size: this.size,
          custom: this.customItem,
          fabric: "stock",
          name: this.product.attributes.name,
          sizeName: this.addNameDetails(this.size, this.fabric).sizeName,
          fabricName: this.addNameDetails(this.size, this.fabric).fabricName,
          quantity: this.quantity,
          price: this.product.attributes.price,
          image: this.product.attributes.images.data[0].attributes.url,
        };

        if (this.customItem === true && this.fabric !== null) {
          item.fabric = this.fabric;
        }
        // console.log(item);

        this.$store.dispatch("wishlist/addItemToWishlist", item);
        this.$notify({
          group: "all",
          title: "¡Producto agregado!!",
          text: `${this.product.attributes.name} ha sido agregado a la lista de deseos!`,
        });
        this.size = null;
        this.fabric = null;
        this.quantity = 1;
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.los--drop {
  display: flex;
  // flex-direction: column !important;
  // flex-flow: unset !important;
}
.el--drop {
  width: 100%;
  // max-width: 300px;
  // margin: 0 auto;
  @media (min-width: 756px) {
    max-width: 275px !important;
  }
}
</style>
