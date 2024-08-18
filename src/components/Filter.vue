<template>
  <select @change="handleSelect" class="filter-select w-full md:w-1/3 p-2 border border-gray-300 rounded shadow focus:outline-none focus:border-blue-500">
    <option value="">Filter by Region</option>
    <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
  </select>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
const route = useRoute();
const router = useRouter();

const handleSelect = (e) => {
  router.replace({ query: { ...route.query, region: e.target.value } });
};
</script>
