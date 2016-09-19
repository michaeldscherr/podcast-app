import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import App from './App.vue';
import globalData from './data';

Vue.use(VueResource);
Vue.use(VueMoment);

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App },
    data: globalData,
});
