<template>
  <div class="input-group" :class="class">
    <input
      class="input"
      :class="isError && 'input--error'"
      :type="type"
      v-model="value"
      :placeholder="placeholder"
      height="50"
    />
    <div class="input-error" v-if="isError && errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  modelValue: string;
  placeholder?: string;
  isError?: boolean | undefined;
  errorMessage?: string | undefined;
  class?: string | undefined;
  type?: 'text' | 'password' | 'email' | 'date' | 'number';
};

type Emits = {
  (e: 'update:modelValue', value: string): void;
};

const props = withDefaults(defineProps<Props>(), {
  isError: false,
  type: 'text',
});

const emits = defineEmits<Emits>();
const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emits('update:modelValue', val),
});
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-md p-4 focus:(outline-none ring-2 ring-color-1);
}

.input-error {
  @apply text-sm pt-3 text-red-500;
}
</style>
