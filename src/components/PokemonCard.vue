<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    pokemon: {
        type: Object,
        required: true
    }
})

function get_id(pokemon: any) {
    return Number(pokemon.url.split("/")[6])
}

const pokemonId = get_id(props.pokemon)

const fallbackImage = ref('/src/assets/pokeball.webp');

function onImageError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = fallbackImage.value;
}
</script>

<template>
  <router-link :to="`/pokemon/${pokemonId}`">
    <div class="relative h-[108px] md:h-[240px] p-1 md:px-4 lg:h-[320px] rounded-md flex flex-col justify-center md:justify-around items-center shadow-outside-custom">
      <div class="w-full flex items-center justify-end">
        <p class="text-mediumGray text-[8px] md:text-sm">#{{ pokemonId.toString().padStart(3, '0') }}</p>
      </div>
      <img 
        class="object-contain min-w-[72px] h-[72px] md:min-w-[104px] md:h-[104px] lg:min-w-[140px] lg:h-[140px] z-20"
        width="50%"
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${get_id(pokemon)}.svg`" 
        :alt="pokemon.name"
        @error="onImageError"
      >

      <p class="text-darkPrimary text-[10px] md:text-lg lg:text-3xl z-20">{{ pokemon.name }}</p>
      <div class="absolute bg-grayscaleBackground w-full h-11 md:h-20 lg:h-40 rounded-lg bottom-0 z-10"></div>
    </div>
  </router-link>
</template>
