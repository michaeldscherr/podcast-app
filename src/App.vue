<template>
    <div id="app">
        <hero></hero>
        <search-bar></search-bar>
        <library></library>
        <audio-player></audio-player>
        <main-footer></main-footer>
    </div>
</template>

<style src="./styles/main.scss" lang="scss"></style>

<script>
    import Hero from './components/Hero.vue';
    import SearchBar from './components/SearchBar.vue';
    import Library from './components/Library.vue';
    import AudioPlayer from './components/AudioPlayer.vue';
    import MainFooter from './components/MainFooter.vue';

    export default {
        components: {
            Hero,
            SearchBar,
            Library,
            AudioPlayer,
            MainFooter,
        },
    };
</script>
