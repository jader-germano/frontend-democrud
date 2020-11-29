import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    width: 100%;
    max-width: 100;
`;

const appearFromLeft = keyframes`
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    animation: ${appearFromLeft} 1s;
    form {
        margin: 80px;
        width: 340px;
        text-align: center;

        img {
            margin-bottom: 28px;
        }
        button {
            background-color: #404040;
            color: #ffbd00;
             &:hover {
                color: ${shade(0.2, '#ff9900')};
            }
        }

        a {
            color: #ff9900;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#f78a00')};
            }
        }
    }

    > a {
        display: flex;
        align-items: center;
        color: #ff9900;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        svg {
            margin-right: 10px;
        }
        &:hover {
            color: ${shade(0.2, '#f78a00')};
        }
    }
`;

