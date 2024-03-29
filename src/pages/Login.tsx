import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useMutation } from "react-query";
import { Client, AuthUser } from "../api/client";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, login } = useUser();
  const { setCurrentUser } = useUser();
  const client = new Client();
  const navigate = useNavigate();

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
          const authUser: AuthUser = data;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          setToken(authUser?.tokenInfo!); // Update token
          setCurrentUser(authUser);
          login();
        }
      },
      retry(failureCount, error: any) {
        if (error.status === 500) {
          return false;
        }
        return failureCount < 1;
      },
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postLogin();
    navigate("/"); // Redirect to the authenticated section after successful login
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
        <Form className='w-100 d-flex flex-column mb-4' onSubmit={handleSubmit}>
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
          <Button type='submit' disabled={!userName || !password} className='mt-3'>
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
