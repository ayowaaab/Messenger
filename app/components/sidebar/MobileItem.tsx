import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface MobileItemProps {
  href: string;
  label: string;
  active?: boolean | undefined;
  onClick?: () => void;
  icon: IconType;
}
const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}) => {
  const handelOnClick = () => {
    if (onClick) return onClick();
  };
  return (

      <Link
      onClick={handelOnClick}
        href={href}
        className={clsx(
          `
          group flex gap-x-3 text-sm leading-6
          w-full p-4 font-semibold justify-center
          text-gray-500 hover:text-black hover:bg-gray-100
          `,
          active && "bg-gray-100 text-gray-950"
        )}
      >
        <Icon className="h-6 w-6" />
      </Link>
  );
};

export default MobileItem;
