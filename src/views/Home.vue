<script setup lang="ts">
  import 'primeicons/primeicons.css'
  import { ref, computed } from "vue"
  import { Pokemon } from '../types/pokemon';
  import axios from "axios"
  import Header from '../components/Header.vue';
  import PokemonCard from '../components/PokemonCard.vue';
  import { useToggleStore } from '../store/toggle-store';
  import Paginator from 'primevue/paginator';

  const pokemons = ref<Pokemon[]>([])
  const search = ref<string>('')
  const toggleStore = useToggleStore();

  const totalRecords = ref(1025);
  const rowsPerPage = ref(24);
  const currentPage = ref(1);

  const fetchPokemons = (page: number) => {
    const offset = (page - 1) * rowsPerPage.value;
    axios.get(`pokemon?limit=${rowsPerPage.value}&offset=${offset}`).then((response) => {
      pokemons.value = response.data.results;
    });
  };

  fetchPokemons(currentPage.value);

  const updateSearch = (value: string) => {
    search.value = value;
  };

  const onPageChange = (event: any) => {
    currentPage.value = event.page + 1;
    fetchPokemons(currentPage.value);
  };

  const filteredPokemons = computed(() => {
  const searchTerm = search.value.toLowerCase();

  return pokemons.value.filter((pokemon) => {
    if (toggleStore.state) {
      const pokemonId = parseInt(pokemon.url.split('/').slice(-2)[0]);
      return pokemonId.toString().includes(searchTerm);

    } else {
      return pokemon.name.toLowerCase().includes(searchTerm);
    }
  });
});

</script>

<template>
    <main class="h-full p-1 md:p-6 md:px-6 lg:px-32">
    <Header @update:search="updateSearch" />

    <div class="flex-col bg-background lg:min-h-[900px] rounded-md flex items-start px-3 md:px-6 pt-6 md:pt-0 lg:px-12 shadow-inside-custom">
      <div class="hidden md:flex w-full justify-end md:my-4 lg:my-8">
        <Paginator
          :template="{
              default: 'PrevPageLink PageLinks NextPageLink'
          }"
          :rows="rowsPerPage"
          :totalRecords="totalRecords"
          :first="(currentPage - 1) * rowsPerPage"
          @page="onPageChange"
        />
      </div>
      <div class="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-12 w-full">
        <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.url" :pokemon="pokemon" />
      </div>
      <div class="w-full flex justify-center md:justify-end md:my-4 lg:my-8">
        <Paginator
          :template="{
              default: 'PrevPageLink PageLinks NextPageLink'
          }"
          :rows="rowsPerPage"
          :totalRecords="totalRecords"
          :first="(currentPage - 1) * rowsPerPage"
          @page="onPageChange"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
 .p-paginator-padding {
  padding: 0;
 }
</style>