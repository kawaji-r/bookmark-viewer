import '../src/style.css'
import Head from 'next/head'
import React from 'react'

function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Bookmarks</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp