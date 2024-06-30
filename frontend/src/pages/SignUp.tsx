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
import { createUser } from "../functions/fetchRequests";
import { AuthContext } from "../hooks/useAuth";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await createUser(email, password);

    if (success) {
      login({ email });
      navigate("/");
    } else {
      toast({
        title: "Register unsuccessful",
        duration: 2000,
        status: "error",
        isClosable: true,
      });
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
      <Button flex="1" colorScheme="blue" onClick={handleLogin}>
        Create account
      </Button>
      <Link as={NavLink} to="/login">
        Log In
      </Link>
    </>
  );
};

export default SignUp;
