import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import App from './App.vue';
import store from './store';
import helpers from './helpers';

Vue.use(VueResource);
Vue.use(VueMoment);

Vue.filter('truncate', (str, length) => {
    let returnString = str;
    if (str.length > length) {
        returnString = `${str.substring(0, length)}&#8230;`;
    }
    return returnString.trim();
});

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
    computed: {
        isSubscribed() {
            return (
                this.subscribedPodcasts &&
                this.subscribedPodcasts.length > 0
            );
        },
        activeHasEpisodes() {
            return (
                this.activePodcast.episodes &&
                this.activePodcast.episodes.length > 0
            );
        },
    },
    events: {
        subscribe(podcast) {
            if (!helpers.checkType(podcast, 'object')) {
                return;
            }
            const newPodcast = helpers.getPodcastSkeleton(podcast);
            if (this.isAlreadySubscribed(newPodcast.id)) {
                return;
            }
            this.subscribedPodcasts.push(newPodcast);
            this.activePodcast = newPodcast;
            this.fetchEpisodes(newPodcast);
            this.$broadcast('subscribed', newPodcast);
        },
        unsubscribe(podcast) {
            if (!helpers.checkType(podcast, 'object')) {
                return;
            }
            const curID = podcast.id || podcast.collectionId;
            this.subscribedPodcasts
                .filter(pod => pod.id === curID)
                .map(filteredPod => this.subscribedPodcasts.$remove(filteredPod));
            this.activePodcast = this.subscribedPodcasts[0] || {};
            this.$broadcast('unsubscribed', podcast);
        },
        removeEpisode(episode, podcast = this.activePodcast) {
            podcast.episodes.$remove(episode);
            this.$broadcast('removeEpisode', episode);
        },
    },
    methods: {
        addEpisode(podcast, episode) {
            // TODO: add check for duplicate episodes here
            const newEpisode = helpers.getEpisodeSkeleton(episode);
            podcast.episodes.push(newEpisode);
        },
        fetchEpisodes(podcast, count = 2) {
            if (podcast.episodes.length) {
                return;
            }
            const args = Object.assign({}, this.feedAPI.args);
            args.q = `${this.feedAPI.episodes.select} '${podcast.feed}'`;
            const query = helpers.toQueryString(args);
            this.$http.jsonp(`${this.feedAPI.base}?${query}`).then((response) => {
                if (!response || response.data.error || response.data.query.count === 0) {
                    // TODO: handle error here
                    return;
                }
                const episodes = response.data.query.results.rss.channel.item;
                episodes.slice(0, count)
                    .forEach((episode) => this.addEpisode(podcast, episode));
            }, (response) => {
                throw new Error(response);
            });
        },
        isAlreadySubscribed(podcastID) {
            const result = this.subscribedPodcasts.filter((podcast) => podcast.id === podcastID);
            return (result.length > 0);
        },
    },
});
