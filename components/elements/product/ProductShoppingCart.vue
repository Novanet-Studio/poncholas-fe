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
		</div>
	</div>
</template>

<script>
export default {
	name: "ProductShoppingCart",

	props: {
		product: "",
	},
};
</script>

<style lang="scss" scoped></style>
