import { GeneralAccount, Product, TiereAccount } from "@prisma/client";
import { Select, TextField } from "@radix-ui/themes";
import React, { useState } from "react";

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  data: TiereAccount[] | GeneralAccount[] | Product[];
}

const SelectComponent = ({
  value,
  onValueChange,
  placeholder,
  data,
}: Props) => {
  const [search, SetSearch] = useState("");

  const filteredDataBySearch = search
    ? data.filter((item) =>
        item.name.toLowerCase().startsWith(search.toLowerCase())
      )
    : data;

  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger placeholder={placeholder} />
      <Select.Content>
        <TextField.Root
          value={search}
          onChange={(e) => SetSearch(e.target.value)}
          className="m-2"
          type="search"
          placeholder="Search..."
        />
        <Select.Group>
          {filteredDataBySearch?.map((item) => (
            <Select.Item key={item.id} value={item.id.toString()}>
              {item.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectComponent;
