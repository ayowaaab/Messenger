"use client"
import Avatar from "@/app/components/Avatar";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const UserBox = ({ data }: { data: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handelClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", { userId: data.id })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div
      onClick={handelClick}
      className="w-full relative flex items-center bg-white rounded-lg transition cursor-pointer space-x-3 p-3 hover:bg-neutral-100"
    >
      <Avatar user={data} />
      <div className="min-w0 flex-1">
        <div className="focus:outline-none">
        <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-medium text-gray-900">{data.name}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
