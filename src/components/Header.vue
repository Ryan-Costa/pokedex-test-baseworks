
<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';

const search = ref<string>('');
const selectedOrder = ref<string>('name') // Default order by name

const emit = defineEmits<{
    (e: 'update:search', value: string): void;
    (e: 'update:order', value: string): void;
}>();

watch(selectedOrder, (newVal) => {
  console.log(newVal);
});

function onSearch() {
    emit('update:search', search.value);
}

function onOrderChange() {
  emit('update:order', selectedOrder.value);
}
</script>

<template>
    <header class="relative p-3 flex flex-col gap-2 mb-6">
      <div class="flex items-center gap-4">
        <img src="../assets/pokeball.svg" alt="Pokeball icon">
        <h1 class="font-bold text-2xl text-background">Pokédex</h1>
      </div>
      <div class="flex items-center gap-4">
        <div class="w-full bg-background rounded-full flex items-center px-3 py-2 shadow-inside-custom">
          <span class="pi pi-search text-primary" />
          <input
            class="bg-background rounded-full px-3 w-full outline-none text-mediumGray"
            v-model="search"
            type="text"
            placeholder="Buscar"
            @input="onSearch"
          />
        </div>
        <div class="bg-background rounded-full flex items-center justify-center px-3 py-3 shadow-inside-custom cursor-pointer">
          <span class="pi pi-hashtag text-primary"></span>
        </div>
      </div>
    </header>

    <div class="absolute top-24 right-4 bg-primary px-1 pb-1 z-30 shadow-outside-custom rounded-xl">
      <h4 class="text-background px-5 py-4 font-bold text-sm">Ordenar por:</h4>

      <div class="bg-background px-5 py-4 rounded-lg shadow-inside-custom space-y-4">

        <!-- Opção "Number" -->
        <div class="flex items-center space-x-2">
          <input id="number" name="order" v-model="selectedOrder" @click="onOrderChange" value="number" type="radio" class="appearance-none w-4 h-4 border-2 border-primary rounded-full checked:bg-primary checked:border-transparent">
          <label for="number" class="text-black font-normal text-sm">Number</label>
        </div>

        <!-- Opção "Name" -->
        <div class="flex items-center space-x-2">
          <input id="name" name="order" v-model="selectedOrder" @click="onOrderChange" value="name" type="radio" class="appearance-none w-4 h-4 border-2 border-primary rounded-full checked:bg-primary checked: checked:border-transparent">
          <label for="name" class="text-black font-normal text-sm">Name</label>
        </div>
      </div>
    </div>
</template>
  

  