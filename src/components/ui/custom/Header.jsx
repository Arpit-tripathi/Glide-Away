import React from "react";
import { Button } from "../button";

function Header() {
  return (
    <div className="h-16 shadow-sm  flex justify-between items-center ">
      <img src="/public/logo-t.png" alt="logo"  className="h-32 w-32 "/>
      <div className="mx-5">
        <Button>sign in</Button>
      </div>
    </div>
  );
}

export default Header;
