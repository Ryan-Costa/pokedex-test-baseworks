
<script setup lang="ts">
import { ref } from 'vue';
import { useToggleStore } from '../store/toggle-store';


const toggleStore = useToggleStore()
const search = ref<string>('');

const emit = defineEmits<{
  (e: 'update:search', value: string): void;
}>();

const updateSearch = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:search', input.value);
};

</script>

<template>
    <header class="relative p-3 flex flex-col lg:flex-row gap-2 lg:gap-6 mb-6">
      <div class="flex items-center gap-4">
        <img class="lg:w-20" src="../assets/pokeball.svg" alt="Pokeball icon">
        <h1 class="font-bold text-2xl lg:text-4xl text-background">Pokédex</h1>
      </div>

      <div class="lg:w-full flex items-center gap-4">
        <div class="w-full bg-background rounded-full flex items-center px-3 py-2 lg:px-6 lg:py-2 shadow-inside-custom">
          <span class="pi pi-search text-primary" />
          <input
            class="bg-background rounded-full px-3 lg:px-6 lg:py-2 w-full outline-none text-mediumGray"
            v-model="search"
            type="text"
            placeholder="Search"
            @input="updateSearch"
          />
        </div>

        <button @click="toggleStore.toggleState" class="bg-background rounded-full flex items-center justify-center w-12 h-10 lg:w-14 lg:h-14 shadow-inside-custom cursor-pointer">
          <span v-if="toggleStore.state === false" class="text-primary leading-3 text-lg lg:text-2xl">#</span>
          <span v-else class="underline text-primary leading-3 text-lg lg:text-2xl">A</span>
        </button>
      </div>
    </header>
</template>


  

  