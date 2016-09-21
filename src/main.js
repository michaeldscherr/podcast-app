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
            this.fetchEpisodes(newPodcast);
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
        fetchEpisodes(podcast) {
            if (podcast.episodes.length) {
                return;
            }
            this.feedAPI.args.q = podcast.feed;
            const query = this.toQueryString(this.feedAPI.args);
            this.$http.jsonp(`${this.feedAPI.base}?${query}`).then((response) => {
                const responseJSON = JSON.parse(response.body);
                responseJSON.responseData.feed.entries.forEach(e => podcast.episodes.push(e));
            }, (response) => {
                throw new Error(response);
            });
        },
        checkPodcastType(podcast) {
            if (typeof podcast !== 'object') {
                throw new Error('Podcast must be of type Object');
            }
            return true;
        },
        toQueryString(obj) {
            return Object.keys(obj).map((k) => `${k}=${obj[k]}`)
                .join('&');
        },
    },
});
