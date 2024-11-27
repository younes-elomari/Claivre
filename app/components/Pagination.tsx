"use client";
import { Flex, Button, Text } from "@radix-ui/themes";
import React from "react";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2" className="font-medium">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        onClick={() => changePage(1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <RxDoubleArrowLeft />
      </Button>
      <Button
        onClick={() => changePage(currentPage - 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <GoChevronLeft />
      </Button>
      <Button
        onClick={() => changePage(currentPage + 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <GoChevronRight />
      </Button>
      <Button
        onClick={() => changePage(pageCount)}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <RxDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
