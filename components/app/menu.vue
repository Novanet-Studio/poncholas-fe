<template>
  <ul class="menu">
    <li
      v-for="item in mainMenu"
      :key="item.text"
      class="transition first:pl-0 hover:text-color-4"
      :class="$route.path === item?.url ? 'text-color-4' : 'text-white'"
    >
      <nuxt-link class="menu__item" :to="item.url">
        {{ item.text }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const mainMenu = ref([
  {
    text: 'Inicio',
    url: '/',
    extraClass: 'menu-item-has-children',
    subClass: 'sub-menu',
  },
  {
    text: 'Nosotros',
    url: '/nosotros',
    extraClass: 'menu-item-has-children',
    subClass: 'sub-menu',
  },
  {
    text: 'Contáctanos',
    url: '/contacto',
    extraClass: 'menu-item-has-children',
    subClass: 'sub-menu',
  },
]);
</script>

<style scoped>
.menu {
  @apply flex flex-col mb-2 lg:(flex-row mb-0 py-4);
}

.menu__item {
  @apply block py-[10px] pr-12 pl-0;
}
</style>
