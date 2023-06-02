import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import BtnHome from '../../components/BtnHome';
import Logo from '../../components/Logo';


export default function GraphPage(){
    return (
        <Container>
            <BtnHome />
            <Logo />
            Oe
        </Container>
    )
}

const Container = styled.div`
    background-color: #E5E5E5;
    max-height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 3rem;
`