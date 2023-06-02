import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import BtnHome from '../../components/BtnHome';
import Logo from '../../components/Logo';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import Papa from 'papaparse';

const Export = ({ onExport }) => (
  <SCCSV onClick={onExport}>Exportar CSV</SCCSV>
);

export default function HistoricPage(props) {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get("http://192.168.0.152:4000/api/historico")
      .then(response => {
        props.setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      name: 'OC',
      selector: row => {
        const ocString = row.oc.toString();
        const firstDigits = ocString.substring(0, 9);
        const remainingDigits = ocString.substring(9);
        return `${firstDigits}/${remainingDigits}`;
      },
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

  const filteredData = props.data.filter(item =>
    item.oc.toString().includes(searchText) ||
    item.data.includes(searchText)
  );

  const textTranslations = {
    pagination: {
      rowsPerPage: 'Linhas por página:',
      rangeSeparator: 'de',
      noRowsPerPage: 'Nenhum resultado para exibir',
      showRowsPerPage: 'Exibir linhas por página',
      jumpToPage: 'Ir para página:',
      displayRows: 'de',
    },
    toolbar: {
      search: 'Buscar',
      downloadCsv: 'Download CSV',
      print: 'Imprimir',
      viewColumns: 'Ver colunas',
      filterTable: 'Filtrar tabela',
    },
    filter: {
      all: 'Todos',
      title: 'Filtros',
      reset: 'Resetar',
    },
    viewColumns: {
      title: 'Colunas visíveis',
      titleAria: 'Colunas visíveis',
    },
  };

  const handleExport = () => {
    const csvData = filteredData.map(item => ({
      OC: item.oc,
      Data: item.data,
    }));
    const csvContent = "data:text/csv;charset=utf-8," + Papa.unparse(csvData);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historico.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <ContainerPage>
      <BtnHome />
      <Logo />
      <ContainerTable>
        <section>
          <input type="text" value={searchText} onChange={handleSearch} placeholder="Buscar..." />
        </section>
        <DataTable
          title="Histórico de OCs"
          columns={columns}
          data={filteredData}
          text={textTranslations}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          actions={<Export onExport={handleExport} />}
        />
      </ContainerTable>
    </ContainerPage>
  )
}

const SCCSV = styled.button`
    font-size: 13px;
`

const ContainerPage = styled.div`
  background-color: #E5E5E5;
  max-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 3rem;
`;

const ContainerTable = styled.div`
  width: 50%;
  margin: auto;
  position: relative;
  height: 100%;
  section {
    width: 150px;
    position: absolute;
    top: 40px;
    right: 15px;
    z-index: 99;
  }
`;
