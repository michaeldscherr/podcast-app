<template>
    <section class="hero  is-dark  is-bold">
        <div class="hero-head">
            <header class="nav">
                <div class="container">
                    <div class="nav-left">
                        <a class="nav-item" href="/">
                            {{ sitename | uppercase }}
                        </a>
                    </div>
                    <div class="nav-center nav-menu">
                        <a
                            class="nav-item"
                            v-for="page of pages"
                            href="{{ page.uri }}"
                        >
                            {{ page.title }}
                        </a>
                    </div>
                </div>
            </header>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                sitename: 'Scherrcast',
                pages: [
                    { title: 'Home', uri: '/' },
                    { title: 'Podcasts', uri: '/podcasts' },
                    { title: 'About', uri: '/about' },
                ],
            };
        },
    };
</script>
