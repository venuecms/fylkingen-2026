import { CopyIcon } from "lucide-react";
import { ReactNode } from "react";

import { Link } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ButtonPrimaryProps {
  href?: string;
  children: ReactNode;
  isShare?: boolean;
  isExternal?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ButtonPrimary = ({
  href,
  children,
  isShare,
  isExternal,
  className,
  onClick,
}: ButtonPrimaryProps) => {
  // TODO: Make share copy the link to clipboard and

  let Element = isExternal ? "a" : Link;
  if (!href) {
    Element = "button";
  }

  return (
    <Element
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-4 whitespace-nowrap border border-primary px-4 py-1 text-sm text-primary transition-colors duration-300 hover:bg-overlay",
        className,
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={onClick}
    >
      {children}

      {isShare ? <CopyIcon className="size-4" /> : null}
    </Element>
  );
};
