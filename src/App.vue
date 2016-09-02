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
      }
    }
</script>
