<template>
  <div>
    <Header />
    <div class="p-4">
      <input type="text" v-model="searchTerm" placeholder="Search for a country..." class="w-full p-2 mb-4 border rounded" @input="updateQueryString" />
      <select v-model="selectedRegion" class="w-full p-2 mb-4 border rounded" @change="updateQueryString">
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <select v-model="sortOption" class="w-full p-2 mb-4 border rounded" @change="updateQueryString">
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="population">Population</option>
      </select>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CountryCard 
          v-for="country in sortedAndFilteredCountries" 
          :key="country.name" 
          :flag="country.flag" 
          :name="country.name" 
          :population="country.population" 
          :region="country.region" 
          :capital="country.capital" 
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import Header from '../components/Header.vue';
import CountryCard from '../components/CountryCard.vue';
import Fuse from 'fuse.js';

export default defineComponent({
  components: {
    Header,
    CountryCard,
  },
  setup() {
    const countries = ref([]);
    const searchTerm = ref('');
    const selectedRegion = ref('');
    const sortOption = ref('');
    const fuse = ref(null);

    const fetchCountries = async () => {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      countries.value = response.data;
      fuse.value = new Fuse(countries.value, {
        keys: ['name', 'nativeName'],
        threshold: 0.3,
      });
    };

    const sortedAndFilteredCountries = computed(() => {
      let filtered = countries.value;

      if (searchTerm.value) {
        filtered = fuse.value.search(searchTerm.value).map(result => result.item);
      }

      if (selectedRegion.value) {
        filtered = filtered.filter(country => country.region === selectedRegion.value);
      }

      if (sortOption.value === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption.value === 'population') {
        filtered.sort((a, b) => a.population - b.population);
      }

      return filtered;
    });

    const updateQueryString = () => {
      const params = new URLSearchParams();
      if (searchTerm.value) params.set('search', searchTerm.value);
      if (selectedRegion.value) params.set('region', selectedRegion.value);
      if (sortOption.value) params.set('sort', sortOption.value);
      window.history.replaceState(null, '', `?${params.toString()}`);
    };

    onMounted(() => {
      fetchCountries();

      const queryParams = new URLSearchParams(window.location.search);
      searchTerm.value = queryParams.get('search') || '';
      selectedRegion.value = queryParams.get('region') || '';
      sortOption.value = queryParams.get('sort') || '';
    });

    watch([searchTerm, selectedRegion, sortOption], updateQueryString);

    return { countries, searchTerm, selectedRegion, sortOption, sortedAndFilteredCountries };
  },
});
</script>
