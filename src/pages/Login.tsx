import { useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useMutation } from "react-query";
import { AuthUser, Client } from "../api/client";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useUser();
  const client = new Client();

  const { mutateAsync: postLogin, isLoading: postingLogin } = useMutation(
    async () => {
      return await client.authenticate_Login({
        username: userName,
        password: password,
      });
    },
    {
      onSuccess: (data) => {
        if (data) {
          let authUser: AuthUser = data;
          setCurrentUser(authUser);
        }
      },
    },
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    postLogin();
  };

  if (postingLogin)
    return (
      <div className='flex-fill justify-content-center align-items-center d-flex'>
        <Spinner as='span' animation='border' />
      </div>
    );

  return (
    <div className='background-image safe-area'>
      <Container className='login-container'>
        <Form className='w-100 d-flex flex-column mb-4' onSubmit={submit}>
          <Form.Group controlId='login.username'>
            <Form.Control
              type='text'
              placeholder='Användarnamn'
              value={userName}
              autoComplete='login.username'
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='login.password' className='mt-3'>
            <Form.Control
              type='password'
              placeholder='Lösenord'
              autoComplete='login.password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' disabled={userName && password ? false : true} className='mt-3'>
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
