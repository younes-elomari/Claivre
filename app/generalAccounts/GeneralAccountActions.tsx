"use client";
import { Button } from "@radix-ui/themes";
import { IoAddOutline } from "react-icons/io5";
import Link from "next/link";

const GeneralAccountActions = () => {
  return (
    <Button className="flex">
      <IoAddOutline />
      <Link href="/generalAccounts/new">c-général</Link>
    </Button>
  );
};

export default GeneralAccountActions;
