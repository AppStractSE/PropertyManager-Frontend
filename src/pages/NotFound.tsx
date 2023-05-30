import { Container } from "react-bootstrap";
import React from "react";

const NotFound = () => {
  return (
    <Container className='mt-3 mb-3'>
      <div className='h3'>Hoppsan!</div>
      <div className='p fw-light small'>Felkod 404</div>
      <div className='p fw-bold mt-2'>
        Sidan du försökte nå kunde inte hittas, detta kan bero på följande saker:
      </div>
      <ul className='p-3'>
        <li>Länken som du klickat på gäller inte längre.</li>
        <li>En tillfällig driftstörning.</li>
        <li>Du kan även ha skrivit in fel adress.</li>
      </ul>
      <div className='p fw-bold'>Vad kan du göra?</div>
      <ul className='p-3'>
        <li>Gå tillbaka till föregående sida och försök igen, eller gå till startsidan.</li>
        <li>Om du skrev in adressen själv, kontrollera att stavningen är korrekt.</li>
        <li>
          Om du klickade på en länk, kontrollera att länken är korrekt och kontakta oss om problemet
          kvarstår.
        </li>
      </ul>
    </Container>
  );
};

export default NotFound;
