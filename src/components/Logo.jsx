import styled from 'styled-components';
import logo from '../assets/logo.png'

export default function Logo(){
    return (
        <ContainerLogo>
            <img src={logo} alt="" />
        </ContainerLogo>
    )
}
const ContainerLogo = styled.div`
    margin-top: 5rem;
    img{
        width:200px;
    }
`