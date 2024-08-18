<template>
  <input
    type="text"
    v-model="searchTerm"
    @input="handleSearch"
    placeholder="Search for a country..."
    class="search-input w-full md:w-1/3 p-2 border border-gray-300 rounded shadow focus:outline-none focus:border-blue-500"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import fuzzysearch from 'fuzzysearch';

const searchTerm = ref('');
const route = useRoute();
const router = useRouter();

const handleSearch = () => {
  router.replace({ query: { ...route.query, search: searchTerm.value } });
};

watch(searchTerm, () => {
  router.replace({ query: { ...route.query, search: searchTerm.value } });
});
</script>
