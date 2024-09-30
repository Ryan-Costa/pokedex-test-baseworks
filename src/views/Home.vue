<script setup lang="ts">
  import 'primeicons/primeicons.css'
  import { ref, computed } from "vue"
  import { Pokemon } from '../types/pokemon';
  import axios from "axios"
  import Header from '../components/Header.vue';
  import PokemonCard from '../components/PokemonCard.vue';
  
  const pokemons = ref<Pokemon[]>([])
  const search = ref<string>('')
    const order = ref<string>('name')

  axios.get('pokemon?limit=10').then((response) => {
    pokemons.value = response.data.results
    console.log(response.data.results)
  })

  const updateSearch = (value: string) => {
    search.value = value;
  };

  const filteredPokemons = computed(() => {
    const searchTerm = search.value.toLowerCase();

    return pokemons.value.filter((pokemon) => {
      if (order.value === 'number') {
        // Filter by Pokemon number (assuming ID is in the URL)
        const pokemonId = parseInt(pokemon.url.split('/').slice(-2)[0]);
        return pokemonId.toString().includes(searchTerm);
      } else {
        // Default filter by name
        return pokemon.name.toLowerCase().includes(searchTerm);
      }
    })
  })

  const handleOrderChange = (newOrder: string) => {
    order.value = newOrder;
  }
</script>

<template>
    <Header @update:search="updateSearch" @update:order="handleOrderChange" />

    <main class="h-full">
      <div class="bg-background rounded-md flex items-center px-3 py-6 shadow-inside-custom">
        <div class="grid grid-cols-3 gap-2 w-full">
          <PokemonCard v-for="pokemon in filteredPokemons" :key="pokemon.url" :pokemon="pokemon" />
        </div>
      </div>
    </main>
</template>