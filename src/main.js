import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMoment from 'vue-moment';
import App from './App.vue';
import store from './store';

Vue.use(VueResource);
Vue.use(VueMoment);

Vue.filter('truncate', (str, length) => {
    let returnString = str;
    if (str.length > length) {
        returnString = `${str.substring(0, length)}&#8230;`;
    }
    return returnString;
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
        getEpisodeSkeleton(episode) {
            return {
                title: episode.title,
                link: episode.link,
                publishedDate: episode.pubDate,
                desc: episode.summary,
                duration: episode.duration,
                explicit: episode.explicit,
                media: episode.enclosure,
            };
        },
        addEpisode(podcast, episode) {
            // TODO: add check for duplicate episodes here
            const newEpisode = this.getEpisodeSkeleton(episode);
            podcast.episodes.push(newEpisode);
        },
        fetchEpisodes(podcast, count = 2) {
            if (podcast.episodes.length) {
                return;
            }
            const args = Object.assign({}, this.feedAPI.args);
            args.q = `${this.feedAPI.episodes.select} '${podcast.feed}'`;
            const query = this.toQueryString(args);
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
