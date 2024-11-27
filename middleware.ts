export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/products/new",
    "/productOperations/new",
    "/generalAccounts/new",
    "/tiereAccounts/new",
    "/accountOperations/new",
    "/dashboard/:path+",
  ],
};
