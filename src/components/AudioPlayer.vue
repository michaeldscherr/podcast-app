<template>
    <section
        class="section"
        v-if="$root.hasActiveEpisode"
    >
        <h3 class="title">Currently Playing: {{ $root.activePodcast.name }}</h3>
        <div class="columns">
            <div class="column  is-half-desktop">
                <div class="box">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image  is-64x64">
                                <img
                                    v-bind:src="$root.activePodcast.artwork"
                                    alt="{{ $root.activePodcast.name }}"
                                />
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>{{ $root.activeEpisode.title }}</strong>
                                    <br />
                                    {{ $root.activeEpisode.desc | trim }}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="column  is-half-desktop">
                <div class="box">
                    <nav class="level">
                        <div class="level-item  has-text-centered">
                            <audio
                                controls
                                v-el:audioPlayer
                                preload="metadata"
                            >
                                <source
                                    v-bind:src="$root.activeEpisode.media.url"
                                    v-bind:type="$root.activeEpisode.media.type"
                                >
                            </audio>
                        </div>
                    </nav>
                    <nav class="level">
                        <div class="level-item  has-text-centered">
                            <p class="heading">
                                Playback
                            </p>
                            <p class="title">
                                {{ playback }}<br />
                                <input
                                    @change="updatePlayback()",
                                    @input="updatePlayback()"
                                    v-model="playback"
                                    type="range"
                                    min="1"
                                    max="2"
                                    step=".1"
                                />
                            </p>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </section>
</template>

<style scope="local" lang="scss">
    nav.level {
        .title {
            font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
        }
    }
    audio {
        width: 100%;
    }
</style>

<script>
    import Vue from 'vue';

    export default {
        data() {
            return {
                playback: 1,
            };
        },
        filters: {
            currentTime(seconds) {
                seconds %= 3600;
                const format = Vue.moment({
                    hours: Math.floor(seconds / 3600),
                    minutes: Math.floor(seconds / 60),
                    seconds: (seconds % 60),
                })
                .format('HH:mm:ss');
                return format;
            },
        },
        events: {
            setActiveEpisode() {
                this.$els.audioplayer.load();
            },
        },
        methods: {
            updatePlayback() {
                this.$els.audioplayer.playbackRate = this.playback;
            },
        },
    };
</script>
