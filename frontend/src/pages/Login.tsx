import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import LogoIcon from "../components/LogoIcon";

const Login = () => {
  return (
    <>
      <LogoIcon boxSize="48px" mb="4"/>
      <FormControl id="email" mb="4">
        <FormLabel>Email address</FormLabel>
        <Input type="email" />
      </FormControl>
      <FormControl id="password" mb="4">
        <FormLabel>Password</FormLabel>
        <Input type="password" />
      </FormControl>
      <Button flex="1" colorScheme="blue">Login</Button>
    </>
  );
};

export default Login;
