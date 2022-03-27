import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* windows */}
                    <meta name="msapplication-square192x192logo" content="/icon-192x192.png"/>
                    <meta name="msapplication-square256x256logo" content="/icon-256x256.png"/>
                    <meta name="msapplication-wide384x384logo" content="/icon-384x384.png"/>
                    <meta name="msapplication-square512x512logo" content="/icon-512x512.png"/>
                    <meta name="msapplication-TileColor" content="#000"/>
                    {/* safari */}
                    <meta name="apple-mobile-web-app-capable" content="yes"/>
                    <meta name="apple-mobile-web-app-status-bar-style" content="#000"/>
                    <meta name="apple-mobile-web-app-title" content="myapp"/>
                    <link rel="apple-touch-icon" sizes="192x192" href="/icon-192x192.png"/>
                    {/* 一般 */}
                    <meta name="application-name" content="myapp"/>
                    <meta name="theme-color" content="#000"/>
                    <meta name="description" content="this is myapp"/>
                    <link rel="icon" sizes="192x192" href="/icon-192x192.png"/>
                    <link rel="icon" href="/favicon.ico"/>
                    <link rel="manifest" href="/manifest.webmanifest"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
}

export default MyDocument
