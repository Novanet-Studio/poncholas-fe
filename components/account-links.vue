<template>
  <ul class="border border-gray-300">
    <li
      class="border-b-2 border-b-gray-300"
      v-for="link in links"
      :key="link.text"
      :class="hasText(link?.name) ? 'text-color-1' : ''"
    >
      <nuxt-link
        :to="link.url"
        class="flex items-center px-5 py-4"
        :class="hasText(link?.name) ? 'font-bold' : 'font-medium'"
      >
        <span class="mr-3"
          ><component
            :is="getIcon(link.name)"
            v-bind="{ weight: hasText(link?.name) ? 'fill' : 'light' }"
        /></span>
        {{ link.text }}
      </nuxt-link>
    </li>
    <li>
      <a
        class="flex px-5 py-4 items-center font-medium"
        href="#"
        @click.prevent="handleLogout"
      >
        <ph-power weight="light" class="mr-3" />
        Cerrar Sesión
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import {
  PhPower,
  PhMapPin,
  PhReceipt,
  PhBag,
  PhHeart,
} from '@phosphor-icons/vue';
const { $store } = useNuxtApp();
const global = $store.global();
const auth = $store.auth();
const cart = $store.cart();
const router = useRouter();
const route = useRoute();

const links = global.getLinks;
const hasText = (text: string) => route.path.includes(text);

const handleLogout = () => {
  auth.authenticated = false;
  cart.clearCart();
  router.push('/');
};

const getIcon = (icon: string) => {
  const icons: { [key: string]: any } = {
    invoices: PhReceipt,
    address: PhMapPin,
    'shopping-cart': PhBag,
    wishlist: PhHeart,
  };

  return icons[icon];
};
</script>
