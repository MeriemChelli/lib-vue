import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import Vue3Geolocation from 'vue3-geolocation';


// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

const app = createApp(App)

app.use(router)
app.use(Vue3Geolocation);
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })

app.mount('#app')
