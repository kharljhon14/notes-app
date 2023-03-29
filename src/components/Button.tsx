import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  onClick?: Function;
}
export function Button({ children, className, onClick }: Props) {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={`${className} button`}
    >
      {children}
    </button>
  );
}
