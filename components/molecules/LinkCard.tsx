import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import {Card} from '@material-ui/core'

/**
 * 1つのカード
 * @param props
 */
export const LinkCard = (props: {url: string, title: string, icon: string}) => {
    const {url, title, icon} = props

    return (
        <Link href={url}>
            <a target="_blank">
                <SCard>
                    {icon &&
                        <SP><SImg src={icon} alt={title} onError={e => e.target.style.display = 'none'}/></SP>
                    }
                    {title}
                </SCard>
            </a>
        </Link>
    )
}


const SCard = styled(Card)`
    padding: 5px 10px;
    word-break: break-word;
`

const SP = styled.p`
    display: inline-block;
    margin: 0 5px 0 0;
    padding: 0;
    width: 20px;
    vertical-align: middle;
`

const SImg = styled.img`
    max-width: 100%;
`