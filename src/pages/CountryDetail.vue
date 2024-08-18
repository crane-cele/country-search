<template>
  <div class="country-detail min-h-screen bg-veryLightGrayBg dark:bg-veryDarkBlueBg text-veryDarkBlueText dark:text-white">
    <header class="header bg-white dark:bg-darkBlue shadow p-4">
      <router-link to="/" class="back-button text-lg font-bold">Back</router-link>
    </header>
    <main class="main-content p-4">
      <div v-if="country" class="country-info max-w-4xl mx-auto bg-white dark:bg-darkBlue p-6 rounded shadow">
        <img :src="country.flags.svg" :alt="`${country.name.common} flag`" class="country-flag w-full h-48 object-cover mb-4" />
        <h1 class="text-2xl font-bold mb-4">{{ country.name.common }}</h1>
        <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
        <p><strong>Region:</strong> {{ country.region }}</p>
        <p><strong>Sub Region:</strong> {{ country.subregion }}</p>
        <p><strong>Capital:</strong> {{ country.capital?.[0] }}</p>
        <p><strong>Native Name:</strong> {{ nativeName }}</p>
        <p><strong>Border Countries:</strong> {{ country.borders?.join(', ') }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const country = ref(null);
const nativeName = ref('');

const fetchCountry = async () => {
  const response = await axios.get(`https://restcountries.com/v3.1/alpha/${route.params.id}`);
  country.value = response.data[0];
  nativeName.value = Object.values(country.value.name.nativeName)[0].common;
};

onMounted(fetchCountry);
</script>

<style scoped>
.country-detail {
  @apply min-h-screen bg-veryLightGrayBg dark:bg-veryDarkBlueBg text-veryDarkBlueText dark:text-white;
}
.header {
  @apply bg-white dark:bg-darkBlue shadow p-4;
}
.back-button {
  @apply text-lg font-bold;
}
.main-content {
  @apply p-4;
}
.country-info {
  @apply max-w-4xl mx-auto bg-white dark:bg-darkBlue p-6 rounded shadow;
}
.country-flag {
  @apply w-full h-48 object-cover mb-4;
}
.country-info h1 {
  @apply text-2xl font-bold mb-4;
}
</style>
