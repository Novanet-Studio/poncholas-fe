<template>
  <div class="w-full lg:(ml-8)">
    <div class="address">
      <div class="address__content">
        <figure>
          <figcaption class="address__figcaption">
            Dirección de facturación
          </figcaption>
          <template v-if="hasBilling">
            <div>
              <p class="address__text">
                ¿Deseas actualizar tu dirección de facturación?
              </p>
              <nuxt-link class="address__link" to="/edit-address?add=billing">
                Actualizar
              </nuxt-link>
            </div>
          </template>
          <template v-else>
            <div>
              <p class="address__text">
                No has registrado ningun dirección de facturación
              </p>
              <nuxt-link class="address__link" to="/edit-address?add=billing">
                Agregar
              </nuxt-link>
            </div>
          </template>
        </figure>
      </div>
      <div class="address__content">
        <figure class="mr-5">
          <figcaption class="address__figcaption">
            Dirección de envío
          </figcaption>
          <template v-if="hasShipping">
            <div>
              <p class="address__text">
                ¿Deseas actualizar tu dirección de envío?
              </p>
              <nuxt-link class="address__link" to="/edit-address?add=shipping">
                Actualizar
              </nuxt-link>
            </div>
          </template>
          <template v-else>
            <div>
              <p class="address__text">
                No has registrado ningun dirección de envío
              </p>
              <nuxt-link class="address__link" to="/edit-address?add=shipping">
                Agregar
              </nuxt-link>
            </div>
          </template>
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  middleware: 'authentication',
});

const { $store } = useNuxtApp();
const checkout = $store.checkout();
const { hasBilling, hasShipping } = checkout.checkAddressType();
</script>

<style scoped>
.address {
  @apply flex flex-col gap-10 p-5 bg-white lg:(flex-row gap-5);
}

.address__content {
  @apply max-w-full flex-[0_0_100%] lg:(max-w-[50%] flex-[0_0_50%]);
}

.address__figcaption {
  @apply mb-8 pb-3 text-xl font-semibold text-color-1 border-b-[1px] border-b-primary-alt;
}
.address__text {
  @apply mb-4 text-color-1 text-sm;
}

.address__link {
  @apply text-base text-color-3 underline transition ease hover:(text-opacity-70);
}
</style>
