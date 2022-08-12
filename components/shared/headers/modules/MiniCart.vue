<template lang="html">
	<div class="ps-cart--mini">
		<div>
			<a class="header__extra" href="#" @click="loadCartProducts">
				<i class="icon-bag2"></i>
				<span>
					<i>{{ total }}</i>
				</span>
			</a>
			<div v-if="total > 0" class="ps-cart__content">
				<div class="ps-cart__items">
					<template v-if="loading === true">
						<loading />
					</template>
					<template v-else-if="cartItems.length > 0">
						<ProductMiniCart
							v-for="product in cartItems"
							:key="product.fakeId"
							:product="product"
							:fabrics="fabrics"
							:sizes="sizes"
						/>
						<!-- <ProductMiniCart
							v-for="product in cartProducts.data"
							:key="product.id"
							:product="product"
						/> -->
					</template>
				</div>
				<div class="ps-cart__footer">
					<h3>
						{{ $t("header.miniCart.subTotal") }}
						<strong>${{ amount }}</strong>
					</h3>
					<figure>
						<div>
							<nuxt-link to="/account/shopping-cart" class="ps-btn">
								Ver carrito
							</nuxt-link>
						</div>
						<div>
							<nuxt-link to="/account/checkout" class="ps-btn">
								Pagar
							</nuxt-link>
						</div>
					</figure>
				</div>
			</div>
			<div v-else class="ps-cart__content">
				<div class="ps-cart__items no-products">
					{{ $t("header.miniCart.noProduct") }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Loading from "~/components/elements/commons/Loading";
import ProductMiniCart from "~/components/elements/product/ProductMiniCart";
import { baseUrl } from "~/repositories/Repository";

export default {
	name: "MiniCart",
	components: { Loading, ProductMiniCart },
	data() {
		return {
			fabrics: null,
			sizes: null,
		};
	},
	computed: {
		...mapState({
			total: (state) => state.cart.total,
			idk: (state) => state.cart,
			amount: (state) => state.cart.amount,
			loading: (state) => state.cart.loading,
			cartItems: (state) => state.cart.cartItems,
			cartProducts: (state) => state.product.cartProducts,
		}),
		baseUrl() {
			return baseUrl;
		},
	},
	async mounted() {
		await this.getDetails();

		console.log("desde mini cart", this.cartProducts, this.idk, this.cartItems);
		console.log("desde mini cart detalles", this.fabrics, this.sizes);
	},
	methods: {
		async getDetails() {
			const fabricResponse = await this.$store
				.dispatch("product/getFabricProducts")
				.then((res) => {
					return res;
				})
				.catch((er) => {
					console.log(er);
				});
			this.fabrics = fabricResponse.map((item) => {
				return {
					text: item.attributes.name,
					id: item.id,
				};
			});
			const sizeResponse = await this.$store
				.dispatch("product/getSizeProducts")
				.then((res) => {
					return res;
				})
				.catch((er) => {
					console.log(er);
				});
			this.sizes = sizeResponse.map((item) => {
				return {
					text: item.attributes.talla,
					id: item.id,
				};
			});
		},
		async loadCartProducts() {
			// console.log('di click', this.cartProducts)
			const cookieCart = this.$cookies.get("cart", { parseJSON: true });
			let queries = [];
			if (cookieCart !== undefined) {
				cookieCart.cartItems.forEach((item) => {
					// queries.push(item.id);
					queries.push(item);
				});
				if (this.cartItems.length > 0) {
					// return console.log('==> desde minicart',queries)
					const response = await this.$store.dispatch(
						"product/getCartProducts",
						queries
					);
					// console.log(response)
					if (response) {
						this.$store.commit("cart/setLoading", false);
						// this.cartProducts = response;
					}
				} else {
					this.$store.commit("product/setCartProducts", null);
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.ps-cart__items {
	min-height: 150px;
	&.no-products {
		min-height: 50px;
	}
}
.ps-cart__footer {
	figure {
		display: flex;
		flex-flow: row nowrap;
		margin-right: 0 -5px;

		> * {
			flex-basis: 100%;
			max-width: 50%;
			padding: 0 5px;
		}

		.ps-btn {
			width: 100%;
			text-align: center;
		}
	}
}
</style>
