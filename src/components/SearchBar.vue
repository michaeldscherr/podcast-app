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
</template>

<script>
    export default {
        data() {
            return {
                query: {
                    uri: 'https://itunes.apple.com/search',
                    params: {
                        entity: 'podcast',
                        term: ''
                    }
                },
                title: 'Search',
                placeholder: 'This American Life',
                results: []
            }
        },
        methods: {
            search() {
                this.$http.get(this.query.uri, {
                    params: this.query.params,
                    before(request) {
                        if (this.previousRequest) {
                            this.previousRequest.abort();
                        }
                        this.previousRequest = request;
                    }
                }).then((response) => {
                    console.log(response);
                    this.results = response;
                }, (response) => {
                    console.log('error', response);
                });
            }
        }
    }
</script>
