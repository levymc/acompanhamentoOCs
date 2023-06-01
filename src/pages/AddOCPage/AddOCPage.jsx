import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import Input from '../../components/Input';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function AddOCPage(){
    return (
        <ContainerPage>
            <Form className='input-field' action='http://192.168.0.152:4000/api/recebeOC'>
                <Input />
                <button type='submit'> Enviar</button>
            </Form>
            
        </ContainerPage>
    )
}

const ContainerPage = styled.div`
    background-color: #E5E5E5;
    max-height:100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
`
