import { Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className='mt-3'>
    <div className='h3'>Hoppsan!</div>
    <div className="p fw-light small">Felkod 404</div>
    <div className="p fw-bold mt-2">Sidan du försökte nå kunde inte hittas, detta kan bero på följande saker:</div>
    <ul className='p-3'>
      <li>Länken som du klickat på gäller inte längre.</li>
      <li>En tillfällig driftstörning.</li>
      <li>Du kan även ha skrivit in fel adress.</li>
    </ul>
  </Container>
  )
}

export default NotFound;