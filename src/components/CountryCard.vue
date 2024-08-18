<template>
  <router-link :to="`/country/${country.cca3}`" class="country-card">
    <img v-lazy="country.flags.svg" :alt="`${country.name.common} flag`" class="country-card-img" />
    <div class="country-card-body">
      <h2 class="text-lg font-bold">{{ country.name.common }}</h2>
      <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
      <p><strong>Region:</strong> {{ country.region }}</p>
      <p><strong>Capital:</strong> {{ country.capital?.[0] }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  country: Object
});
</script>

<style scoped>
.country-card {
  @apply bg-white dark:bg-darkBlue rounded shadow overflow-hidden;
}
.country-card-img {
  @apply w-full object-cover;
  aspect-ratio: 4/3;
}
.country-card-body {
  @apply p-4;
}
</style>
