<template>
    <div id="app">
        <hero></hero>
        <search-bar></search-bar>
        <library></library>
    </div>
</template>

<style src="./styles/main.scss" lang="scss"></style>

<script>
    import store from './store';
    import Hero from './components/Hero.vue';
    import SearchBar from './components/SearchBar.vue';
    import Library from './components/Library.vue';

    export default {
        components: {
            Hero,
            SearchBar,
            Library,
        },
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
    };
</script>
