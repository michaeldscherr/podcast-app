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
                                    <small>{{ $root.activeEpisode.duration }}</small>
                                    <br />
                                    {{ $root.activeEpisode.desc }}
                                </p>
                            </div>
                            <nav class="level">
                                <div class="level-left">
                                    <a class="level-item">
                                        <span class="icon is-large"><i class="fa fa-play"></i></span>
                                    </a>
                                    <a class="level-item">
                                        <span class="icon is-large"><i class="fa fa-pause"></i></span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        //
    };
</script>
