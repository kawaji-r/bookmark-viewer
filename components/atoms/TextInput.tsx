import styled from 'styled-components'
import {TextField} from '@material-ui/core'
import React, {useEffect} from 'react'

export const TextInput = (props) => {
    const input = React.createRef<HTMLInputElement>();
    const {searchText, onChange, onKeyPress} = props

    // keydownイベントでサーチボックスにフォーカス
    useEffect(() => {
        document.addEventListener('keydown', () => {
            if (input && input.current && input.current.focus) {
                input.current.focus()
            }
        }, false)
    }, [searchText])

    return (
        <STextField
            inputRef={input}
            id="outlined-basic"
            value={searchText}
            onChange={onChange}
            onKeyPress={onKeyPress}
            label="Outlined"
            variant="outlined"
        />
    )
}

const STextField = styled(TextField)`
    position: fixed !important;
    top: 15px;
    right: 15px;
    background-color: #fff;
`