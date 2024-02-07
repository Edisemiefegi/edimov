<template>
  <div class="min-w-72 w-full p-5 bg-gray-800 rounded-lg flex gap-3">
    <div class="w-[9.2rem] flex-shrink-0">
      <img class="w-full object-cover" :src="imageurl" alt="" />
    </div>
    <div class="flex flex-col gap-3 w-2/3">
      <div class="flex justify-between text-white font-medium text-lg">
        <p class="cursor-pointer hover:underline" @click="emit('click')">
          {{ data?.title }}
        </p>
        <p class="text-yellow-400">{{ (data?.vote_average).toFixed(1) }}</p>
      </div>
      <p
        class="text-gray-400 line-clamp-3 cursor-pointer hover:underline"
        @click="emit('click')"
      >
        {{ data?.overview }}
      </p>
      <p class="text-gray-600">{{ data?.release_date }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  data: Object,
});
const emit = defineEmits(["click"]);

const imageurl = computed(() => {
  const base = "https://image.tmdb.org/t/p/w500";
  return `${base}${props.data?.poster_path}`;
});
</script>

<style></style>
