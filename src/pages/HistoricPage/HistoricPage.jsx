import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import BtnHome from '../../components/BtnHome';
import Logo from '../../components/Logo';

export default function HistoricPage(){
    return (
        <ContainerPage>
            <BtnHome />
            <Logo />
            Oe
        </ContainerPage>
    )
}

const ContainerPage = styled.div`
    background-color: #E5E5E5;
    max-height:100%;
    min-height: 100vh;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    gap: 2rem;
`