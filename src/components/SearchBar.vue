<template>
    <section class="section">
        <div class="container">
            <h3 class="title">{{ title }}</h3>
            <div class="control is-grouped">
                <p class="control is-expanded">
                    <input
                        class="input"
                        type="text"
                        placeholder="{{ placeholder }}"
                        v-model="query.params.term"
                        @keyup="search | debounce 500"
                    >
                </p>
                <p class="control">
                    <a
                        class="button is-info"
                        @click="search"
                    >
                        {{ title }}
                    </a>
                </p>
            </div>
        </div>
    </section>
    <section class="section" v-show="results.data">
        <table class="table  is-striped">
            <thead>
                <tr>
                    <th v-for="column of results.columns">
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th v-for="column of results.columns">
                        {{ column.label }}
                    </th>
                </tr>
            </tfoot>
            <tbody>
                <tr v-for="row of results.data" track-by="collectionId">
                    <td>
                        <img
                            v-bind:src="row.artworkUrl100"
                            alt="{{ row.collectionName }}"
                            width="50"
                        />
                    </td>
                    <td>
                        <a href="{{ row.artistViewUrl }}">
                            {{ row.collectionName }}
                        </a>
                    </td>
                    <td>
                        <template v-for="genre of row.genres | limitBy 2">
                            {{ genre }}<span v-if="$index === 0">, </span>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                query: {
                    uri: 'https://itunes.apple.com/search',
                    params: {
                        entity: 'podcast',
                        term: '',
                        callback: ''
                    }
                },
                title: 'Search',
                placeholder: 'This American Life',
                results: {
                    columns: [
                        { key: 'artworkUrl100', label: 'Artwork' },
                        { key: 'collectionName', label: 'Title' },
                        { key: 'genres', label: 'Genres' },
                        { key: 'artistViewUrl', label: 'iTunes URL' },
                        { key: 'feedUrl', label: 'Feed URL' }
                    ],
                    data: []
                }
            }
        },
        methods: {
            search() {
                this.$http.jsonp(this.query.uri, {
                    params: this.query.params,
                    before(request) {
                        // abort previous request, if exists
                        if (this.previousRequest) {
                            this.previousRequest.abort();
                        }
                        // set previous request on Vue instance
                        this.previousRequest = request;
                    }
                })
                .then((response) => {
                    this.results.data = response.data.results;
                }, (response) => {
                    console.log('error', response);
                });
            }
        }
    }
</script>
