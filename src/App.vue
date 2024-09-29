<script setup lang="ts">

import 'primeicons/primeicons.css'
import axios from "axios"
import { ref } from "vue"
import PokemonCard from './components/PokemonCard.vue';

const pokemons = ref()
axios.get('pokemon?limit=10').then((response) => {
  pokemons.value = response.data.results
})


</script>

<template>
  <header class="p-3 flex flex-col gap-2 mb-6">
    <div class="flex items-center gap-4">
      <img src="./assets/pokeball.svg" alt="Pokeball icon">
      <h1 class="font-bold text-2xl text-white">Pokédex</h1>
    </div>
    <div class="flex items-center gap-4">
      <div class="w-full bg-background rounded-full flex items-center px-3 py-2 shadow-inside-custom">
        <span class="pi pi-search text-primary" />
        <input class="bg-background rounded-full px-3 w-full outline-none text-mediumGray" type="text" placeholder="Buscar">
      </div>
      <div class="bg-background rounded-full flex items-center px-3 py-2 shadow-inside-custom">
        <span class="pi pi-hashtag text-primary py-1"></span>
      </div>
    </div>
  </header>

  <main class="h-full">
    <div class="bg-background rounded-md flex items-center px-3 py-6 shadow-inside-custom">
      <div class="grid grid-cols-3 gap-2 w-full">
        <div v-for="pokemon in pokemons" :key="pokemon.url">
          <PokemonCard :pokemon="pokemon" />
        </div>
      </div>
    </div>
  </main>
</template>

