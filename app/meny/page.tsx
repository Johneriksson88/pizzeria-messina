import { getMenuFromSheets } from "@/lib/menuFromSheets";
import MenuClient from "./MenuClient";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function MenuPage() {
  const menuData = await getMenuFromSheets();

  return (
    <MenuClient
      pizzaCategories={menuData.pizzaCategories}
      kebabMenu={menuData.kebabMenu}
      pastaMenu={menuData.pastaMenu}
      salladMenu={menuData.salladMenu}
      barnMenu={menuData.barnMenu}
      alacarteMenu={menuData.alacarteMenu}
      lunchMenu={menuData.lunchMenu}
    />
  );
}
