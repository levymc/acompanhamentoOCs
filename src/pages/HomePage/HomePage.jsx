import styled from 'styled-components';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";


export default function HomePage(){

    const [pages, setPages] = useState([]);

    useEffect(() => {
        function fetchPages() {
            axios.get('http://192.168.0.152:4000/api/paginas').then(response => {
                console.log(response)
                setPages(response.data);
            }).catch(error => {
                console.log(error)
            })
            }
        fetchPages();
    }, []);

        return (
            <ContainerHome>
                <h1>Acompanhamento OCs</h1>
                {pages.map((page, i) => (
                    <Button key={i} text={page["text"]} />
                ))}
                <Logo />
            </ContainerHome>
        );
    }

const ContainerHome = styled.div`
    background-color: #E5E5E5;
    max-height:100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    h1{
        font-size: 25px;
        margin-bottom: 3rem;
    }
`