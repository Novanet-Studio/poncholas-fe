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
						:items="dropdown_size"
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
			<figure v-if="!customItem">
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
		}),
	},
	data() {
		return {
			quantity: 1,
			customItem: false,
			dropdown_fabric: [],
			dropdown_size: [],
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
		this.getCustomDetails();
	},

	methods: {
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
					console.log(btn);
					btn.style.border = "1px solid red";
				} else if (this.fabric === null && this.size !== null) {
					this.loading = false;

					continueAddToCart = false;

					this.$notify({
						group: "all",
						title: "¡Hay un error!",
						text: `Debes seleccionar una tela para continuar!`,
					});
					console.log(btn2);
					btn2.style.border = "1px solid red";
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
					this.$notify({
						group: "all",
						title: "¡Hay un error!",
						text: `Debes seleccionar una tela para continuar!`,
					});

					console.log(btn2);
					btn2.style.border = "1px solid red";
				}
			}

			return continueAddToCart;
		},
		async getCustomDetails() {
			const fabricResponse = await this.$store
				.dispatch("product/getFabricProducts")
				.then((res) => {
					return res;
				})
				.catch((er) => {
					console.log(er);
				});
			this.dropdown_fabric = fabricResponse.map((item) => {
				return {
					text: item.attributes.name,
					id: item.id,
				};
			});
			console.log("esta son las telas ===>", this.dropdown_fabric);
			const sizeResponse = await this.$store
				.dispatch("product/getSizeProducts")
				.then((res) => {
					return res;
				})
				.catch((er) => {
					console.log(er);
				});
			this.dropdown_size = sizeResponse.map((item) => {
				return {
					text: item.attributes.talla,
					id: item.id,
				};
			});
			console.log("esta son las tallas ===>", sizeResponse);
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
						console.log("el customItem ===>", findedItem);
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
					quantity: this.quantity,
					price: this.product.attributes.price,
					size: this.size,
					custom: this.customItem,
					fabric: "stock",
				};
				if (this.customItem === true && this.fabric !== null) {
					item.fabric = this.fabric;
				}
				console.log(item);

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
					queries.push(item.id);
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
				listOfIds.push(item.id);
			});
			await this.$store.dispatch("product/getCartProducts", listOfIds);
		},

		async loadCartProducts() {
			const cartItemsOnCookie = this.$cookies.get("cart", {
				parseJSON: true,
			});
			let queries = [];
			cartItemsOnCookie.cartItems.forEach((item) => {
				queries.push(item.id);
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
					size: this.size,
					custom: this.customItem,
					fabric: "stock",
				};
				if (this.customItem === true && this.fabric !== null) {
					item.fabric = this.fabric;
				}
				console.log(item);

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
