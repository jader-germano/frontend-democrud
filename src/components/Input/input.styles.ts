import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip/tooltip.index';

interface InputContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    hasErrors: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
    display: flex;
    align-items: center;
    background: #312e38;
    border: 2px solid #686868;
    border-radius: 10px;
    padding: 16px;
    width: 100%;
    & + div {
        margin-top: 8px;
    }
    ${(props) =>
        props.hasErrors &&
        css`
            border-color: grey;
        `}

    ${(props) =>
        props.isFocused &&
        css`
            color: whitesmoke;
            border-color: #ff9900;
        `}

    ${(props) =>
        props.isFilled &&
        css`
            color: #ff9900;
        `}

    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: whitesmoke;
        &::placeholder {
            color: whitesmoke transparent;
        }
    }
    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;

    svg {
        margin: 0;
    }
    span {
        background: darkgrey;
        color: black;

        &::before {
            border-color: darkgrey transparent;
        }
    }
`;
