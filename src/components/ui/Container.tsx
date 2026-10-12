import type { ReactNode } from "react";

type ContainerProps = { children: ReactNode; className?: string };

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-site px-4 sm:px-8 ${className}`}>{children}</div>;
}
