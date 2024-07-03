import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../hooks/useAuth";
import { createPost } from "../utils/fetch-requests";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handlePostClick = async () => {
    const { success, msg } = await (
      await createPost(user!.email, title, body)
    ).json();

    if (!success) {
      toast({ title: msg, status: "error", isClosable: true });
    } else {
      toast({ title: "Posted!", status: "success", isClosable: true });
    }
  };

  return (
    <>
      <Input placeholder="Title" onChange={onTitleChange} />
      <Textarea onChange={onBodyChange} />
      <Button onClick={handlePostClick}>Post</Button>
    </>
  );
};

export default Editor;
