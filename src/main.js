// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'
import AppLoader from './components/AppLoader.vue'
import { router } from './routers/web.js'
import '@fontsource/roboto'
import '@fontsource-variable/manrope';
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
// Solid Icon
import { faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons'
// Brands Icon
import { } from '@fortawesome/free-brands-svg-icons'
// Regular Icon
import { } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faMagnifyingGlass)


const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon, 'AppLoader', AppLoader)
app.mount('#app')



