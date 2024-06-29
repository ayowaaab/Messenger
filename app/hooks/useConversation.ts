import { useParams } from "next/navigation";
import { useMemo } from "react";


const useConversation = () => {
  const params = useParams();
  const conversation = useMemo(() => {

  }, []);
};

export default useConversation;
