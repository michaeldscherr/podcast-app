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
                        @keyup="search | debounce 250"
                    >
                </p>
                <p class="control">
                    <a
                        class="button is-primary"
                        @click="search"
                    >
                        {{ title }}
                    </a>
                    <a
                        class="button is-info"
                        @click="clearSearch"
                    >
                        Clear Search
                    </a>
                </p>
            </div>
            <h4 v-show="results.errorMessage">{{ results.errorMessage }}</h4>
        </div>
        <table class="table  is-striped" v-show="results.data.length">
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
                    <td width="50">
                        <img
                            v-bind:src="row.artworkUrl100"
                            alt="{{ row.collectionName }}"
                            width="50"
                        />
                    </td>
                    <td>
                        <a href="{{ row.trackViewUrl }}" target="_blank">
                            {{ row.collectionName }}
                            <span class="icon  is-small">
                                <i class="fa fa-external-link"></i>
                            </span>
                        </a>
                    </td>
                    <td>
                        {{ row.primaryGenreName }}
                    </td>
                    <td>
                        {{ row.releaseDate | moment "MMM DD, YYYY" }}
                    </td>
                    <td class="is-icon">
                        <a
                            class="button  is-primary"
                            @click="subscribe(row)"
                        >
                            Subscribe
                        </a>
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
                        media: 'podcast',
                        attribute: 'titleTerm',
                        term: '',
                        callback: '',
                        limit: 10,
                        explicit: 'Yes',
                        lang: 'en_us',
                    },
                },
                title: 'Search',
                placeholder: 'This American Life',
                results: {
                    columns: [
                        { key: 'artworkUrl100', label: 'Artwork' },
                        { key: 'collectionName', label: 'Title' },
                        { key: 'primaryGenreName', label: 'Genre' },
                        { key: 'releaseDate', label: 'Release Date' },
                        { key: 'feedUrl', label: 'Feed URL' },
                    ],
                    data: [],
                    errorMessage: '',
                },
            };
        },
        methods: {
            search() {
                this.$http.jsonp(this.query.uri, {
                    params: this.query.params,
                })
                .then((response) => {
                    if (response.data.results.length === 0) {
                        this.$set('results.errorMessage', 'Sorry, no results found');
                        this.$set('results.data', []);
                        return;
                    }
                    this.$set('results.errorMessage', '');
                    this.$set('results.data', response.data.results);
                }, () => {
                    this.$set('results.errorMessage', 'Sorry, no results found');
                });
            },
            clearSearch() {
                this.$set('results.errorMessage', '');
                this.$set('results.data', []);
                this.$set('query.params.term', '');
            },
            subscribe(podcast) {
                this.$dispatch('subscribe', podcast);
            },
            unsubscribe(podcast) {
                this.$dispatch('unsubscribe', podcast);
            },
        },
    };
</script>

<style lang="scss" scope="local">
    .table {
        td {
            vertical-align: middle;
        }
    }
    .icon {
        &.is-small {
            vertical-align: middle;
        }
    }
</style>
