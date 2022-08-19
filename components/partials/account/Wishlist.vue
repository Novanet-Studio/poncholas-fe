<template lang="html">
	<div class="ps-section--shopping ps-whishlist">
		<div class="container">
			<div class="ps-section__header">
				<h1>Lista de deseos</h1>
			</div>
			<div v-if="wishlistProducts.length == 0" class="ps-section__content">
				<div class="table-responsive container">
					<h3>No tienes articulos en tu lista de deseos</h3>
				</div>
			</div>
			<div v-else class="ps-section__content">
				<div class="table-responsive">
					<table class="table ps-table--whishlist">
						<thead>
							<tr>
								<th></th>
								<th>Nombre</th>
								<th>Precio por unidad</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="product in wishlistProducts" :key="product.fakeId">
								<td>
									<a
										href="#"
										@click.prevent="handleRemoveItemFromWishlist(product)"
									>
										<i class="icon-cross"></i>
									</a>
								</td>
								<td>
									<product-shopping-cart :product="product" />
								</td>
								<td class="price">$ {{ product.price.toFixed(2) }}</td>
								<!-- <td class="price">
									$ {{ product.attributes.price.toFixed(2) }}
								</td> -->
								<td>
									<a
										class="ps-btn"
										href="#"
										@click.prevent="openDial(quickDial, product)"
									>
										Añadir al carrito
									</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<v-dialog v-model="quickDial" width="1200">
				<div v-if="currentProduct" class="ps-dialog">
					<a
						class="ps-dialog__close"
						@click.prevent="quickDial = false"
						href=""
					>
						<i class="icon icon-cross"></i>
					</a>
					<div class="ps-product--detail ps-product--quickview">
						<div class="ps-product__header">
							<div class="ps-product__thumbnail">
								<figure>
									<div class="ps-wrapper">
										<div
											class="ps-product__gallery ps-carousel inside swiper"
											ref="swiperTop"
										>
											<div class="swiper-wrapper">
												<div class="swiper-slide">
													<img
														:src="currentProduct.image"
														:alt="currentProduct.name"
													/>
												</div>
											</div>
											<div class="swiper-nav">
												<span class="swiper-arrow swiper-prev">
													<i class="icon-chevron-left"></i>
												</span>
												<div class="swiper-arrow swiper-next">
													<i class="icon-chevron-right"></i>
												</div>
											</div>
										</div>
									</div>
								</figure>
							</div>
							<div class="ps-product__info">
								<h1>{{ currentProduct.name }}</h1>
								<h4 class="ps-product__price">$ {{ currentProduct.price }}</h4>
								<!-- <module-product-detail-desc :product="product" /> -->
								<div class="ps-product__shopping los--drop">
									<div
										class="div--overflow-btn-custom"
										v-if="currentProduct.custom === true"
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
									<figure v-if="currentProduct.custom === false">
										<figcaption>Cantidad</figcaption>
										<div class="form-group--number">
											<button
												class="up"
												@click.prevent="handleIncreaseQuantity(currentProduct)"
											>
												<i class="fa fa-plus"></i>
											</button>
											<button
												class="down"
												@click.prevent="handleDescreaseQuantity(currentProduct)"
											>
												<i class="fa fa-minus"></i>
											</button>
											<input
												v-model="quantity"
												class="form-control"
												type="text"
												disabled
											/>
										</div>
									</figure>
									<a
										v-if="loading === false"
										class="ps-btn ps-btn--black"
										href="#"
										@click.prevent="handleAddToCart(false, currentProduct)"
									>
										Agregar al carrito
									</a>
									<a
										v-if="loading === false"
										class="ps-btn"
										href="#"
										@click.prevent="handleAddToCart(true, currentProduct)"
									>
										Comprar
									</a>
									<loading v-if="loading === true" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</v-dialog>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Notify from "~/components/elements/commons/notify";
import ProductShoppingCart from "~/components/elements/product/ProductShoppingCart";
import { getListOfProductId } from "~/utilities/product-helper";
import Loading from "~/components/elements/commons/Loading";

export default {
	name: "Wishlist",
	components: { ProductShoppingCart, Notify, Loading },
	data() {
		return {
			quickDial: false,
			quantity: 1,
			customItem: false,
			fabric: null,
			size: null,
			loading: false,
			currentProduct: null,
		};
	},
	computed: {
		...mapState({
			wishlistItems: (state) => state.product.wishlistItems,
			wishlistProducts: (state) => state.wishlist.items,
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
	mounted() {
		this.loadWishlist();
		// console.log(this.wishlistProducts);
	},
	methods: {
		addNameDetails(sizeId, fabricId) {
			const findedSize = this.dropdown_size.find((item) => item.id === sizeId);
			var findedFabric;
			// console.log(fabricId);
			if (fabricId === null || fabricId === "stock") {
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
		openDial(current, product) {
			this.currentProduct = product;
			if (current === false) {
				this.quickDial = true;
				this.size = product.size;
				this.fabric = product.fabric;
			} else {
				this.quickDial = false;
				this.size = null;
				this.fabric = null;
			}
		},
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
		async handleAddToCart(buyItNow, currentProduct) {
			var product = currentProduct;
			// console.log(this.fabric, this.size);
			if (product.custom === true) {
				this.customItem = true;
			} else {
				this.customItem = false;
			}
			var continueAddToCart = this.validateItem();
			if (continueAddToCart === true) {
				// console.log("el producto", product, continueAddToCart);
				const cartItemsOnCookie = this.$cookies.get("cart", {
					parseJSON: true,
				});
				let existItem;
				if (this.customItem === false) {
					// si no es un item custom revisar si el item ya esta en el carrito
					if (cartItemsOnCookie) {
						const findedItem = cartItemsOnCookie.cartItems.find(
							(item) => item.id === product.id
						);
						// verificar que este producto no sea custom
						// console.log("el customItem ===>", findedItem);
						if (findedItem && findedItem.customItem === false) {
							existItem = findedItem;
						}
					}
				}
				if (
					this.size !== product.size ||
					this.fabric !== product.fabric ||
					this.quantity !== product.quantity
				) {
					var data = {
						id: product.fakeId,
						update: {
							fabric: this.fabric,
							size: this.size,
							quantity: this.quantity,
							sizeName: this.addNameDetails(this.size, this.fabric).sizeName,
							fabricName: this.addNameDetails(this.size, this.fabric)
								.fabricName,
						},
					};
					this.$store.dispatch("wishlist/updateItemFromWishlist", data);
				}
				// console.log(
				// 	this.quantity,
				// 	product.quantity,
				// 	this.fabric,
				// 	product.fabric,
				// 	this.size,
				// 	product.size
				// );
				if (existItem !== undefined) {
					if (this.quantity + existItem.quantity > 10) {
						this.$notify({
							group: "all",
							title: "Waring!",
							text: `Can't add more than 10 items`,
						});
						this.loading = false;
						this.quickDial = false;
					} else {
						await this.addItemToCart(product).then((res) => {
							if (res === true) {
								this.handleRemoveItemFromWishlist(product);
								if (buyItNow && buyItNow === true) {
									setTimeout(
										function() {
											this.$router.push("/account/checkout");
										}.bind(this),
										500
									);
								}
								this.loading = false;
								this.quickDial = false;
							}
						});
					}
				} else {
					await this.addItemToCart(product).then((res) => {
						if (res === true) {
							this.handleRemoveItemFromWishlist(product);
							if (buyItNow && buyItNow === true) {
								setTimeout(
									function() {
										this.$router.push("/account/checkout");
									}.bind(this),
									500
								);
							}
							this.loading = false;
							this.quickDial = false;
						}
					});
				}
			}

			// console.log("ya listo", product);
			// this.$store.dispatch("cart/addProductToCart", item);
			// // alert('se ha agregado el item al carrito')
			// this.$notify({
			// 	group: "all",
			// 	title: "¡Producto agregado!",
			// 	text: `${product.attributes.name} ha sido agregado al carrito!`,
			// });
			// this.handleRemoveItemFromWishlist(product);
		},
		handleRemoveItemFromWishlist(product) {
			// return console.log(product)
			this.$store.dispatch("wishlist/removeItemFromWishlist", product);
			this.loadWishlist();
			this.$notify({
				group: "all",
				title: "Eliminado",
				text: `${product.name} ha sido eliminado de la lista de deseos!`,
			});
		},
		async loadWishlist() {
			var wishlistItemsOnCookie = this.$cookies.get("wishlist", {
				parseJSON: true,
			});

			// console.log(wishlistItemsOnCookie);
		},
		handleIncreaseQuantity(product) {
			this.quantity++;
		},

		handleDescreaseQuantity(product) {
			if (this.quantity > 1) {
				this.quantity--;
			}
		},
		async addItemToCart(payload) {
			this.$store.dispatch("cart/addProductToCart", payload);
			// this.getCartProduct(this.cartItems);

			this.$notify({
				group: "all",
				title: "¡Producto agregado!!",
				text: `${payload.name} ha sido agregado al carrito!`,
			});

			this.size = null;
			this.fabric = null;
			this.quantity = 1;
			this.loading = false;
			return true;
		},
	},
};
</script>

<style lang="scss" scoped>
.price {
	text-align: center;
	margin: 0 auto;
}
</style>
