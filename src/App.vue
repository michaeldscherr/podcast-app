<template>
    <div id="app">
        <hero></hero>
        <search-bar></search-bar>
        <library :subscribed-podcasts="subscribedPodcasts"></library>
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
                subscribedPodcasts: [
                    /*
                    {
                        id: 201671138,
                        name: 'This American Life',
                        feedURL: 'http://feed.thisamericanlife.org/talpodcast',
                        episodes: [
                            {
                                id: 567,
                                title: 'What’s Going On In There?'
                            },
                            {
                                id: 595,
                                title: 'Deep End of the Pool'
                            }
                        ]
                    },
                    {
                        id: 917918570,
                        name: 'Serial',
                        feedURL: 'http://feeds.serialpodcast.org/serialpodcast',
                        episodes: [
                            {
                                id: 211,
                                title: 'Present for Duty'
                            },
                            {
                                id: 210,
                                title: 'Thorny Politics'
                            }
                        ]
                    }
                    */
                ],
            }
        },
        events: {
            subscribe(podcast) {
                if (typeof podcast !== 'object') {
                    throw new Error('Podcast must be of type Object');
                    return;
                }
                const newPodcast = {
                    id: podcast.collectionId,
                    name: podcast.collectionName,
                    feed: podcast.feelUrl,
                    episodes: []
                };
                this.subscribedPodcasts.push(newPodcast);
                this.$broadcast('newSubscription', newPodcast);
            },
            unsubscribe(id) {
                if (typeof id !== 'number') {
                    throw new Error('Index must be of type Number');
                    return;
                }
                this.subscribedPodcasts.forEach((index, podcast) => {
                    if (podcast.collectionId === id) {
                        this.subscribedPodcasts.slice(index, 1);
                    }
                })
            }
        },
        methods: {
            //
        },
    }
</script>
