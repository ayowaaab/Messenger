"use client";
import { User } from "@prisma/client";
import Image from "next/image";

const Avatar = ({ user }: { user: User }) => {
  return (
    <div className="relative">
      <div
        className="
      relative inline-block
      rounded-full overflow-hidden
      h-9 w-9 md:h-11 md:w-11
      "
      >
        <Image fill src={user.image || "/img/placeholder.jpg"} alt="avatar" />
      </div>
      <span className=" bg-green-500 absolute block rounded-full w-2 h-2 top-0 right-0 md:h-3 md:w-3 ring-2 ring-white" />
    </div>
  );
};

export default Avatar;
