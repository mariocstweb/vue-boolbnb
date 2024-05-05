/* BOOTSTRAP */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue'

/* IMPORTO LOADER */
import AppLoader from './components/AppLoader.vue'

/* STILE CARATTERE */
import '@fontsource/roboto'
import '@fontsource-variable/manrope';

import App from './App.vue'
// import { library } from '@fortawesome/fontawesome-svg-core'

/* ICONE SOLIDE */
// import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons'

/* BREANDS ICONE */
// import { } from '@fortawesome/free-brands-svg-icons'

/* ICONE REGOLARI */
// import { } from '@fortawesome/free-regular-svg-icons'

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(faMagnifyingGlass)

import { router } from './routers/web.js'

createApp(App).component('AppLoader', AppLoader).use(router).mount('#app')



