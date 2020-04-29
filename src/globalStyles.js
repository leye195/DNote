import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --greyColor: #A2A19E;
        --blackColor: #373630;
    }
    body{
        background-color:#F7F5F3;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color:var(--blackColor);
        margin:0;
        background: #e3e3e3;
    }
    #root{
        width:100%;
    }
    a {
        color:inherit;
        text-decoration:none;
    }
    div{
        margin:0;
    }
    input,
    textarea{
        appearance:none;
        border:none;
        background-color:transparent;
        resize:none;
        &::placeholder {
            color: #E7E7E6;
        }
        &:focus,
        &:active{
            outline:none;
        }
    }
    .markdown a{
        text-decoration:underline;
    }
    button{
        appearance:none;
        border:none;
        background-color:transparent;
        font-weight:600;
        font-size:15px;
        cursor:pointer;
        border:2.5px solid var(--blackColor);
        &:focus,
        &:active{
            outline:none
        }
    }
`;

export default GlobalStyles;
