<template>
    <section class="section">
        <div class="columns">
            <library-nav></library-nav>
            <library-content></library-content>
        </div>
    </section>
</template>

<script>
    import LibraryContent from './Library/LibraryContent.vue';
    import LibraryNav from './Library/LibraryNav.vue';

    export default {
        components: {
            LibraryNav,
            LibraryContent,
        },
        ready() {
            //
        },
        methods: {
            //
        },
    };
</script>
