<template>
    <div class="column">
        <h3 class="title" v-show="$root.activePodcast.name">
            {{ $root.activePodcast.name }}
            <button class="button  is-danger" @click="unsubscribe($root.activePodcast)">Unsubscribe</button>
        </h3>
        <h4
            class="subtitle"
            v-if="!$root.activePodcast.episodes || !$root.activePodcast.episodes.length"
        >
            no new episodes at this time. please try again later.
        </h4>
        <div class="columns  is-multiline">
            <template v-for="episode of $root.activePodcast.episodes" track-by="id">
                <div class="column  is-one-third">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                                {{ episode.title }}
                            </p>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                {{{ episode.contentSnippet }}}
                                <br>
                                <small>
                                    Published
                                    {{ new Date(episode.publishedDate) | moment "from" }}
                                </small>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a
                                class="card-footer-item"
                                @click="stream(episode)"
                            >
                                Play
                            </a>
                            <a
                                class="card-footer-item"
                            >
                                Delete
                            </a>
                            <a
                                class="card-footer-item"
                                href="{{ episode.link }}"
                                target="_blank"
                            >
                                View&nbsp;
                                <span class="icon  is-small">
                                    <i class="fa fa-external-link"></i>
                                </span>
                            </a>
                        </footer>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        ready() {
            //
        },
        methods: {
            unsubscribe(podcast) {
                this.$dispatch('unsubscribe', podcast);
            },
        },
    };
</script>
