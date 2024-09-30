<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { PokemonDetails } from '../types/pokemon';

const route = useRoute()
const pokemon = ref<PokemonDetails | null>(null)

const fetchPokemonDetails = async () => {
  const pokemonName = route.params.name as string;
  console.log(pokemonName, "renderizei")
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    pokemon.value = response.data;
    console.log(response.data)
  } catch (error) {
    console.error('Erro ao buscar detalhes do Pokémon:', error);
  }

};
  onMounted(() => {
    fetchPokemonDetails();
  });
</script>

<template>

<div class="pokemon-details">
    <h1>Detalhes do Pokémon: {{ pokemon?.name }}</h1>
    <div v-if="pokemon">
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
      <p><strong>Altura:</strong> {{ pokemon.height }}</p>
      <p><strong>Peso:</strong> {{ pokemon.weight }}</p>
      <p><strong>Tipos:</strong> 
        <span v-for="(type, index) in pokemon.types" :key="index">
          {{ type.type.name }}<span v-if="index < pokemon.types.length - 1">, </span>
        </span>
      </p>
    </div>
    <div v-else>
      <p>A carregar dados do Pokémon...</p>
    </div>
  </div>
</template>