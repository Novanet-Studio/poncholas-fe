<template lang="html">
	<div class="ps-product--cart-mobile">
		<div class="ps-product__thumbnail">
			<!-- <module-product-thumbnail-image :product="product" /> -->
			<nuxt-link to="`/product/${product.id}`">
				<img :src="`${product.image}`" :alt="`${product.name}`" class="img" />
			</nuxt-link>
		</div>
		<div class="ps-product__content">
			<a
				class="ps-product__remove"
				href="#"
				@click.prevent="handleRemoveProductFromCart(product)"
			>
				<i class="icon-cross"></i>
			</a>
			<nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
				{{ product.name && product.name }}
			</nuxt-link>
			<small v-if="product.quantity !== null">
				{{ product.quantity }} x {{ currency }} {{ product.price }}
			</small>
			<br />
			<small v-if="product.size"> size: {{ product.sizeName }} </small>
			<br />
			<small v-if="product.custom !== false">
				fabric: {{ product.fabricName }}
			</small>
		</div>
	</div>
</template>

<script>
import ModuleProductThumbnailImage from "@/components/elements/product/modules/ModuleProductThumbnailImage";
import ModuleProductTitle from "@/components/elements/product/modules/ModuleProductTitle";
import { mapState } from "vuex";
import { baseUrl } from "~/repositories/Repository";
export default {
	name: "ProductMiniCart",
	components: { ModuleProductTitle, ModuleProductThumbnailImage },
	props: {
		product: "",
		fabrics: "",
		sizes: "",
	},
	data() {
		return {
			productSize: null,
			productFabric: null,
		};
	},
	computed: {
		...mapState({
			total: (state) => state.cart.total,
			cartItems: (state) => state.cart.cartItems,
			cartProducts: (state) => state.product.cartProducts,
			currency: (state) => state.app.currency,
		}),
		// quantity() {
		// 	if (this.cartItems !== null) {
		// 		const cartItem = this.cartItems.find(
		// 			(item) => item.id === this.product.id
		// 		);
		// 		if (cartItem !== undefined) {
		// 			return cartItem.quantity;
		// 		} else {
		// 			return null;
		// 		}
		// 	} else {
		// 		return null;
		// 	}
		// },
		baseUrl() {
			return baseUrl;
		},
	},
	mounted() {
		// console.log(this.product);
		// console.log(this.cartItems);
		// console.log("los prop nuevis", this.fabrics, this.sizes);
		if (this.product.custom === true) {
			if (this.fabrics && this.fabrics.length > 0) {
				const item = this.fabrics.find(
					(item) => item.id === this.product.fabric
				);
				// console.log(item);
				this.productFabric = item.text;
			}
		}
		if (this.sizes && this.sizes.length > 0) {
			const item = this.sizes.find((item) => item.id === this.product.size);
			// console.log(item);
			this.productSize = item.text;
		}
	},
	methods: {
		async loadCartProducts() {
			const cookieCart = this.$cookies.get("cart", { parseJSON: true });
			let queries = [];
			cookieCart.cartItems.forEach((item) => {
				queries.push(item);
				// queries.push(item.id);
			});
			if (this.cartItems.length > 0) {
				// return console.log('==> desde product minicart',queries)
				const response = await this.$store.dispatch(
					"product/getCartProducts",
					queries
				);
				if (response) {
					this.$store.commit("cart/setLoading", false);
				}
			} else {
				this.$store.commit("product/setCartProducts", null);
			}
		},
		handleRemoveProductFromCart(product) {
			const cartItem = this.cartItems.find(
				(item) => item.fakeId === product.fakeId
			);
			this.$store.dispatch("cart/removeProductFromCart", cartItem);
			this.$store.commit("cart/setLoading", true);
			this.loadCartProducts();
		},
	},
};
</script>

<style lang="scss" scoped></style>
