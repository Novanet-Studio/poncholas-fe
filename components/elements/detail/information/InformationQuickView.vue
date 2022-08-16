<template lang="html">
	<div class="ps-product__info">
		<h1>{{ product.attributes.name }}</h1>
		<div class="ps-product__meta">
			<p>
				Tipo:
				<nuxt-link to="/shop">
					<a class="ml-2 text-capitalize">
						{{ product.attributes.category.data.attributes.name }}
					</a>
				</nuxt-link>
			</p>
			<div class="ps-product__rating">
				<rating />
				<span>(1 review)</span>
			</div>
		</div>
		<h4
			v-if="product.attributes.is_sale === true"
			class="ps-product__price sale"
		>
			<del class="mr-2"> $ {{ product.attributes.sale_price }}</del>
			${{ product.attributes.price }}
		</h4>

		<h4 v-else class="ps-product__price">${{ product.attributes.price }}</h4>
		<module-product-detail-desc :product="product" />
		<div class="ps-product__shopping los--drop">
			<div
				class="div--overflow-btn-custom"
				v-if="customItem"
				id="fabric--container"
			>
				<v-container id="fabricQuick" class="el--drop">
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
				<v-container id="sizeQuick" class="el--drop">
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
			<!-- <a class="ps-btn" href="#" @click.prevent="handleBuyNow(true)">
				Comprar
			</a> -->
			<a
				v-if="loading === false"
				class="ps-btn"
				href="#"
				@click.prevent="handleAddToCart(true)"
			>
				Comprar
			</a>
			<loading v-if="loading === true" />
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";

import ModuleProductDetailDesc from "~/components/elements/detail/information/modules/ModuleProductDetailDesc";
import Rating from "~/components/elements/Rating";
import Loading from "../../commons/Loading";
export default {
	name: "InformationQuickView",
	components: { ModuleProductDetailDesc, Rating, Loading },
	props: {
		product: {
			type: Object,
			default: {},
		},
	},
	computed: {
		...mapState({
			cartItems: (state) => state.cart.cartItems,
		}),
		dropdown_fabric() {
			const response = this.$cookies.get("fabrics", { parseJSON: true });
			if (response.data.length > 0) {
				return response.data.map((item) => {
					return {
						text: item.attributes.name,
						id: item.id,
					};
				});
			}
		},
		dropdown_size() {
			const response = this.$cookies.get("sizes", { parseJSON: true });
			if (response.data.length > 0) {
				return response.data.map((item) => {
					return {
						text: item.attributes.talla,
						id: item.id,
					};
				});
			}
		},
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
		if (
			this.product.attributes.category.data.attributes.name === "Personalizada"
		) {
			this.customItem = true;
		}
		console.log(this.dropdown_fabric);
		// this.getCustomDetails();
	},
	methods: {
		validateItem() {
			//validations
			this.loading = true;
			var continueAddToCart = false;
			var btn = null;
			btn = document.getElementById("sizeQuick").childNodes[0].children[0]
				.children[0];
			var btn2 = null;
			if (this.customItem === true) {
				btn2 = document.getElementById("fabricQuick").childNodes[0].children[0]
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
					btn.style.border = "1px solid red";
				} else if (this.fabric === null && this.size !== null) {
					this.loading = false;

					continueAddToCart = false;

					this.$notify({
						group: "all",
						title: "¡Hay un error!",
						text: `Debes seleccionar una tela para continuar!`,
					});
					btn2.style.border = "1px solid red";
				} else {
					this.loading = false;

					continueAddToCart = false;

					this.$notify({
						group: "all",
						title: "¡Hay un error!",
						text: `Debes seleccionar una talla para continuar!`,
					});

					btn.style.border = "1px solid red";
					this.$notify({
						group: "all",
						title: "¡Hay un error!",
						text: `Debes seleccionar una tela para continuar!`,
					});

					btn2.style.border = "1px solid red";
				}
			}
			return continueAddToCart;
		},
		async getCustomDetails() {
			const fabricResponse = await this.$store
				.dispatch("product/getFabricProducts")
				.then((res) => {
					this.dropdown_fabric = res.map((item) => {
						return {
							text: item.attributes.name,
							id: item.id,
						};
					});
					return res;
				})
				.catch((er) => {
					console.log(er);
				});

			console.log("esta son las telas QUICK ===>", this.dropdown_fabric);
			const sizeResponse = await this.$store
				.dispatch("product/getSizeProducts")
				.then((res) => {
					this.dropdown_size = res.map((item) => {
						return {
							text: item.attributes.talla,
							id: item.id,
						};
					});
					return res;
				})
				.catch((er) => {
					console.log(er);
				});

			console.log("esta son las tallas  QUICK ===>", sizeResponse);
		},
		addNameDetails(sizeId, fabricId) {
			const findedSize = this.dropdown_size.find((item) => item.id === sizeId);
			var findedFabric;
			console.log(fabricId);
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

		// handleAddToCart() {
		// 	let item = {
		// 		id: this.product.id,
		// 		quantity: this.quantity,
		// 		price: this.product.attributes.price,
		// 	};
		// 	this.$store.dispatch("cart/addProductToCart", item);
		// 	// this.getCartProduct(this.cartItems);
		// 	this.$notify({
		// 		group: "all",
		// 		title: "¡Producto agregado!",
		// 		text: `${this.product.attributes.name} ha sido agregado al carrito!`,
		// 	});
		// },
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
				console.log(this.product);

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
				console.log(item);

				if (existItem !== undefined) {
					if (this.quantity + existItem.quantity > 10) {
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

		handleBuyNow(isBuyNow) {
			const cartItemsOnCookie = this.$cookies.get("cart", {
				parseJSON: true,
			});
			let existItem;
			if (cartItemsOnCookie) {
				existItem = cartItemsOnCookie.cartItems.find(
					(item) => item.id === this.product.id
				);
			}
			let item = {
				id: this.product.id,
				quantity: this.quantity,
				price: this.product.attributtes.price,
			};
			if (existItem !== undefined) {
				if (this.quantity + existItem.quantity > 10) {
					this.$notify({
						group: "all",
						title: "Alerta!",
						text: `No puedes agregar mas de 10 items!`,
					});
				} else {
					this.addItemToCart(item);
					if (isBuyNow && isBuyNow == true) {
						setTimeout(
							function() {
								this.$router.push("/account/checkout");
							}.bind(this),
							500
						);
					}
				}
			} else {
				this.addItemToCart(item);
				if (isBuyNow && isBuyNow == true) {
					setTimeout(
						function() {
							this.$router.push("/account/checkout");
						}.bind(this),
						500
					);
				}
			}

			// this.$store.dispatch('cart/addProductToCart', item);
			// this.getCartProduct(this.cartItems);
			// this.$notify({
			//     group: 'all',
			//     title: 'Success!',
			//     text: `${this.product.name} has been added to your cart!`
			// });
			// setTimeout(
			//     function() {
			//         this.$router.push('/account/checkout');
			//     }.bind(this),
			//     500
			// );
		},
		async addItemToCart(payload) {
			this.$store.dispatch("cart/addProductToCart", payload);
			// this.getCartProduct(this.cartItems);
			var respuesta = await this.$store.dispatch(
				"product/getCartProducts",
				this.cartItems
			);

			this.$notify({
				group: "all",
				title: "¡Producto agregado!!",
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
			const response = await this.$store.dispatch(
				"product/getCartProducts",
				listOfIds
			);
			if (response) {
				this.$store.commit("cart/setLoading", false);
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
