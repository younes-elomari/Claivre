import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";

const ProductActions = () => {
  return (
    <Button className="flex">
      <IoAddOutline />
      <Link href="/products/new">Produit</Link>
    </Button>
  );
};

export default ProductActions;
