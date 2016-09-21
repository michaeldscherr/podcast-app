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
            <template v-for="episode of $root.activePodcast.episodes" track-by="title">
                <div class="column  is-one-third">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">
                                {{ episode.title }}
                            </p>
                            <a class="card-header-icon">
                                <i class="fa fa-angle-down"></i>
                            </a>
                        </header>
                        <div class="card-content">
                            <div class="content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
                                <br>
                                <small>11:09 PM - 1 Jan 2016</small>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a class="card-footer-item">Save</a>
                            <a class="card-footer-item">Play</a>
                            <a class="card-footer-item">Delete</a>
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
