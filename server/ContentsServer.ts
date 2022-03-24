import fs from 'fs'
import readline from 'readline'
import {linkType, sectionType} from '../pages/index'
import {JSDOM} from 'jsdom';
import path from 'path'

/**
 * ページを開くための情報を構築
 */
export class ContentsServer {
    confFile = 'server/link_file_path.conf'

    async getContents(): Promise<sectionType[]> {

        const buff = fs.readFileSync(this.confFile, "utf8").trim();
        let rs = fs.createReadStream(buff, {encoding: 'utf-8'});
        let rl = readline.createInterface({input: rs});

        return new Promise((resolve, reject) => {
                const contents: sectionType[] = [];
                let datas: sectionType
                let link: linkType = {url: null, title: null, icon: null}
                rl.on('line', (data) => {
                    const line = data.trim();
                    if (line === '') {
                    } else if (line.startsWith("#")) {
                    } else if (line.startsWith("* ")) {
                        if (datas !== undefined) contents.push(datas)
                        datas = {
                            heading: data.slice(2),
                            links: [],
                        }
                    } else if (line.startsWith("[") && line.endsWith("]")) {
                        link.title = line.slice(1, -1)
                    } else {
                        link.url = line
                        if (link.title === undefined) link.title = link.url
                        datas.links.push(link)
                        link = {url: null, title: null, icon: null}
                    }
                })
                rl.on('close', async () => {
                    for (const line of contents) {
                        for (const links of line.links) {
                            // 開発中はコメントアウトする
                            links.icon = await getFavicon(links.url)
                        }
                    }
                    resolve(contents)
                })
            },
        )
    }
}

/**
 * URLからファビコンを取得
 * @param url
 */
const getFavicon = async (url: string): Promise<string> => {
    // URLがローカルの場合は処理しない
    if (url.startsWith('http') !== true) return null
    // fetch
    const response = await fetch(url, {mode: 'cors'})
        .catch(() => {
            return null
        })
    // responseがnullの場合。実施しないとコンバイルエラー。
    if (!response) return null

    // HTML取得
    const html = await response.text()
        .catch(() => {
            return null
        })
    if (!html) return null

    // Parserインスタンス化
    const jsdom = new JSDOM();
    const parser = new jsdom.window.DOMParser();
    // パース
    const doc = parser.parseFromString(html, "text/html")
    // rel="icon"を探す
    let search = doc.querySelector('link[rel=icon]')
    // ない場合はrel="shortcut"を探す
    if (!search) search = doc.querySelector('link[rel=shortcut]')
    // それでもない場合はreturn
    if (!search) return null
    let href = search.getAttribute('href')

    // origin
    const index = url.indexOf('/', url.indexOf('/', url.indexOf('/') + 1) + 1)
    let origin
    if (index === -1) {
        // urlがoriginのみの場合
        origin = url
    } else {
        // バス付きの場合はorigin部分のみ切り出す
        origin = url.slice(0, index)
    }

    if (href.startsWith('/')) {
        // 画像URLが"/"から始まる場合
        href = origin + href
    } else if (href.startsWith('http')) {
        // 画像URLが"http"から始まる場合、何もしない
    } else {
        if (index === -1) {
            // urlがoriginのみの場合
            href = origin + href
        } else {
            const parent = path.dirname(url)
            href = parent + href
        }
    }
    return href
}