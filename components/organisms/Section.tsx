import {LinkCard} from '../molecules/LinkCard'
import React from 'react'
import {sectionType} from '../../pages'
import styled from 'styled-components'

/**
 * h2タグとブックマークの集合
 * @param section
 */
export const Section = ({section}: { section: sectionType }) => {
    return (
        <div>
            <h2>{section.heading}</h2>
            <SGrid>
                {section.links && section.links.map((f) => {
                    return (
                        <li key={f.url}>
                            <LinkCard url={f.url} title={f.title} icon={f.icon}/>
                        </li>
                    )
                })}
            </SGrid>
        </div>
    )
}

const SGrid = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 7px 20px;
    justify-content: space-between;
    padding: 0;

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        font-weight: bold;
    }
`
