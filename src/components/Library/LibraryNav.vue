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
                <li v-for="podcast of subscribedPodcasts" track-by="id">
                    <a href="#">{{ podcast.name }}</a>
                    <ul v-show="podcast.episodes.length">
                        <li v-for="episode of podcast.episodes">
                            <a href="#">{{ episode.title }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
    import data from '../../data';

    export default {
        data() {
            return Object.assign(
                {},
                data
            );
        },
    };
</script>
