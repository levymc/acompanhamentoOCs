import styled from 'styled-components';
import React, { useState, createContext } from "react";

export default function Button(props){
    return (
        <>
            <SCButton>{props.text}</SCButton>
        </>
    )
}
const SCButton = styled.button`
    background-color: #E57373;
    padding: 1rem;
    font-family: 'Lexend Deca', sans-serif;
    font-weight:500;
    min-width: 30vw;
    max-width: 60vw;
    border-radius: 10px;
    border: