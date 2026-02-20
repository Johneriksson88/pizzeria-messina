import { getMenuFromSheets, flattenMenuForOrder } from "@/lib/menuFromSheets";
import OrderClient from "./OrderClient";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function OrderPage() {
  const menuData = await getMenuFromSheets();
  const flatMenuItems = flattenMenuForOrder(menuData);

  return <OrderClient menuItems={flatMenuItems} />;
}
