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
        width: 540px;
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

export const TableContainer = styled.section`
  margin-top: 5px;
  overflow: scroll;
  max-height: 250px;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 1px;
}

::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: grey;
    -webkit-box-shadow: 0 0 1px grey;
}

  table {
  width: 100%;
  max-width:100%;
	background: #312e38;
	color: grey;
	border: none;
	border-radius: 10px;
	border-color: grey;
    th {
      background: #312e38;
      max-width:100%;
      color: grey;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      border-radius: 10px;
    }
    td {
      max-width:100%;
      padding: 20px 32px;
      border: 0;
      background: #312e38;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;
      text-align: left;
    }
    td:first-child {
      border-radius: 8px 0 0 8px;
    }
    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;

