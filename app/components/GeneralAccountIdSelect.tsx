"use client";
import { Box, Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  generalAccounts: { id: number; name: string }[];
  url: string;
}

const GeneralAccountIdSelect = ({ generalAccounts, url }: Props) => {
  const router = useRouter();
  return (
    <Box>
      <Select.Root
        onValueChange={(generalAccountId) => {
          const query = generalAccountId
            ? `?generalAccountId=${generalAccountId}`
            : "";
          router.push(url + query);
        }}
      >
        <Select.Trigger placeholder="C-Général" />
        <Select.Content>
          <Select.Item value="All">All</Select.Item>
          {generalAccounts.map((account) => (
            <Select.Item key={account.id} value={account.id.toString()}>
              {account.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default GeneralAccountIdSelect;
