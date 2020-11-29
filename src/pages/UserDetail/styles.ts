import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: flex-start;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    width: 100%;
    max-width: 100%;
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
    content: initial;
    display: flex;
    flex-grow: 1;

    animation: ${appearFromLeft} 1s;
    form {
        position: absolute;
        top: 3%;
        scroll-behavior: smooth;
        margin: 2px 2px 2px 2px;
        width: 340px;
        text-align: center;

        h1 {

            font-family: 'Roboto Slab';
            margin: 8px;
            color: #f78a00;
            text-align: left;
        }
        h4 {
            font-family: 'Roboto Slab';
            margin: 15px 0px 5px 5px;
            color: #f78a00;
            text-align: left;
        }
        button {
            background-color: #404040;
            color: #ffbd00;
             &:hover {
                color: ${shade(0.2, '#ff9900')};
            }
            margin-bottom: 5%;
        }

        a {
            color: grey;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, 'grey')};
            }
        }

    }

    > a {
        display: flex;
        align-items: center;
        color: grey;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;
        svg {
            margin-right: 10px;
        }
        &:hover {
            color: ${shade(0.2, 'grey')};
        }
    }

`;


