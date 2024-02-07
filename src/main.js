import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'; 
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate'

import 'primeicons/primeicons.css'



const pinia = createPinia();
pinia.use(createPersistedState())

const app = createApp(App);


app.use(pinia);
app.use(router);
app.mount('#app')


