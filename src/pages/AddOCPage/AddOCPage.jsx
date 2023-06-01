import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import Input from '../../components/Input';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import BtnHome from '../../components/BtnHome';


export default function AddOCPage(){

    const [oc, setOC] = useState("");
    const [ocsAdd, setOcsAdd] = useState(0);
    const [isEmptyError, setIsEmptyError] = useState(false);
    const [isDuplicateError, setIsDuplicateError] = useState(false);
    const [isLengthError, setIsLengthError] = useState(false);


    const enviarDB = (e) => {
        setOcsAdd(ocsAdd+1)
        console.log(oc)
        e.preventDefault();
        axios.post("http://192.168.0.152:4000/api/recebeOC", {oc:oc}).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <ContainerPage>
            <BtnHome />
            <Form className='input-field' onSubmit={enviarDB}>
                <Input 
                    onChange={(e) => setOC(e.target.value)} 
                    placeholder = "Código da OC"
                />
                <button type='submit'> Cadastrar OC </button>
            </Form>
            <h2>{ocsAdd != 0 && ocsAdd}</h2>
            
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
    align-items: center;
    gap: 2rem;
    width: 40vw;
    button{
        padding: 1rem;
        background-color: #E57373;
        color: white;
        border-radius: 10px;
        cursor: pointer;
        border: 1px solid #E57373;
    }
`
