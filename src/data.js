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
    activePodcast: {},
    subscribedPodcasts: [],
};

/*
https://query.yahooapis.com/v1/public/yql?q=select * from apple.itunes where term='serial' and media='podcast' and entity='podcast' and attribute='titleTerm' and limit='100' and sort='recent';&format=json&env=store://datatables.org/alltableswithkeys

https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20apple.itunes%20where%20term%3D'serial'%20and%20media%3D'podcast'%20and%20entity%3D'podcast'%20and%20attribute%3D'titleTerm'%20and%20limit%3D'100'%20and%20sort%3D'recent'%3B&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
*/

/*
https://developer.yahoo.com/yql/

https://query.yahooapis.com/v1/public/yql?q=select * from xml where url = 'http://shoptalkshow.com/feed/podcast'&format=json&env=store://datatables.org/alltableswithkeys
*/
