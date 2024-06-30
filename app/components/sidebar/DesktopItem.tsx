"use client";
import clsx from "clsx";
import Link from "next/link";
import { IconType } from "react-icons";

interface DesktopItemProps {
  href: string;
  label: string;
  active?: boolean | undefined;
  onClick?: () => void;
  icon: IconType;
}
const DesktopItem: React.FC<DesktopItemProps> = ({
  active,
  href,
  icon: Icon,
  label,
  onClick,
}) => {
  const handelOnClick = () => {
    if (onClick) return onClick();
  };

  return (
    <li onClick={handelOnClick}>
      <Link
        href={href}
        className={clsx(
          `
        group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-gray-950 hover:bg-gray-100
        `,
          active && "bg-gray-100 text-gray-950"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
