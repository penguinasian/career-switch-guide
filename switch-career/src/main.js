import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faFacebook)
library.add(faTwitter)
library.add(faUserSecret)
// Vue.component('font-awesome-icon', FontAwesomeIcon)
createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
