<template>
  <main class="w-full h-full bg-gray-900 flex flex-col gap-10">
    <nav
      class="bg-black/50 backdrop-blur-md w-full top-0 p-3 fixed text-center text-white font-bold text-2xl"
    >
      <span class="text-yellow-400">edi</span>mov🍿
    </nav>

    <div
      class="w-full gap-5 px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-28 mb-24"
    >
      <moviecard
        v-for="movie in movies"
        :key="movie"
        :data="movie"
        @click="getMovieDetails(movie.id)"
      />
    </div>
    <loader v-if="loading" />

    <div v-if="false" class="text-center mb-20">
      <button
        class="cursor-pointer w-fit bg-orange-600 text-white p-2 px-4 rounded-md"
      >
        {{ loading ? "Fetching..." : " Load more" }}
      </button>
    </div>

    <moviemodal
      v-if="showMovieDetails"
      @close="showMovieDetails = false"
      :data="movieDetails"
    />

    <footernav />
  </main>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import footernav from "../components/footernav.vue";
import moviecard from "../components/moviecard.vue";
import moviemodal from "../components/moviemodal.vue";
import loader from "../components/loader.vue";
import { useRoute } from "vue-router";

const route = useRoute();

import { API_KEY, API_URL } from "../constant.js";
import axios from "axios";

const loading = ref(false);
const showMovieDetails = ref(false);

const movies = ref([]);
const movieDetails = ref({
  details: null,
  cast: null,
  trailer: null,
});

const activeFilter = computed(() => route.query.filter);

watch(activeFilter, () => {
  queryMovies();
});

onMounted(() => {
  queryMovies();
});

const queryMovies = async () => {
  try {
    loading.value = true;

    const url = `${API_URL}/movie/${activeFilter.value}?api_key=${API_KEY}`;
    const res = await axios.get(url);

    movies.value = res.data.results;
    console.log(movies.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const getMovieDetails = async (movieId) => {
  if (!movieId) return;

  try {
    loading.value = true;

    // get movie details url
    const detailsres = await axios.get(
      `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    // get movie cast url
    const castres = await axios.get(
      `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );

    // get movie trailer url
    const trailerres = await axios.get(
      `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );

    console.log(trailerres);

    // set the movie details
    movieDetails.value.details = detailsres.data;
    movieDetails.value.cast = castres.data.cast;
    movieDetails.value.trailer = trailerres.data.results;

    console.log(movieDetails.value);
    showMovieDetails.value = true;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
