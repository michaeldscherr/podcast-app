<template>
    <section class="section">
        <div class="columns">
            <library-nav></library-nav>
            <library-content></library-content>
        </div>
    </section>
</template>

<script>
    import data from '../data';
    import LibraryContent from './Library/LibraryContent.vue';
    import LibraryNav from './Library/LibraryNav.vue';

    export default {
        components: {
            LibraryNav,
            LibraryContent,
        },
        data() {
            return Object.assign(
                {},
                data
            );
        },
        ready() {
            //
        },
        methods: {
            //
        },
    };
</script>
