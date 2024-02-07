import { defineStore } from "pinia";

export const usedata = defineStore('data', {
    state: () => ({
        allmovies: []

    }),
    getters: {
        allmovie (movie) {
                this.allmovies.push(movie)
        }

    },
    actions: {
    },



    persist: true


})