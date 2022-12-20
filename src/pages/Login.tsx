import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const Login = () => {
  return (
    <div className='background-image'>
      <Container className='login-container'>
        <Form className='w-100 d-flex flex-column mb-4'>
          <Form.Group controlId='login.email'>
            <Form.Control type='text' placeholder='Användarnamn' />
          </Form.Group>
          <Form.Group controlId='login.password' className='mt-3'>
            <Form.Control type='password' placeholder='Lösenord' />
          </Form.Group>
          <Button type='submit' className='mt-3'>
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
