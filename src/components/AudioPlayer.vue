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
                                @timeupdate="updateCurrentTime"
                                v-el:audioPlayer
                                preload="auto"
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
                                Controls
                            </p>
                            <p class="title">
                                <span
                                    @click="togglePaused()"
                                    class="icon is-medium">
                                    <i
                                        class="fa"
                                        v-bind:class="{
                                            'fa-play': isPaused,
                                            'fa-pause': !isPaused
                                        }"
                                    ></i>
                                </span>
                                <span
                                    @click="toggleMuted()"
                                    class="icon is-medium">
                                    <i
                                        class="fa"
                                        v-bind:class="{
                                            'fa-volume-up': !isMuted,
                                            'fa-volume-off': isMuted
                                        }"
                                    ></i>
                                </span>
                            </p>
                        </div>
                        <div class="level-item  has-text-centered">
                            <p class="heading">
                                Current Time
                            </p>
                            <p class="title">
                                {{ currentTime | currentTime }}
                            </p>
                        </div>
                        <div class="level-item  has-text-centered">
                            <p class="title">
                                /
                            </p>
                        </div>
                        <div class="level-item  has-text-centered">
                            <p class="heading">
                                Total Time
                            </p>
                            <p class="title">
                                {{ totalTime }}
                            </p>
                        </div>
                    </nav>
                    <nav class="level">
                        <div class="level-item  has-text-centered">
                            <p class="heading">
                                Volume
                            </p>
                            <p class="title">
                                {{ volume * 100 }}<br />
                                <input
                                    @change="updateVolume()",
                                    @input="updateVolume()"
                                    v-model="volume"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                />
                            </p>
                        </div>
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
                isPaused: true,
                isMuted: false,
                volume: 1,
                playback: 1,
                totalTime: 0,
                currentTime: 0,
                progress: 0,
            };
        },
        ready() {
            if (this.$root.activeEpisode) {
                this.setTotalTime();
            }
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
                this.setTotalTime();
                this.$set('currentTime', 0);
            },
        },
        methods: {
            setProgress() {
                const { currentTime, duration } = this.$els.audioplayer;
                this.progress = ((currentTime / duration) * 100).toFixed(2);
            },
            setTotalTime() {
                this.totalTime = this.$root.activeEpisode.duration;
            },
            updateCurrentTime() {
                this.currentTime = Math.floor(this.$els.audioplayer.currentTime);
                this.setProgress();
            },
            updatePlayback() {
                this.$els.audioplayer.playbackRate = this.playback;
            },
            updateVolume() {
                this.$els.audioplayer.volume = this.volume;
            },
            updateTime() {
                this.totalTime = this.$els.audioplayer.currentTime;
            },
            togglePaused() {
                this.isPaused = !this.isPaused;
                if (this.isPaused) {
                    this.$els.audioplayer.pause();
                    return;
                }
                this.$els.audioplayer.play();
            },
            toggleMuted() {
                this.isMuted = !this.isMuted;
                if (this.isMuted) {
                    this.$els.audioplayer.volume = 0;
                    return;
                }
                this.$els.audioplayer.volume = this.volume;
            },
        },
    };
</script>
