<template>
    <div id="app">
        <hero></hero>
        <search-bar></search-bar>
        <library></library>
    </div>
</template>

<style src="./styles/main.scss" lang="scss"></style>

<script>
    import Hero from './components/Hero.vue';
    import SearchBar from './components/SearchBar.vue';
    import Library from './components/Library.vue';

    export default {
        components: {
            Hero,
            SearchBar,
            Library,
        },
    };
</script>
