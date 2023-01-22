import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useMutation } from "react-query";
import { useUser } from "../contexts/UserContext";
import { TokenInfo } from "../models/TokenInfo";
import { User } from "../models/User";
import axiosClient from "../utils/axiosClient";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useUser();

  const { mutateAsync: postLogin } = useMutation(
    async () => {
      return await axiosClient.post("/Authenticate/Login", {
        username: userName,
        password: password,
      });
    },
    {
      onSuccess: (data) => {
        if (data) {
          const token: TokenInfo = {
            token: data.data.token,
            expiration: data.data.expiration,
          };
          const user = {
            userId: data.data.userId,
            userName: data.data.userName,
            displayName: data.data.displayName,
            tokenInfo: token,
          } as User;
          setCurrentUser(user);
        }
      },
    },
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    postLogin();
  };

  return (
    <div className='background-image'>
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
