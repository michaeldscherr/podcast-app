<template>
    <section class="section">
        <div class="columns">
            <library-nav
                :subscribed-podcasts="subscribedPodcasts"
                :active-podcast="activePodcast"
            >
            </library-nav>
            <library-content
                :active-podcast="activePodcast"
            >
            </library-content>
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
        props: ['subscribedPodcasts'],
        data() {
            return {
                activePodcast: {},
            }
        },
        events: {
            newSubscription(podcast) {
                this.activePodcast = podcast;
            }
        },
        ready() {
            //
        },
        methods: {
            //
        }
    }
</script>
