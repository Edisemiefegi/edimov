<template>
  <div
    class="fixed hide-scrollbar overflow-auto h-screen bg-white left-1/2 -translate-x-1/2 z-40 w-full md:w-10/12 lg:w-8/12"
  >
    <div class="sticky top-0 left-0 p-2 px-4 bg-black/30 backdrop-blur-md">
      <i
        class="pi pi-arrow-left shadow-lg rounded-full text-white cursor-pointer"
        @click="closemodal"
      ></i>
    </div>
    <div class="h-full -mt-10">
      <div class="h-56 w-full">
        <img
          class="w-full h-full object-top object-cover"
          :src="coverImageurl"
          alt=""
        />
      </div>

      <div class="border p-5 flex gap-4 sm:gap-5">
        <div class="w-[9.2rem] -mt-12">
          <img :src="posterImageurl" alt="" class="w-full object-cover" />
        </div>
        <div class="text-gray-600 flex flex-col gap-1.5">
          <p class="cursor-pointer font-bold text-lg text-gray-700">
            {{ data.details.title }}
          </p>

          <p>{{ convertdate(data.details.release_date) }}</p>
          <p class="text-gray-400">
            {{ convertMinutesToHours(data.details.runtime) }}
          </p>
          <p v-for="item in data.details.genres" :key="item">
            {{ item.name }}
          </p>
        </div>
      </div>

      <div class="flex justify-between h-20 w-full p-5">
        <div>
          <p class="text-gray-600 text-sm">Language</p>
          <p class="text-lg text-yellow-600 font-medium">English</p>
        </div>
        <div class="border border-gray-300 h-full"></div>
        <div>
          <p class="text-gray-600 text-sm">Ratings</p>
          <p class="text-lg text-yellow-600 font-medium">
            {{ data.details.vote_average.toFixed(2) }}
          </p>
        </div>
        <div class="border border-gray-300 h-full"></div>
        <div>
          <p class="text-gray-600 text-sm">Budget</p>
          <p class="text-lg text-yellow-600 font-medium">
            {{ RoundingUpbudget() }} $
          </p>
        </div>
      </div>

      <div class="p-5 flex flex-col gap-3">
        <p class="font-bold text-lg text-gray-700">Story line</p>
        <p class="text-gray-400">
          {{ data.details.overview }}
        </p>
      </div>

      <div class="p-5 pb-10 flex flex-col gap-4">
        <p class="font-bold text-lg text-gray-700 flex items-center gap-1">
          The cast
          <span class="text-xs text-gray-400 font-normal"
            >(Click on image to see character name)</span
          >
        </p>
        <div class="flex gap-2 sm:gap-4 overflow-x-scroll hide-scrollbar">
          <div
            v-for="item in data.cast.slice(0, 8)"
            :key="item"
            class="flex flex-col gap-1"
            @click="changeCastname(item.id)"
          >
            <div class="w-[9.2rem] h-[9.2rem] flex-shrink-0">
              <img
                :src="gtCastImageurl(item?.profile_path)"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <p
              class="text-gray-400 cursor-pointer leading-4 text-center text-sm"
            >
              <span v-if="showCastname == item.id" class="flex flex-col"
                >As <span>{{ item.character }}</span></span
              >
              <span v-else>{{ item.name }}</span>
            </p>
          </div>
        </div>

        <div class="p-5 flex flex-col gap-3 h-full">
          <p class="font-bold text-lg text-gray-700">Trailer</p>

          <div class="flex-col flex w-full h-full sm:flex-row gap-4">
            <div
              class="w-1/2 sm:w-full"
              ref="videoContainer"
              v-for="trailer in data.trailer.slice(0, 2)"
              :key="trailer.key"
            >
              <iframe
                class=""
                :src="trailerurl(trailer.key)"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="fixed z-30 h-screen w-screen bg-black/50 backdrop-blur-[1.5px]"
  ></div>
</template>

<script setup>
import { defineEmits } from "vue";
import { ref, computed } from "vue";

const props = defineProps({
  data: Object,
});
const emit = defineEmits(["close"]);

const closemodal = () => {
  emit("close");
};

const showCastname = ref("");

const changeCastname = (castId) => {
  showCastname.value = showCastname.value === castId ? null : castId;
};

const convertMinutesToHours = (minutes) => {
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;

  return `${hours} hours ${remainingMinutes} minutes`;
};

const convertdate = (originalDate) => {
  const date = new Date(originalDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const RoundingUpbudget = () => {
  let budget = props.data.details.budget;
  if (budget > 1e6) {
    return `${(budget / 1e6).toFixed(0)}M`;
  } else {
    return `${(budget / 1e3).toFixed(0)}K`;
  }
};

const coverImageurl = computed(() => {
  const base = "https://image.tmdb.org/t/p/original";
  return `${base}${props.data?.details.backdrop_path}`;
});

const posterImageurl = computed(() => {
  const base = "https://image.tmdb.org/t/p/w500";
  return `${base}${props.data?.details.poster_path}`;
});

const gtCastImageurl = (img) => {
  const base = "https://image.tmdb.org/t/p/w185";
  return `${base}${img}`;
};

const trailerurl = (key) => {
  console.log(key);

  const base = "https://youtube.com/embed/";
  return `${base}${key}`;
};
console.log(props.data.trailer, "done");
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* For Webkit browsers (Chrome, Safari) */
}
</style>
