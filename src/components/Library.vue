<template>
    <section class="section">
        <div class="columns">
            <library-nav></library-nav>
            <library-content></library-content>
        </div>
    </section>
</template>

<script>
    import globalData from '../globalData';
    import LibraryContent from './Library/LibraryContent';
    import LibraryNav from './Library/LibraryNav';
    export default {
        components: {
            LibraryNav,
            LibraryContent
        },
        data() {
            return Object.assign(
                {},
                globalData
            );
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
