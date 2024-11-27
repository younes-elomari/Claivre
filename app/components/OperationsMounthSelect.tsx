"use client";
import React from "react";
import _ from "lodash";
import { Box, Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Props {
  mounths: number[];
  url: string;
}

const OperationsMounthSelect = ({ mounths, url }: Props) => {
  const router = useRouter();

  return (
    <Box>
      <Select.Root
        onValueChange={(mounth) => {
          const query = mounth ? `?mounth=${mounth}` : "";
          router.push(url + query);
        }}
      >
        <Select.Trigger placeholder="Le mois" />
        <Select.Content>
          <Select.Item value="All">All</Select.Item>
          {mounths.map((mounth) => (
            <Select.Item key={mounth} value={mounth.toString()}>
              {mounth}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Box>
  );
};

export default OperationsMounthSelect;
