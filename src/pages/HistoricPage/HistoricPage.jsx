import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import BtnHome from '../../components/BtnHome';
import Logo from '../../components/Logo';
import Swal from 'sweetalert2';
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
          selector: 'oc',
          sortable: true,
        },
        {
          name: 'Data',
          selector: 'data',
          sortable: true,
        },
      ];
      
      const dados = data.map((values, i) => ({
        data: values.data,
        oc: values.oc,
      }));
        // ...outros dados
      

    return (
        <ContainerPage>
            <BtnHome />
            <Logo />
            {/* {data.map((values, i) => <h1>{values.oc}  -  {values.data}</h1>)} */}
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
`