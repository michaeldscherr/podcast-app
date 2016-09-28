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
                                {{ volume }}<br />
                                <input
                                    v-model="volume"
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
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
                volume: 100,
                playback: 1,
            };
        },
        methods: {
            togglePaused() {
                this.isPaused = !this.isPaused;
            },
            toggleMuted() {
                this.isMuted = !this.isMuted;
            },
        },
    };
</script>
