<template>
  <div>
    <client-only>
      <div class="default">
        <div class="default__wrapper">
          <div class="default__container">
            <div class="default__content">
              <app-header />
              <!-- <navigation-list /> -->
              <main class="default__main">
                <nuxt-page />
              </main>
              <app-footer />
              <notify />
            </div>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const global = $store.global();
const route = useRoute();

const maxWidth = computed(() => {
  const includesPath = ['/nosotros', '/contacto', '/gracias'].includes(
    route.path
  );

  return {
    maxWidth: includesPath ? '100%' : '1650px',
    paddingX: includesPath ? '0px' : '2rem',
  };
});

onMounted(() => {
  global.getFabrics();
  global.getSizes();
});
</script>

<style scoped>
.default {
  @apply flex relative;
}
.default__container {
  /* @apply flex flex-1 max-w-full transition animate-ease-[cubic-bezier(0.4,0,0.2,1)]; */
  @apply transition animate-ease-[cubic-bezier(0.4,0,0.2,1)];
}

.default__wrapper {
  @apply flex-auto backface-hidden flex flex-col min-h-screen max-w-full;
}
.default__content {
  @apply flex-auto;
}
.default__main {
  --main-max-width: v-bind(maxWidth.maxWidth);
  --main-padding-x: v-bind(maxWidth.paddingX);
  @apply px-5 transition ease lg:max-w-[var(--main-max-width)] mx-auto md:px-[var(--main-padding-x)];
}
</style>
