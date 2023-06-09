import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import '@ionic/react/css/core.css';
import { IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';

export default function BtnHome(){
    const navigateTo = useNavigate();

    const handleGoBack = () => {
        navigateTo(-1); // Navega de volta para a página anterior
    }

    return (
        <SecBtn>
            <IonIcon onClick={handleGoBack} data-test="go-home-header-btn" icon={arrowBackOutline} id="arrowIcon"></IonIcon>
        </SecBtn>
    )
}

const SecBtn = styled.section`
    position: absolute;
    height:auto;
    bottom: 3rem;
    right: 2rem;
    #arrowIcon{
        font-size: 50px;
        cursor: pointer;
        color: #000000;
    }
`