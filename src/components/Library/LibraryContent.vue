<template>
    <div class="column">
        <h3 class="title" v-show="$root.activePodcast.name">
            {{ $root.activePodcast.name }}
            <button
                class="button  is-danger"
                @click.prevent="unsubscribe($root.activePodcast)"
            >
                Unsubscribe
            </button>
        </h3>
        <template v-if="!$root.isSubscribed">
            <h4 class="title">
                No subscriptions found
            </h4>
            <h5 class="subtitle">
                Use the search above to subscribe to a podcast to get started.
            </h5>
        </template>
        <h4
            class="subtitle"
            v-if="$root.isSubscribed && !$root.activeHasEpisodes"
        >
            No new episodes at this time. please try again later.
        </h4>
        <div class="columns  is-multiline">
            <template v-for="episode of $root.activePodcast.episodes" track-by="title">
                <div class="column  is-half-desktop">
                    <div class="card  is-fullwidth">
                        <header class="card-header">
                            <p class="card-header-title">
                                {{ episode.title }}
                            </p>
                            <template v-if="episode.explicit === 'yes'">
                                <span class="card-header-icon  is-disabled">
                                    <i class="fa  fa-exclamation-circle"></i>
                                </span>
                            </template>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                {{{ episode.desc | truncate 150 }}}
                                <br>
                                <small>
                                    Published
                                    {{ new Date(episode.publishedDate) | moment "from" }}
                                    <br />
                                    Duration: {{ episode.duration }}
                                </small>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a
                                class="card-footer-item"
                                @click.prevent="setActiveEpisode(episode)"
                            >
                                Play
                            </a>
                            <a
                                class="card-footer-item"
                                @click.prevent="removeEpisode(episode)"
                            >
                                Remove
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
        methods: {
            unsubscribe(podcast) {
                this.$dispatch('unsubscribe', podcast);
            },
            removeEpisode(episode) {
                this.$dispatch('removeEpisode', episode);
            },
            setActiveEpisode(episode) {
                this.$root.$set('activeEpisode', episode);
            },
        },
    };
</script>
