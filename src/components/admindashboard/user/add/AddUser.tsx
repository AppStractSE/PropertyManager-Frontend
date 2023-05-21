import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { TeamResponseDto, UserInfoDto } from "../../../../api/client";
import { useClient } from "../../../../contexts/ClientContext";
import toasts from "../../../../data/toasts";

interface Props {
  users: UserInfoDto[];
  teams: TeamResponseDto[];
  close?: () => void;
}

const AddUser = ({ users, teams, close }: Props) => {
  const [roleValue, setRoleValue] = useState("Fastighetsskötare");
  const [validated, setValidated] = useState(false);
  const client = useClient();
  const queryClient = useQueryClient();

  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    password: "",
    username: "",
  });

  const { mutate: postUser, isLoading: postingUser } = useMutation(
    async (user: typeof userData) =>
      roleValue === "Admin"
        ? await client.authenticate_RegisterAdmin(user)
        : await client.authenticate_Register(user),
    {
      onSuccess: () => {
        roleValue !== "Admin" && queryClient.invalidateQueries("users");
        setUserData({
          displayName: "",
          email: "",
          password: "",
          username: "",
        });
        setValidated(false);
        toast.success(toasts.create.user.onMutate.message);
      },
    },
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    setValidated(true);
    postUser(userData);
    form.reset();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let username = value
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/å/g, "a")
      .replace(/ö/g, "oe")
      .replace(/\s/g, "_")
      .normalize("NFD")
      .replace(/[^\w\s]/g, "");

    if (name === "displayName") {
      setUserData((prevState) => ({ ...prevState, [name]: value, username }));
    } else {
      setUserData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Visningsnamn</Form.Label>
        <Form.Text as='div' className='mb-2 mt-0'>
          Visningsnamn är det namn som visas för andra användare.
        </Form.Text>
        <Form.Control
          required
          name='displayName'
          minLength={3}
          maxLength={50}
          type='text'
          placeholder='Fyll i visningsnamn. Ex: Johan Andersson'
          value={userData.displayName
            .split(" ")
            .map((word) => {
              return word.charAt(0).toUpperCase() + word.slice(1);
            })
            .join(" ")}
          onChange={handleChange}
        />
        <Form.Control.Feedback className='mb-2' type='invalid'>
          Ange ett visningsnamn som är mellan 3 och 50 tecken.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Användarnamn</Form.Label>
        <Form.Text as='div' className='mb-2 mt-0'>
          Användarnamnet används vid inlogg (Endast A-Z).
        </Form.Text>
        <Form.Control
          className='mb-2'
          type='text'
          placeholder='Fyll i användarnamn. Ex: johan_andersson'
          name='username'
          minLength={3}
          maxLength={50}
          required
          autoComplete='off'
          value={userData.username}
          onChange={handleChange}
        />
        <Form.Control.Feedback className='mb-2' type='invalid'>
          Ange ett användarnamn som är mellan 3 och 50 tecken.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Text as='div' className='mb-2 mt-0'>
          Email används för att återställa lösenord.
        </Form.Text>
        <Form.Control
          required
          name='email'
          isInvalid={userData.email.length > 0 && !userData.email.includes("@" && ".")}
          className='mb-2'
          type='email'
          placeholder='Fyll i email. Ex: johan_andersson123@gmail.com'
          value={userData.email}
          onChange={handleChange}
        />
        <Form.Control.Feedback className='mb-2' type='invalid'>
          Ange en giltig email.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Lösenord</Form.Label>
        <Form.Text as='div' className='mb-2 mt-0'>
          Lösenordet används vid inlogg.
        </Form.Text>
        <Form.Control
          required
          autoComplete='false'
          className='mb-2'
          name='password'
          pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}'
          type='text'
          placeholder='Fyll i lösenord'
          value={userData.password}
          onChange={handleChange}
        />
        <Form.Control.Feedback className='mb-2' type='invalid'>
          Ange ett giltigt lösenord (minst 8 tecken långt, innehållande 1 versal bokstav, 1 siffra
          och 1 specialtecken).
        </Form.Control.Feedback>
      </Form.Group>
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

      <Button type='submit' className='w-100'>
        Lägg till användare
      </Button>
    </Form>
  );
};

export default AddUser;
