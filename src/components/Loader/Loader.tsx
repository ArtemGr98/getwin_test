import loader from './loader2.gif'
import styled from 'styled-components'

const LoaderImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
`

const Loader = () => {
    return <LoaderImg src={loader} alt="loader"/>
}

export default Loader