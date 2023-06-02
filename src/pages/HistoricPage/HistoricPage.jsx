import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import BtnHome from '../../components/BtnHome';
import Logo from '../../components/Logo';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';

export default function HistoricPage() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');

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

    const handleSearch = e => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.oc.toString().includes(searchText) ||
        item.data.includes(searchText)
    );

    return (
        <ContainerPage>
            <BtnHome />
            <Logo />
            <ContainerTable>
                <section><input type="text" value={searchText} onChange={handleSearch} placeholder="Buscar..." /></section> 
                <DataTable
                    title="Histórico de OCs"
                    columns={columns}
                    data={filteredData}
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
    position: relative;
    height: 50rem;
    overflow-y: auto;
    section{
        position: absolute;
        top: 0;
        right: 20px;
        z-index: 99;
    }
`;
