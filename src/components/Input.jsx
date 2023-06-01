import styled from 'styled-components';


export default function Input(props){
    return (
        <SCInput onChange={props.onChange} className='validate' placeholder={props.placeholder} required type={props.type} />
    )
}

const SCInput = styled.input`
    width: 10px;
`