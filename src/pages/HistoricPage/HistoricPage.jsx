import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import BtnHome from '../../components/BtnHome';
import Logo from '../../components/Logo';
import DataTable from 'react-data-table-component';

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

    const columns = [
        {
            name: 'OC',
            selector: row => row.oc,
            sortable: true,
        },
        {
            name: 'Data',
            selector: row => row.data,
            sortable: true,
        },
    ];
    
      
    const dados = data.map((values, i) => ({
        data: values.data,
        oc: values.oc,
    }));

    return (
        <ContainerPage>
            <BtnHome />
            <Logo />
            <ContainerTable>
                <DataTable
                    title="Histórico de OCs"
                    columns={columns}
                    data={dados}
                />
            </ContainerTable>
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

const ContainerTable = styled.div`
    width:50%;
    margin: auto;
`;
