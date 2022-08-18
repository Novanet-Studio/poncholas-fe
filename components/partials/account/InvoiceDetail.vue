<template lang="html">
	<div class="ps-section__content">
		<div v-if="invoiceDetailed !== null" class="ps-section--account-setting">
			<div id="pdf-content">
				<div class="ps-section__header">
					<h3>
						Factura #{{ invoiceDetailed.attributes.id }} -
						<strong>Successful delivery PPU</strong>
					</h3>
				</div>
				<div class="ps-section__content">
					<div class="row">
						<div class="col-md-4 col-12">
							<figure class="ps-block--invoice">
								<figcaption>
									Address
								</figcaption>
								<div class="ps-block__content">
									<strong>
										{{ invoiceDetailed.attributes.fullName }}
									</strong>
									<p v-if="invoiceDetailed.attributes.shippingAddress">
										Dirección:
										{{
											invoiceDetailed.attributes.shippingAddress.addressLine1
										}},
										{{ invoiceDetailed.attributes.shippingAddress.locality }},
										{{ invoiceDetailed.attributes.shippingAddress.country }}
										<br />
										{{ invoiceDetailed.attributes.shippingAddress.postalCode }},
										<b>Apt, Casa: </b>
										{{ invoiceDetailed.attributes.shippingAddress.home }}
									</p>
								</div>
							</figure>
						</div>
						<div class="col-md-3 col-12">
							<figure class="ps-block--invoice">
								<figcaption>
									Estado
								</figcaption>
								<div class="ps-block__content">
									<p v-if="invoiceDetailed.attributes.paid === true">
										Pagado
									</p>
									<p v-else>Pendiente en aprobación</p>
									<p>
										{{ invoiceDetailed.attributes.date }}
									</p>
								</div>
							</figure>
						</div>
						<div class="col-md-5 col-12">
							<figure class="ps-block--invoice">
								<figcaption>
									Payment
								</figcaption>

								<div class="ps-block__content">
									<p>Pago: {{ invoiceDetailed.attributes.payment_method }}.</p>
									<p>
										Confirmacion de pago:
										{{
											invoiceDetailed.attributes.payment_info[0].confirmacion
										}}
									</p>
								</div>
							</figure>
						</div>
					</div>
					<div class="table-responsive">
						<table class="table ps-table--shopping-cart">
							<thead>
								<tr>
									<th>Productos</th>
									<th>Precio</th>
									<th>Cantidad</th>
									<th>Monto</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(product, index) in products" :key="product.id">
									<td>
										{{ product.product.data.attributes.name }}
										<br />
										Talla: {{ product.size.data.attributes.talla }}
										<br />
										<span v-if="product.fabric.data.id !== 1"
											>Tela: {{ product.fabric.data.attributes.name }}</span
										>
										<span v-else>Stock</span>
									</td>
									<td class="price">
										$ {{ product.product.data.attributes.price }}
									</td>
									<td>{{ product.quantity }}</td>
									<td class="price">
										$
										{{
											product.product.data.attributes.price * product.quantity
										}}
									</td>
								</tr>
								<tr>
									<td></td>
									<td></td>
									<td>MONTO TOTAL</td>
									<td>${{ invoiceDetailed.attributes.amount }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<nuxt-link to="/account/invoices">
				<a class="ps-btn ps-btn--sm ">
					regresar
				</a>
			</nuxt-link>
			<button @click="pdf()" class="ps-btn ps-btn--sm ">PDF</button>
		</div>
		<div v-else>
			<h3>Cargando...</h3>
		</div>
	</div>
</template>

<script>
import jsPDF from "jspdf";
import html2PDF from "jspdf-html2canvas";

export default {
	name: "InvoiceDetail",
	data() {
		return {
			products: "",
			invoiceDetailed: null,
		};
	},
	computed: {
		user() {
			return this.$cookies.get("auth").user;
		},
		invoiceId() {
			return this.$router.apps[0]._route.path.split("/invoice/")[1];
		},
	},
	async mounted() {
		await this.getInvoiceStrapi();
	},
	methods: {
		async getProductsInvoice(ids_p) {
			// return console.log(ids_p)
			try {
				var respuesta = await this.$store
					.dispatch("product/getProductById", ids_p)
					.then((res) => {
						// return console.log('esta es la respuesta',res.data)
						return (respuesta = res.data);
					})
					.catch((err) => {
						return err;
					});
				return respuesta;
			} catch (error) {
				console.log(error);
			}
		},
		pdf() {
			var elementHTML = document.getElementById("pdf-content");
			var name = this.invoice.attributes.id_invoice_user;
			html2PDF(elementHTML, {
				jsPDF: {
					format: "a4",
				},
				imageType: "image/jpeg",
				output: `factura-${name}`,
				margin: {
					top: 20,
					right: 10,
					bottom: 20,
					left: 10,
				},
			});
		},
		async getInvoiceStrapi() {
			const userId = this.user.id;
			const invoiceId = this.invoiceId;

			const response = await this.$store
				.dispatch("checkout/invoiceInfo", {
					id: invoiceId,
					user_id: userId,
				})
				.then((res) => {
					console.log("desde el componente", res);
					this.invoiceDetailed = res;
					this.products = res.attributes.products;
				});
		},
	},
};
</script>

<style lang="scss" scoped></style>
