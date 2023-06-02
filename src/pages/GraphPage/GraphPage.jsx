import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import BtnHome from '../../components/BtnHome';
import Logo from '../../components/Logo';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


export default function GraphPage(props){

    // Extrai os meses do campo "data" das "oc"
    const meses = props.data.map(item => new Date(item.data).getMonth());

    // Conta a ocorrência de cada mês
    const contagemMeses = {};
    meses.forEach(mes => {
        contagemMeses[mes] = contagemMeses[mes] ? contagemMeses[mes] + 1 : 1;
    });

    // Prepara os dados para o gráfico
    const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const contagemData = labels.map((label, index) => contagemMeses[index] || 0);

    // Configuração do gráfico
    const dataChart = {
    labels: labels,
    datasets: [
        {
        label: 'Contagem de OC',
        data: contagemData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Cor das barras
        borderColor: 'rgba(75, 192, 192, 1)', // Cor das bordas das barras
        borderWidth: 1, // Espessura das bordas das barras
        },
    ],
    };


    return (
        <Container>
            <BtnHome />
            <Logo />
            <ContainerGraph>
                <Bar
                    data={dataChart}
                    options={{
                        scales: {
                        y: {
                            beginAtZero: true, // Começar o eixo Y no zero
                            stepSize: 1, // Intervalo entre cada marcação do eixo Y
                        },
                        },
                    }}
                />
            </ContainerGraph>
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
const ContainerGraph = styled.div`
    width: 70%;
    margin: auto;
`