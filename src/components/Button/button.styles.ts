import { shade } from 'polished';
import styled from 'styled-components';

export const ButtonContainer = styled.button`
    background: #404040;
    color: #404040;
    font-weight: 500;
    width: 100%;
    height: 56px;
    padding: 0 16px;
    margin-top: 16px;
    border-radius: 10px;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
        background: ${shade(0.2, '#404040')};
    }
`;
