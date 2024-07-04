"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";
import { IoClose, IoTrash } from "react-icons/io5";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & { users: User[] };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const otherUser = useOtherUser(data);
  const joineDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);
  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);
  const statusText = useMemo(() => {
    if (data.isGroup) return `${data.users.length} members`;

    return "Actif";
  }, [data]);

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={onClose} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="inset-0 fixed bg-black bg-opacity-40" />
          </Transition.Child>
          <div
            className="
        fixed inset-0 overflow-hidden
          "
          >
            <div className="overflow-hidden absolute inset-0">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className="
                    pointer-events-auto
                    w-screen max-w-md
                  "
                  >
                    <div className="flex flex-col h-full overflow-y-scroll bg-white py-6 shadow-xl ">
                      <div className="px-4 md:px-6 ">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400
                               hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500  focus:ring-offset-2 "
                              onClick={onClose}
                            >
                              <span className="sr-only">Close Panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-1 mt-6 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            <Avatar user={otherUser} />
                          </div>
                          <div>{title}</div>
                          <div className="text-sm text-gray-500">
                            {statusText}
                          </div>
                          <div className="flex gap-10 my-8">
                            <div
                              className="cursor-pointer hover:opacity-75 flex flex-col gap-5 items-center"
                              onClick={() => {}}
                            >
                              <div
                                className="w-10 h-10 bg-neutral-100 rounded-full 
                                flex items-center justify-center
                                "
                              >
                                <IoTrash size={24} />
                              </div>
                              <div className="text-sm text-neutral-600 font-light">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="pb-5 pt-5 w-full sm:pb-5 sm:pt-5 ">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:flex-shrink-0 sm:w-40">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:flex-shrink-0 sm:w-40">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                      {joineDate}
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
