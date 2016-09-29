<template>
    <div class="column  is-one-third">
        <aside class="menu">
            <p class="menu-label">
                Filter
            </p>
            <ul class="menu-list">
                <li><a href="#">View All</a></li>
                <li><a href="#">View Unplayed</a></li>
            </ul>
            <p class="menu-label">
                Podcasts
            </p>
            <ul class="menu-list">
                <li v-for="podcast of $root.subscribedPodcasts" track-by="id">
                    <a
                        href="#"
                        @click.prevent="setActivePodcast(podcast)"
                        v-bind:class="{ 'is-active': podcast.id == $root.activePodcast.id }"
                    >
                        {{ podcast.name }}
                    </a>
                    <ul v-show="podcast.episodes.length">
                        <li v-for="episode of podcast.episodes">
                            <a
                                v-bind:class="{ 'is-active': episode.title === $root.activeEpisode.title }"
                                @click.prevent="setActiveEpisode(episode, podcast)"
                                href="#"
                            >
                                {{ episode.title }}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
    export default {
        methods: {
            setActivePodcast(podcast, setActiveEpisode = true) {
                this.$dispatch('setActivePodcast', podcast);
                if (setActiveEpisode) {
                    this.$dispatch('setActiveEpisode', podcast.episodes[0]);
                }
            },
            setActiveEpisode(episode, podcast) {
                this.$dispatch('setActiveEpisode', episode);
                this.setActivePodcast(podcast, false);
            },
        },
    };
</script>
