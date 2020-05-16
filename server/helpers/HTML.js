export default  ({
    inlineCSS, 
    linkTags,
    styleTags,
    scriptTags,
    store,
    html
}) => {
    return `
        <!doctype html>
        <html lang="en">
            <head>
                <base href="/" />
                <meta charset="utf-8">
                <meta name="Title" content="Hacker Rank">
                <meta name="Description" content="Hacker Rank New Portal: 2020">
                <meta name="theme-color" content="#ffffff">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
                <link rel="apple-touch-icon" sizes="48x48" href="/icons/icon-48-48.png">
                <link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-72-72.png">
                <link rel="apple-touch-icon" sizes="96x96" href="/icons/icon-96-96.png">
                <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144-144.png">
                <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192-192.png">
                <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512-512.png">
                <link rel="manifest" href="/manifest.json">
                <title>Hacker Rank News Portal</title>
                <script>
                    if('serviceWorker' in navigator) {
                        navigator
                            .serviceWorker
                            .register('/serviceWorker.js').then(function() { 
                                console.log("Service Worker Registered");
                            });
                    }
                </script>
                <script type="text/javascript">
                    window.onload = function(){
                        var _link = document.createElement("link");
                        _link.href = "https://fonts.googleapis.com/css?family=Ubuntu:400,500,700&display=swap";
                        _link.rel = "stylesheet";
                        document.head.appendChild(_link);
                    }
                </script>
                <style>${inlineCSS}</style>
                ${linkTags}
                ${styleTags}
            </head>
            <body style="margin:0px">
                <script>
                    window.__INITIAL_STATE__ = ${JSON.stringify(store).replace(
                        /</g,
                        '\\u003c'
                    )}
                </script>
                <section id="root">${html}</section>
                ${scriptTags}
            </body>
        </html>
    `
}