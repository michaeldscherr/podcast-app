export default {
    getPodcastSkeleton(podcast) {
        return {
            id: podcast.collectionId,
            name: podcast.collectionName,
            feed: podcast.feedUrl,
            episodes: [],
        };
    },
    getEpisodeSkeleton(episode) {
        return {
            title: episode.title,
            link: episode.link,
            publishedDate: episode.pubDate,
            desc: episode.subtitle,
            duration: episode.duration,
            explicit: episode.explicit,
            media: episode.enclosure,
        };
    },
    toQueryString(obj) {
        if (!this.checkType(obj, 'object')) {
            return false;
        }
        return Object.keys(obj).map((k) => `${k}=${obj[k]}`)
            .join('&');
    },
    checkType(operand, type) {
        return (typeof operand === type);
    },
};
