import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App.vue';

Vue.use(VueResource);
Vue.http.options.xhr = { withCredentials: true };

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App },
});
