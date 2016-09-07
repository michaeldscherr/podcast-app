<template>
    <div id="app">
        <hero></hero>
        <search-bar></search-bar>
        <library></library>
    </div>
</template>

<style src="./styles/main.scss" lang="scss"></style>

<script>
    import Hero from './components/Hero';
    import SearchBar from './components/SearchBar';
    import Library from './components/Library';
    export default {
        components: {
            Hero,
            SearchBar,
            Library
        },
        data() {
            return {
                subscribedPodcasts: [],
            }
        },
        events: {
            'subscribe-to-podcast': function(podcast) {
                let {
                    collectionId: id,
                    collectionName: name,
                    feedUrl: feed
                } = podcast;
                this.subscribe({ id, name, feed });
            },
            'unsubscribe-to-podcast': function(index) {
                this.unsubscribe(index);
            }
        },
        methods: {
            subscribe(podcast) {
                this.subscribedPodcasts.push(podcast);
            },
            unsubscribe(index) {
                this.subscribedPodcasts.slice(index, 1);
            },
        },
    }
</script>
