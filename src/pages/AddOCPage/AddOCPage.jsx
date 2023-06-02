import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import Input from '../../components/Input';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import BtnHome from '../../components/BtnHome';
import Logo from '../../components/Logo';
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br';

export default function AddOCPage(){

    const [oc, setOC] = useState("");
    const [qnt, setQnt] = useState(0);
    const [ocsAdd, setOcsAdd] = useState(0);
    const [isEmptyError, setIsEmptyError] = useState(false);
    const [isDuplicateError, setIsDuplicateError] = useState(false);
    const [isLengthError, setIsLengthError] = useState(false);

    dayjs.locale('pt-br');
    const hoje = dayjs().format('DD/MM/YYYY - h:m')

    console.log(hoje)

    const enviarDB = (e) => {
        setOcsAdd(ocsAdd+1)
        setOC("")
        console.log(oc)
        e.preventDefault();
        axios.post("http://192.168.0.152:4000/api/recebeOC", {
            oc: oc,
            quantidadePecas: qnt,
            data: dayjs().format('DD/MM/YYYY - h:m'),
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <ContainerPage>
            <BtnHome />
            <Logo />
            <Form className='input-field' onSubmit={enviarDB}>
                <div id="title">Código da OC</div>
                <Input 
                    onChange={(e) => setOC(e.target.value)} 
                    value={oc}
                    placeholder="Código da OC"
                    type="number"
                    id="oc"
                />
                {/* <Input 
                    onChange={(e) => setQnt(e.target.value)} 
                    placeholder = "Quantidade de Peças na OC"
                    type = "number"
                    id="qnt"
                /> */}
                <button type='submit'> Cadastrar OC </button>
            </Form>
            <h2>{ocsAdd != 0 && "Quantidade de OCs adicionadas:  "+ ocsAdd}</h2>
            
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
    /* gap: 2rem; */
    h2{
        font-size: 20px;
        color: #740101;
    }
`
const Form = styled.form`
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    width: 40vw;
    button{
        padding: 1rem;
        background-color: #E57373;
        color: white;
        border-radius: 10px;
        cursor: pointer;
        border: 1px solid #E57373;
    }
    #title{
        width: 100%;
        text-align: start;
    }
`
