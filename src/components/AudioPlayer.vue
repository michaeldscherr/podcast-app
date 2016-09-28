<template>
    <section
        class="section"
        v-if="$root.hasActiveEpisode"
    >
        <h3 class="title">Currently Playing: {{ $root.activePodcast.name }}</h3>
        <audio
            v-el:audioPlayer
            preload="auto"
        >
            <source
                v-bind:src="$root.activeEpisode.media.url"
                v-bind:type="$root.activeEpisode.media.type"
            >
        </audio>
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
                                50s
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
                                1h 30s
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

<script>
    export default {
        data() {
            return {
                isPaused: true,
                isMuted: false,
                volume: 1,
                playback: 1,
            };
        },
        methods: {
            updatePlayback() {
                this.$els.audioplayer.playbackRate = this.playback;
            },
            updateVolume() {
                this.$els.audioplayer.volume = this.volume;
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
