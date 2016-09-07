<template>
    <section class="section">
        <div class="columns">
            <library-nav :podcasts="podcasts"></library-nav>
            <library-content :active-podcast="activePodcast"></library-content>
        </div>
    </section>
</template>

<script>
    import LibraryContent from './Library/LibraryContent';
    import LibraryNav from './Library/LibraryNav';
    export default {
        components: {
            LibraryNav,
            LibraryContent
        },
        data() {
            return {
                activePodcast: {},
                podcasts: [
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
                ]
            }
        },
        ready() {
            this.getPodcasts();
            this.activePodcast = this.podcasts[0];
        },
        methods: {
            getPodcasts() {
                let podcasts = window.localStorage.getItem('scherrcast_podcasts');
                if (podcasts) {
                    this.podcasts.$set(podcasts);
                    return;
                }
            },
            addPodcast(podcast) {
                this.podcasts.push(podcast);
            },
            deletePodcast(index) {
                this.podcasts.slice(index, 1);
            }
        }
    }
</script>
