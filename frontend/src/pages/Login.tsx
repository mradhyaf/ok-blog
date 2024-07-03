import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoIcon from "../components/LogoIcon";
import { AuthContext } from "../hooks/useAuth";
import { postAuthLogin } from "../utils/fetch-requests";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    const response = await postAuthLogin(email, password);
    const { success, user } = await response.json();

    if (!success) {
      toast({
        title: "Invalid credentials",
        status: "error",
        isClosable: true,
      });
    } else {
      login(user);
      navigate("/");
    }
  };

  return (
    <>
      <LogoIcon boxSize="48px" mb="4" />
      <FormControl id="email" mb="4">
        <FormLabel>Email address</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" mb="4">
        <FormLabel>Password</FormLabel>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleLogin}>
        Login
      </Button>
      <Link as={NavLink} to="/signup">
        Sign Up
      </Link>
    </>
  );
};

export default Login;
