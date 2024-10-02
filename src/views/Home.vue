<script setup lang="ts">
  import 'primeicons/primeicons.css'
  import { ref, computed } from "vue"
  import { Pokemon } from '../types/pokemon';
  import axios from "axios"
  import Header from '../components/Header.vue';
  import PokemonCard from '../components/PokemonCard.vue';
import { useToggleStore } from '../store/toggle-store';
  
  const pokemons = ref<Pokemon[]>([])
  const search = ref<string>('')
  const toggleStore = useToggleStore();

  axios.get('pokemon?limit=12').then((response) => {
    pokemons.value = response.data.results
    console.log(response.data.results)
  })

  const updateSearch = (value: string) => {
    search.value = value;
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
    <main class="h-full p-1">
    <Header @update:search="updateSearch" />

    <div class="bg-background min-h-[650px] rounded-md flex items-start px-3 lg:px-12 py-6 lg:py-12 shadow-inside-custom">
      <div class="grid grid-cols-3 gap-2 md:gap-4 lg:gap-12 w-full">
        <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.url" :pokemon="pokemon" />
      </div>
    </div>
  </main>
</template>