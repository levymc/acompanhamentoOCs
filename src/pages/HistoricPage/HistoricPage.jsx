import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import BtnHome from '../../components/BtnHome';
import Logo from '../../components/Logo';

export default function HistoricPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://192.168.0.152:4000/api/historico")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <ContainerPage>
            <BtnHome />
            <Logo />
            {data.map((values, i) => <h1>{values.oc}  -  {values.data}</h1>)}
        </ContainerPage>
    )
}

const ContainerPage = styled.div`
    background-color: #E5E5E5;
    max-height:100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
`;
