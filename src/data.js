export default {
    feedAPI: {
        base: 'https://query.yahooapis.com/v1/public/yql',
        args: {
            format: 'json',
            env: 'store://datatables.org/alltableswithkeys',
            q: '',
        },
        podcasts: {
            select: "select * from apple.itunes where media='podcast' and entity='podcast' and attribute='titleTerm' and limit='5' and sort='recent' and term=",
        },
        episodes: {
            select: 'select * from xml where url=',
        },
    },
    activeEpisode: {},
    activePodcast: {},
    subscribedPodcasts: [],
    audio: {},
};
