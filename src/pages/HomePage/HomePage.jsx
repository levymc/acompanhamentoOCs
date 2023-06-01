import styled from 'styled-components';
import Button from '../../components/Button';
import Logo from '../../components/Logo';

export default function HomePage(){

    const pages = [
        {
            text: "Adicionar OCs",
            route: "/",
            onClick: ""
        },
        {
            text: "Histórico",
            route: "/",
            onClick: ""
        },
        {
            text: "Gráficos",
            route: "/",
            onClick: ""
        },
    ]

    return (
        <ContainerHome>
            <h1>Acompanhamento OCs</h1>
            {pages.map((page, i) => <Button text={page.text} />)}
            <Logo />
        </ContainerHome>
    )
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