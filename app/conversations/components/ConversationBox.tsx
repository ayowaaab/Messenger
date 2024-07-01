"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { Conversation, Message, User } from "@prisma/client";
import clsx from "clsx";
import { format } from "date-fns/format";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

const ConversationBox = ({
  data,
  selected,
}: {
  data: FullConversationType;
  selected: boolean;
}) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handelClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;

    const seenArray = lastMessage.seen || [];

    if (!userEmail) return false;

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);
  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an Image";
    if (lastMessage?.body) return lastMessage.body;
    return "Started a conversation";
  }, [lastMessage]);
  return (
    <div
      onClick={handelClick}
      className={clsx(
        ` w-full relative flex items-center space-x-3 rounded-lg hover:bg-neutral-100
      cursor-pointer p-3 `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar user={otherUser} />

      <div className={clsx(`min-w-0 flex-1`)}>
        <div className={clsx(`focus:outline-none`)}>
          <div className={clsx(`flex justify-between mb-1 items-center`)}>
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p className={clsx(`truncate text-sm`,hasSeen?'text-gray-500':'text-black font-medium')}>{lastMessageText}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
