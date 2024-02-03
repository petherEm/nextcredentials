"use client";

import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </span>
  );
};

export default Logout;
