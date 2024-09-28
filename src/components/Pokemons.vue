<script setup lang="ts">
import axios from "axios"
import { ref } from "vue"

const pokemons = ref();
axios.get('pokemon').then((response) => {
  pokemons.value = response.data.results
  console.log(response.data.results)
})

function get_id(pokemon: any) {
  return Number(pokemon.url.split("/")[6])
}

</script>

<template>
  <h1>Lista de Pokemons</h1>
  
  <div v-for="pokemon in pokemons" :key="pokemon.url">
    {{ get_id(pokemon) }}
    <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${get_id(pokemon)}.svg`" :alt="pokemon.name">
        <h3>{{ pokemon.name }}</h3>
  </div>
</template>

<style scoped>

</style>
