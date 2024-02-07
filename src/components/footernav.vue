<template>
  <div
    class="p-4 pb-5 sm:px-6 w-full sm:w-3/4 bg-black/50 backdrop-blur-md z-20 flex items-center justify-between fixed bottom-0 left-1/2 -translate-x-1/2"
  >
    <button
      @click="handlefilter(item)"
      v-for="item in filters"
      :key="item.slug"
      :class="[
        activeFilter === item.slug ? 'text-yellow-400' : 'text-gray-400',
      ]"
      class="font-medium text-sm sm:text-base cursor hover:opacity-70"
    >
      {{ item.name }}
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const filters = ref([
  {
    name: "popular",
    slug: "popular",
  },
  {
    name: "Now playing",
    slug: "now_playing",
  },
  {
    name: "Top rated",
    slug: "top_rated",
  },
]);

const handlefilter = (arg) => {
  console.log(arg);
  router.push({
    query: { filter: arg.slug },
  });
};

const activeFilter = computed(() => route.query.filter);

onMounted(() => {
  if (!route.query?.filter) {
    router.push({
      query: { filter: filters.value[0].slug },
    });
  }
});
</script>

<style></style>
