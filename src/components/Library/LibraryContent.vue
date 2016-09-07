<template>
    <div class="column">
        <h3 class="title">
            {{ activePodcast.name }}
            <button class="button  is-danger">Unsubscribe</button>
        </h3>
        <div class="columns  is-multiline">
            <template v-for="episode of activePodcast.episodes" track-by="id">
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
        props: ['activePodcast']
    }
</script>
