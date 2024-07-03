import { CircularProgress } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";
import { User } from "../types";

const RootLayout = () => {
  const { login } = useContext(AuthContext);
  const user = useLoaderData() as User;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      login(user);
    }

    setIsLoading(false);
  }, []);

  return isLoading ? <CircularProgress /> : <Outlet />;
};

export default RootLayout;
