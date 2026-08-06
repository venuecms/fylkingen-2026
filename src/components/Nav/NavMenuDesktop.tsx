"use client";

import { ReactNode } from "react";

import { SearchInput } from "../Search/SearchInput";
import { useSearchQuery } from "../Search/provider";

export const NavMenuDesktop = ({
  showSearch,
  children,
}: {
  showSearch: boolean;
  children: ReactNode;
}) => {
  const { isActive } = useSearchQuery();

  // placeholder navigation items

  return (
    <nav className="hidden">
      <div>LOG IN</div>
      <div>SEARCH</div>
      <div>MENU</div>

      {showSearch ? <SearchInput /> : null}
    </nav>
  );
};
