<template>
    <div id="app">
        <hero></hero>
        <search-bar></search-bar>
    </div>
</template>

<style src="./styles/main.scss" lang="scss"></style>

<script>
    import Hero from './components/Hero';
    import SearchBar from './components/SearchBar';
    export default {
      components: {
        Hero,
        SearchBar
      }
    }
</script>
