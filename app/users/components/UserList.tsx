import { User } from "@prisma/client";
import React from "react";
import UserBox from "./UserBox";

const UserList = ({ items }: { items: User[] }) => {
  return (
    <div>
      <aside
        className="fixed inset-0 pb-0
      lg:pb-0 lg:left-20 lg:w-80 left-0 overflow-y-auto
       border-r border-gray-200 block w-full"
      >
        <div className="px-5">
          <div className="flex-col">
            <div className="text-2xl font-bold text-neutral-800 py-4">
              People
            </div>
          </div>

          {items.map((item) => (
            <UserBox key={item.id} data={item} />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default UserList;
