import { useRouter } from "next/router";
import Detail from "./detail";

const Post = () => {
  const router = useRouter();

  return (
    <Detail arrNum={router.query.num} />
  );
}

export default Post