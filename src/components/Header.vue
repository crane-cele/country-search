<template>
  <header class="flex justify-between items-center p-4 bg-gray-800 text-white dark:bg-gray-900">
    <h1 class="text-xl">Where in the world?</h1>
    <button @click="toggleDarkMode" class="focus:outline-none">
      <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m8-10h-2m-14 0H2m16.364-6.364l-1.414 1.414M5.636 18.364l-1.414 1.414M18.364 18.364l-1.414-1.414M5.636 5.636L4.222 7.05" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2m0 14v2m8-10h-2m-14 0H2m16.364-6.364l-1.414 1.414M5.636 18.364l-1.414 1.414M18.364 18.364l-1.414-1.414M5.636 5.636L4.222 7.05" />
      </svg>
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const isDark = ref(localStorage.getItem('theme') === 'dark');

    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
      if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };

    onMounted(() => {
      if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    return {
      isDark,
      toggleDarkMode,
    };
  },
});
</script>
