export default {
    feedAPI: {
        base: 'http://ajax.googleapis.com/ajax/services/feed/load',
        args: {
            v: '1.0',
            num: 100,
            q: '',
        },
    },
    activePodcast: {},
    subscribedPodcasts: [
        /*
        {
            id: 201671138,
            name: 'This American Life',
            feedURL: 'http://feed.thisamericanlife.org/talpodcast',
            episodes: [
                {
                    id: 567,
                    title: 'What’s Going On In There?'
                },
                {
                    id: 595,
                    title: 'Deep End of the Pool'
                }
            ]
        },
        {
            id: 917918570,
            name: 'Serial',
            feedURL: 'http://feeds.serialpodcast.org/serialpodcast',
            episodes: [
                {
                    id: 211,
                    title: 'Present for Duty'
                },
                {
                    id: 210,
                    title: 'Thorny Politics'
                }
            ]
        }
        */
    ],
};
