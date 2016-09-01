<template>
    <div id="app">
        <hero></hero>
        <search-bar></search-bar>
    </div>
</template>

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
