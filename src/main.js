// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueQuillEditor from 'vue-quill-editor'

import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'en'}) //locale can be 'zh' or 'en'

import VueMasonryPlugin from 'vue-masonry';

Vue.use(VueMasonryPlugin)


// import F from './tilingMachine.js'
// import './data'

// mount with global
Vue.use(VueQuillEditor)

Vue.config.productionTip = false

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

// F()
//




// if you need register quill modules, you need to introduce and register before the vue program is instantiated
// import Quill from 'quill'
// import { yourQuillModule } from '../yourModulePath/yourQuillModule.js'
// Quill.register('modules/yourQuillModule', yourQuillModule)


// mount with component(can't work in Nuxt.js/SSR)
// import { quillEditor } from 'vue-quill-editor'
//
// export default {
//   components: {
//     quillEditor
//   }
// }
