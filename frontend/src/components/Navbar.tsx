import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import NicknameButton from "./NicknameButton";

import React from "react";

const Navigation = () => {
  return (
    <>
      <Navbar position="static">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit">Cloud School Q&A</p>
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <NicknameButton />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default Navigation;
