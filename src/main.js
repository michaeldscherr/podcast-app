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
            if (!this.checkPodcastType(podcast)) {
                return;
            }
            const newPodcast = this.getPodcastSkeleton(podcast);
            this.subscribedPodcasts.push(newPodcast);
            this.activePodcast = newPodcast;
            this.$broadcast('subscribed', newPodcast);
        },
        unsubscribe(podcast) {
            if (!this.checkPodcastType(podcast)) {
                return;
            }
            this.subscribedPodcasts
                .filter(pod => pod.id === podcast.id)
                .map(filteredPod => this.subscribedPodcasts.$remove(filteredPod));
            this.activePodcast = this.subscribedPodcasts.length
                ? this.subscribedPodcasts[0]
                : {};
            this.$broadcast('unsubscribed', podcast);
        },
    },
    methods: {
        getPodcastSkeleton(podcast) {
            return {
                id: podcast.collectionId,
                name: podcast.collectionName,
                feed: podcast.feedUrl,
                episodes: [],
            };
        },
        checkPodcastType(podcast) {
            if (typeof podcast !== 'object') {
                throw new Error('Podcast must be of type Object');
            }
            return true;
        },
    },
});
