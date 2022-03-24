import React, {useCallback, useRef, useState} from 'react'
import {GetStaticProps} from 'next/types'
import {ContentsServer} from '../server/ContentsServer'
import {Section} from '../components/organisms/Section'
import {TextInput} from '../components/atoms/TextInput'

export type linkType = {
    url: string
    title: string
    icon?: string
}

export type sectionType = {
    heading: string
    links: linkType[]
}

export const getStaticProps: GetStaticProps = async () => {
    const contentsServer = new ContentsServer()
    const contents: sectionType[] = await contentsServer.getContents()
    return {
        props: {
            contents,
        },
    }
}

export default function Home(props: { contents: sectionType[] }) {
    const [bookmarks, setBookmarks] = useState<sectionType[]>(props.contents)
    const [searchText, setSearchText] = useState<string>('')
    const [firstCardUrl, setFirstCardUrl] = useState<string>(props.contents[0].links[0].url)
    const timerRef = useRef(null);

    // Enterを押した時にトップのブックマークを開く
    const pressEnter = (e) => {
        console.log(e)
        if (e.key === 'Enter') {
            if (firstCardUrl !== '') {
                window.open(firstCardUrl, '_ blank');
                textReset()
            } else {
                console.log('Not Enough URL')
            }
        }
    }

    // サーチボックスを空にする
    const textReset = () => {
        console.log("Text Reset")
        changeSearchBox('')
    }

    // サーチボックスのチェンジイベント
    const onChange = (e) => {
        changeSearchBox(e.target.value)
        // タイマーリセット
        stop()
        start()
    }

    // 検索（サーチボックスのテキストに合わせてカード達を更新）
    const newBookmarks = (bookmark, txt): sectionType[] => {
        let firstFlag = true
        setFirstCardUrl('')
        return bookmark.map(i => (
            Object.keys(i).reduce(
                (after, key) => {
                    switch (key) {
                        case 'heading':
                            return {...after, [key]: i[key]}
                        case 'links':
                            return {
                                ...after, [key]: i[key].filter(j => {
                                    let matchFlag = true
                                    for (let k = 0; k < txt.length; k++) {
                                        if (j.title.toLowerCase().indexOf(txt.charAt(k).toLowerCase()) === -1) matchFlag = false
                                    }
                                    if (firstFlag === true && matchFlag === true) {
                                        setFirstCardUrl(j.url)
                                        firstFlag = false
                                    }
                                    return matchFlag
                                }),
                            }
                    }
                }, {},
            )
        ))
    }

    // サーチボックスを更新
    const changeSearchBox = (txt) => {
        // テキストボックス更新
        setSearchText(txt)
        // 表示するカード更新
        setBookmarks(newBookmarks(props.contents, txt))
    }

    // 一定時間経過後にサーチボックスを空にするタイマー
    const start = useCallback(() => {
        if (timerRef.current !== null) {
            return;
        }
        console.log("start")
        timerRef.current = setTimeout(() => {
            textReset()
        }, 5000);
    }, []);
    const stop = useCallback(() => {
        if (timerRef.current === null) {
            return;
        }
        console.log("stop")
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }, []);

    return (
        <>
            {bookmarks.map((i: sectionType) => (
                <Section section={i} key={i.heading}/>
            ))}
            <TextInput searchText={searchText} onChange={onChange} onKeyPress={pressEnter}/>
        </>
    )
}
