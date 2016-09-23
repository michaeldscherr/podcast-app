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
                        v-model="searchTerm"
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
                <tr v-for="row of results.data">
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
                        <template v-if="$root.isAlreadySubscribed(row.collectionId)">
                            <a
                                class="button  is-danger"
                                @click="unsubscribe(row)"
                            >
                                Unsubscribe
                            </a>
                        </template>
                        <template v-else>
                            <a
                                class="button  is-primary"
                                @click="subscribe(row)"
                            >
                                Subscribe
                            </a>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
    import helpers from '../helpers';

    export default {
        data() {
            return {
                searchTerm: '',
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
                const args = Object.assign({}, this.$root.feedAPI.args);
                args.q = `${this.$root.feedAPI.podcasts.select} '${this.searchTerm}'`;
                const query = helpers.toQueryString(args);
                this.$http.jsonp(`${this.$root.feedAPI.base}?${query}`).then((response) => {
                    if (!response || response.data.error || response.data.query.count === 0) {
                        this.$set('results.errorMessage', 'Sorry, no results found');
                        this.$set('results.data', []);
                        return;
                    }
                    let results = response.data.query.results.result.results;
                    if (results && !results.length) {
                        results = [results];
                    }
                    this.$set('results.errorMessage', '');
                    this.$set('results.data', results || []);
                }, () => {
                    this.$set('results.errorMessage', 'Sorry, no results found');
                });
            },
            clearSearch() {
                this.$set('results.errorMessage', '');
                this.$set('results.data', []);
                this.$set('searchTerm', '');
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
