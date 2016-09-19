import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import App from './App.vue';
import store from './store';

Vue.use(VueResource);
Vue.use(VueMoment);

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: { App },
    data: store.fetch(),
    watch: {
        $data: {
            deep: true,
            handler: store.save,
        },
    },
    events: {
        subscribe(podcast) {
            this.checkPodcastType(podcast);
            const newPodcast = {
                id: podcast.collectionId,
                name: podcast.collectionName,
                feed: podcast.feedUrl,
                episodes: [],
            };
            this.subscribedPodcasts.push(newPodcast);
            this.$broadcast('newSubscription', newPodcast);
        },
        unsubscribe(podcast) {
            this.checkPodcastType(podcast);
            this.subscribedPodcasts.$remove(podcast);
        },
    },
    methods: {
        checkPodcastType(podcast) {
            if (typeof podcast !== 'object') {
                throw new Error('Podcast must be of type Object');
            }
            return true;
        },
    },
});
