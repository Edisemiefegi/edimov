<template>
  <router-view></router-view>
</template>

<script setup>
// const getMovieDetails = async (movieId) => {
//   if (!movieId) return;

//   try {
//     loading.value = true;

//     //get movie details
//     const detailsRes = await axios.get(
//       `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
//     );

//     //get the cast
//     const castRes = await axios.get(
//       `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
//     );

//     //get the trailer
//     const trailerRes = await axios.get(
//       `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
//     );

//     //set the movie data
//     movieDetails.value.details = detailsRes.data;
//     movieDetails.value.cast = castRes.data?.cast;
//     movieDetails.value.trailer = trailerRes.data?.results;

//     console.log(movieDetails.value);

//     //open the modal
//     showMovieDetails.value = true;
//   } catch (error) {
//     console.log(error);
//   } finally {
//     loading.value = false;
//   }
// };
</script>

<style scoped></style>
