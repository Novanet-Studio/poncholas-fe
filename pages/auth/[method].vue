<template>
  <section>
    <ul class="auth__links">
      <li class="auth__link" :class="[isLogin && 'auth__link--active']">
        <nuxt-link to="/auth/login">Iniciar Sesión</nuxt-link>
      </li>
      <li class="auth__link" :class="[!isLogin && 'auth__link--active']">
        <nuxt-link to="/auth/register">Registrarse</nuxt-link>
      </li>
    </ul>
    <div class="auth__content">
      <component :is="isLogin ? LoginContent : RegisterContent" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import LoginContent from '~/components/login-content.vue';
import RegisterContent from '~/components/register-content.vue';

definePageMeta({
  layout: 'access',
});

const isLogin = ref(false);
const route = useRoute();

onMounted(() => {
  if (route.path.includes('login')) {
    isLogin.value = true;
    return;
  }

  isLogin.value = false;
});
</script>

<style scoped>
.auth__links {
  @apply p-4 flex justify-center;
}

.auth__link {
  @apply text-base font-bold text-dark-50 first:mr-8 md:text-2xl;
}

.auth__link--active {
  @apply text-color-1;
}

.auth__content {
  @apply mt-4;
}
</style>
