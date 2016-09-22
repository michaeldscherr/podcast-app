export default {
    feedAPI: {
        base: 'https://query.yahooapis.com/v1/public/yql',
        selectBase: 'select * from xml where url =',
        args: {
            format: 'json',
            env: 'store://datatables.org/alltableswithkeys',
            q: '',
        },
    },
    activePodcast: {},
    subscribedPodcasts: [],
};

/*
https://developer.yahoo.com/yql/

https://query.yahooapis.com/v1/public/yql?q=select * from xml where url = 'http://shoptalkshow.com/feed/podcast'&format=json&env=store://datatables.org/alltableswithkeys
*/
