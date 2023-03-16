import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TeamResponseDto, UserInfoDto } from "../../../api/client";

interface Props {
  users: UserInfoDto[];
  teams: TeamResponseDto[];
  close?: () => void;
}

const AddUser = ({ users, teams, close }: Props) => {
  const [userNameValue, setUserNameValue] = useState("");
  const [displayNameValue, setDisplayNameValue] = useState("");
  const [roleValue, setRoleValue] = useState("Fastighetsskötare");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const newUser = {
    userName: userNameValue,
    displayName: displayNameValue,
    role: roleValue,
  };

  console.log(newUser);

  return (
    <Form>
      <div className='row'>
        <Form.Group className='col-6'>
          <Form.Label>Visningsnamn</Form.Label>
          <Form.Text as='div' className='mb-2 mt-0'>
            Visningsnamn är det namn som visas för andra användare.
          </Form.Text>
          <Form.Control
            type='text'
            placeholder='Fyll i visningsnamn'
            value={displayNameValue}
            onChange={(e) => {
              setDisplayNameValue(e.target.value);
              setUserNameValue(e.target.value.replace(/ /g, "_").toLocaleLowerCase());
            }}
          />
        </Form.Group>
        <Form.Group className='col-6'>
          <Form.Label>Användarnamn</Form.Label>
          <Form.Text as='div' className='mb-2 mt-0'>
            Användarnamnet används vid inlogg.
          </Form.Text>
          <Form.Control
            className='mb-2'
            type='text'
            placeholder='Fyll i användarnamn'
            value={userNameValue}
            onChange={(e) => setUserNameValue(e.target.value)}
          />
        </Form.Group>
      </div>
      <div className='row'>
        <Form.Group className='col-6'>
          <Form.Label>Email</Form.Label>
          <Form.Text as='div' className='mb-2 mt-0'>
            Email används för att återställa lösenord.
          </Form.Text>
          <Form.Control
            className='mb-2'
            type='email'
            placeholder='Fyll i email'
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='col-6'>
          <Form.Label>Lösenord</Form.Label>
          <Form.Text as='div' className='mb-2 mt-0'>
            Lösenordet används vid inlogg.
          </Form.Text>
          <Form.Control
            className='mb-2'
            type='password'
            placeholder='Fyll i lösenord'
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          />
        </Form.Group>
      </div>
      <div className='row'>
        <Form.Group className='mb-3'>
          <Form.Label>Roll</Form.Label>
          <Form.Text as='div' className='mb-2 mt-0'>
            Välj användarroll.
          </Form.Text>
          <div className='d-flex gap-2 align-items-center mb-1'>
            <Form.Check
              defaultChecked
              type='radio'
              name='test'
              value='Fastighetsskötare'
              onChange={(e) => setRoleValue(e.target.value)}
            />
            <div>Fastighetsskötare</div>
          </div>
          <div className='d-flex gap-2 align-items-center'>
            <Form.Check
              type='radio'
              name='test'
              value='Admin'
              onChange={(e) => setRoleValue(e.target.value)}
            />
            <div>Admin</div>
          </div>
        </Form.Group>
      </div>

      <Button
        className='w-100'
        onClick={() => console.log("Add user")}
        disabled={userNameValue.length < 3 ? true : false}
      >
        Lägg till användare
      </Button>
    </Form>
  );
};

export default AddUser;
