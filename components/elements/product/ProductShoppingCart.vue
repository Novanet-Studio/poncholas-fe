<template lang="html">
	<div class="ps-product--cart">
		<div class="ps-product__thumbnail">
			<nuxt-link :to="`/product/${product.id}`">
				<img :src="`${product.image}`" :alt="`${product.name}`" class="img" />
			</nuxt-link>
		</div>
		<div class="ps-product__content">
			<nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
				{{ product.name && product.name }}
			</nuxt-link>
			<div class="product--details">
				<p>{{ product.sizeName }}</p>
				<p v-if="product.fabric !== 'stock'">{{ product.fabricName }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ProductShoppingCart",

	props: {
		product: "",
	},
	mounted() {
		// console.log(this.product);
	},
};
</script>

<style lang="scss" scoped>
.ps-product__content {
	.product--details p {
		margin: 0px;
	}
}
</style>
