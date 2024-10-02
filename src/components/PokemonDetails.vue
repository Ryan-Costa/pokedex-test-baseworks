<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { PokemonDetails, PokemonTypeColors } from '../types/pokemon';

const route = useRoute()
const pokemon = ref<PokemonDetails | null>(null)

const typeColors: Record<PokemonTypeColors, string> = {
  bug: "var(--bug)",
  dark: "var(--dark)",
  dragon: "var(--dragon)",
  electric: "var(--electric)",
  fairy: "var(--fairy)",
  fighting: "var(--fighting)",
  fire: "var(--fire)",
  flying: "var(--flying)",
  ghost: "var(--ghost)",
  normal: "var(--normal)",
  grass: "var(--grass)",
  ground: "var(--ground)",
  ice: "var(--ice)",
  poison: "var(--poison)",
  psychic: "var(--psychic)",
  rock: "var(--rock)",
  steel: "var(--steel)",
  water: "var(--water)",
};

const fetchPokemonDetails = async () => {
  const pokemonName = route.params.name as string;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    pokemon.value = response.data;

    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    
    const flavorTextEntry = speciesResponse.data.flavor_text_entries.find(
      (entry: { language: { name: string } }) => entry.language.name === 'en'
    );

    if (pokemon.value && flavorTextEntry) {
      pokemon.value.flavorText = flavorTextEntry.flavor_text.replace(/\n|\f/g, ' ');
    }

    console.log(pokemon.value?.flavorText)

  } catch (error) {
    console.error('Erro ao buscar detalhes do Pokémon:', error);
  }
};

  onMounted(() => {
    fetchPokemonDetails();
  });

  watch(() => route.params.name, () => {
    fetchPokemonDetails()
  })

  const MAX_POKEMON_ID = 1025

  const respectiveColor = (pokemon: PokemonDetails) => {
    return pokemon.types.map(type => typeColors[type.type.name as PokemonTypeColors]).slice(0, 1)[0];
  };

  const abbreviatedBaseStats = [
    'HP',
    'ATK',
    'DEF',
    'SATK',
    'SDEF',
    'SPD',
  ]

</script>

<template>
  <div 
    v-if="pokemon"
    class="`relative w-full h-screen flex flex-col p-1 bg-${respectiveColor}`"
    :style="{ backgroundColor: respectiveColor(pokemon) }"
  > 
    <img class="absolute w-[70%] right-0 opacity-10 z-0" src="../assets/pokeball.svg" alt="Pokeball">

    <div class="px-5 py-5 flex gap-4 items-center">
      <router-link class="flex items-center" to="/">
        <span class="pi pi-arrow-left text-background text-lg h-5 w-5"></span>
      </router-link>
      <h1 class="text-2xl font-bold mr-auto">{{ pokemon?.name }}</h1>
      <span class="text-md font-bold">#{{ pokemon?.id.toString().padStart(3, '0') }}</span>
    </div>

    <div class="relative w-full h-full flex flex-col z-20 mt-6">
      <div v-if="pokemon" class="flex w-full flex-col items-center">
        
        <div class="flex w-full justify-between items-center px-12">
          <router-link :to="`/pokemon/${pokemon.id - 1}`">
            <span class="pi pi-angle-left text-2xl"></span>
          </router-link>

          <img v-if="pokemon && pokemon.sprites.other.dream_world.front_default" class="w-64 z-20" :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon.name" />
          <img v-else class="w-64 z-20" src="../assets/pokeball.webp" alt="Pokemon Unknown">

          <router-link :disabled="pokemon && pokemon.id >= MAX_POKEMON_ID" :to="`/pokemon/${pokemon.id + 1}`">
            <span :class="`pi pi-angle-right text-2xl ${pokemon.id >= MAX_POKEMON_ID ? 'opacity-20' : ''}`"></span>
          </router-link>
        </div>

        <div class="flex flex-col items-center bg-background shadow-inside-custom -mt-10 w-full rounded-lg bottom-0 z-10 px-5 pt-14 pb-16">
          <div class="flex gap-4 mb-4">
            <div v-for="(type, index) in pokemon.types" :key="index">
              <span 
                class="px-2 py-[2px] rounded-full capitalize font-semibold text-lg" 
                :style="{ backgroundColor: typeColors[type.type.name as PokemonTypeColors] }"
              >
                {{ type.type.name }}
              </span>
            </div>
          </div>

          <h3 class="text-xl font-bold" :style="{ color: respectiveColor(pokemon) }">About</h3>

          <div class="flex w-full my-4">
            <div class="w-full flex flex-col gap-1 items-center justify-center border-r-2 border-grayscaleBackground">
              <div class="flex gap-2 py-2">
                <img src="../assets/weight.svg" class="w-6 h-6" alt="Weight Icon">
                <span class="text-darkPrimary">{{ pokemon.weight / 10 }} kg</span>
              </div>
              <p class="text-mediumGray text-xs">Weight</p>
            </div>

            <div class="w-full flex flex-col gap-1 items-center justify-center border-r-2 border-grayscaleBackground">
              <div class="flex gap-2 py-2">
                <img src="../assets/straighten.svg" class="w-6 h-6" alt="Straighten Icon">
                <span class="text-darkPrimary">{{ pokemon.height / 10 }} kg</span>
              </div>
              <p class="text-mediumGray text-xs">Height</p>
            </div>

            <div class="w-full flex flex-col gap-1 items-center justify-center">
              <div class="flex flex-col">
                <span v-for="ability in pokemon.abilities" class="text-darkPrimary text-center capitalize text-sm">{{ ability.ability.name }}</span>
              </div>
              <p class="text-mediumGray text-xs">Abilities</p>
            </div>

          </div>

          <p class="text-darkPrimary text-md text-center py-4">{{ pokemon.flavorText }}</p>

          <h3 class="text-xl font-bold" :style="{ color: respectiveColor(pokemon) }">Base Stats</h3>

          <div class="w-full flex flex-col justify-start mt-4">
            <div class="flex items-center space-x-4">
              <div class="flex flex-col space-y-2 bg-white border-r-2 border-grayscaleBackground">
                <p 
                  v-for="(statsAbbreviated, index) in abbreviatedBaseStats" 
                  :key="index" 
                  class="text-darkPrimary text-right pr-4 text-md font-bold"
                  :style="{ color: respectiveColor(pokemon) }"
                >
                  {{ statsAbbreviated }}
                </p>
              </div>
              <div class="flex flex-col space-y-2">
                <p v-for="(stats, index) in pokemon.stats" :key="index" class="text-darkPrimary text-left">
                  {{ stats.base_stat.toString().padStart(3, '0') }}
                </p>
              </div>

              <div class="w-full flex flex-col space-y-6">
                <div 
                  v-for="(stats, index) in pokemon.stats" 
                  :key="index" 
                  class="w-full flex items-center rounded-lg h-2 relative bg-grayscaleBackground"
                  
                >
                  <div
                    class="h-2 rounded-lg absolute"
                    :style="{ width: `${(stats.base_stat / 200) * 100}%`, backgroundColor: respectiveColor(pokemon) }"
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      
      <div v-else>
        <p>A carregar dados do Pokémon...</p>
      </div>
    </div>
  </div>
</template>