import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../hooks/useAuth";

const Editor = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const { user } = useContext(AuthContext);
  const toast = useToast();

  return (
    <>
      <Input placeholder="Title" />
      <Textarea />
      <Button>Post</Button>
    </>
  );
};

export default Editor;
