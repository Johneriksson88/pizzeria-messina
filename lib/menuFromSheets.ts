// Transform Google Sheets data to UI menu format
import { SheetMenuItem, fetchMenuFromSheets } from './sheets';
import {
  MenuItem,
  MenuCategory,
  MenuSection,
  pizzaCategories as fallbackPizzaCategories,
  kebabMenu as fallbackKebabMenu,
  pastaMenu as fallbackPastaMenu,
  salladMenu as fallbackSalladMenu,
  barnMenu as fallbackBarnMenu,
  alacarteMenu as fallbackAlacarteMenu,
  lunchMenu as fallbackLunchMenu,
} from '@/data/menu';

// Pizza subcategory order and IDs
const PIZZA_SUBCATEGORIES: Record<string, { id: string; description?: string }> = {
  'Klass 1': { id: 'klass1' },
  'Klass 2': { id: 'klass2' },
  'Klass 3': { id: 'klass3' },
  'delikatess': { id: 'delikatess', description: 'Med mozzarella' },
  'Gourmet': { id: 'gourmet', description: 'På napolitansk vis — olivolja, hyvlad parmesan och fior di latte ingår' },
  'Mexikanska': { id: 'mexikanska' },
  'Vegetariska': { id: 'vegetariska' },
  'Inbakade': { id: 'inbakade' },
  'Pan': { id: 'pan', description: 'Tjock & krispig botten' },
};

// Transform sheet item to MenuItem
function toMenuItem(item: SheetMenuItem): MenuItem {
  return {
    number: item.number ? (isNaN(Number(item.number)) ? item.number : Number(item.number)) : undefined,
    name: item.name,
    description: item.description,
    price: item.price || item.categoryPrice || undefined,
  };
}

// Group items by category and subcategory
function groupSheetItems(items: SheetMenuItem[]) {
  const grouped: Record<string, Record<string, SheetMenuItem[]>> = {};

  for (const item of items) {
    const cat = item.category;
    const subcat = item.subcategory || 'default';

    if (!grouped[cat]) grouped[cat] = {};
    if (!grouped[cat][subcat]) grouped[cat][subcat] = [];
    grouped[cat][subcat].push(item);
  }

  return grouped;
}

// Build pizza categories from sheet data
function buildPizzaCategories(pizzaItems: Record<string, SheetMenuItem[]>): MenuCategory[] {
  const categories: MenuCategory[] = [];

  // Process in defined order
  for (const [subcatName, config] of Object.entries(PIZZA_SUBCATEGORIES)) {
    const items = pizzaItems[subcatName];
    if (!items || items.length === 0) continue;

    // Get category price from first item
    const categoryPrice = items[0].categoryPrice;

    categories.push({
      id: config.id,
      name: subcatName === 'Klass 1' || subcatName === 'Klass 2' || subcatName === 'Klass 3'
        ? `Pizzor ${subcatName}`
        : subcatName === 'Gourmet'
        ? "Messina's Gourmet Pizzor"
        : subcatName === 'delikatess'
        ? 'Delikatess Pizzor'
        : subcatName === 'Mexikanska'
        ? 'Mexikanska Pizzor'
        : subcatName === 'Vegetariska'
        ? 'Vegetariska Pizzor'
        : subcatName === 'Inbakade'
        ? 'Inbakade Pizzor'
        : subcatName === 'Pan'
        ? 'Pan Pizzor'
        : subcatName,
      price: categoryPrice,
      description: config.description,
      items: items.map(toMenuItem),
    });
  }

  return categories;
}

// Build a menu section from sheet data
function buildMenuSection(
  id: string,
  name: string,
  items: SheetMenuItem[],
  options?: { priceInfo?: string; description?: string }
): MenuSection {
  // Get price info from first item's categoryPrice or individual price
  const priceInfo = options?.priceInfo || items[0]?.categoryPrice;

  return {
    id,
    name,
    priceInfo,
    description: options?.description,
    items: items.map(toMenuItem),
  };
}

export interface TransformedMenu {
  pizzaCategories: MenuCategory[];
  kebabMenu: MenuSection;
  pastaMenu: MenuSection;
  salladMenu: MenuSection;
  barnMenu: MenuSection;
  alacarteMenu: MenuSection;
  lunchMenu: MenuSection;
}

export interface FlatMenuItem {
  category: string;
  name: string;
  description: string;
  price: string;
  number?: number | string;
}

// Flatten menu for order page
export function flattenMenuForOrder(menu: TransformedMenu): FlatMenuItem[] {
  const items: FlatMenuItem[] = [];

  // Add pizzas
  for (const cat of menu.pizzaCategories) {
    for (const item of cat.items) {
      items.push({
        category: cat.name,
        name: item.name,
        description: item.description,
        price: item.price || cat.price || "",
        number: item.number,
      });
    }
  }

  // Add kebab
  for (const item of menu.kebabMenu.items || []) {
    items.push({
      category: "Kebab",
      name: item.name,
      description: item.description,
      price: item.price || "",
    });
  }

  // Add pasta
  for (const item of menu.pastaMenu.items || []) {
    items.push({
      category: "Pasta",
      name: item.name,
      description: item.description,
      price: item.price || "",
      number: item.number,
    });
  }

  // Add salads
  for (const item of menu.salladMenu.items || []) {
    items.push({
      category: "Sallader",
      name: item.name,
      description: item.description,
      price: item.price || menu.salladMenu.priceInfo || "",
      number: item.number,
    });
  }

  return items;
}

// Main function to fetch and transform menu data
export async function getMenuFromSheets(): Promise<TransformedMenu> {
  try {
    const sheetItems = await fetchMenuFromSheets();

    // If no sheet data, use fallback
    if (sheetItems.length === 0) {
      return {
        pizzaCategories: fallbackPizzaCategories,
        kebabMenu: fallbackKebabMenu,
        pastaMenu: fallbackPastaMenu,
        salladMenu: fallbackSalladMenu,
        barnMenu: fallbackBarnMenu,
        alacarteMenu: fallbackAlacarteMenu,
        lunchMenu: fallbackLunchMenu,
      };
    }

    const grouped = groupSheetItems(sheetItems);

    // Build each menu section
    const pizzaCategories = grouped['Pizza']
      ? buildPizzaCategories(grouped['Pizza'])
      : fallbackPizzaCategories;

    const kebabMenu = grouped['Kebab']?.['default']
      ? buildMenuSection('kebab', 'Kebab / Gyros / Falafel', grouped['Kebab']['default'], {
          description: 'Serveras med sallad, vitlökssås och stark sås'
        })
      : fallbackKebabMenu;

    const pastaMenu = grouped['Pasta']?.['default']
      ? buildMenuSection('pasta', 'Pasta Alla Panna', grouped['Pasta']['default'])
      : fallbackPastaMenu;

    const salladMenu = grouped['Sallader']?.['default']
      ? buildMenuSection('sallader', 'Sallader', grouped['Sallader']['default'])
      : fallbackSalladMenu;

    const barnMenu = grouped['Barnmeny']?.['default']
      ? buildMenuSection('barn', 'Barnmeny', grouped['Barnmeny']['default'])
      : fallbackBarnMenu;

    const alacarteMenu = grouped['A la Carte']?.['default'] || grouped['À la Carte']?.['default']
      ? buildMenuSection('alacarte', 'À la Carte',
          grouped['A la Carte']?.['default'] || grouped['À la Carte']?.['default'])
      : fallbackAlacarteMenu;

    // Lunch has subcategories: Standard and Dagens
    const lunchItems = grouped['Lunch'];
    let lunchMenu: MenuSection;
    if (lunchItems) {
      const allLunchItems = [
        ...(lunchItems['Standard'] || []),
        ...(lunchItems['Dagens'] || []),
        ...(lunchItems['default'] || []),
      ];
      lunchMenu = buildMenuSection('lunch', 'Lunch', allLunchItems, {
        priceInfo: allLunchItems[0]?.categoryPrice || '137 kr',
        description: 'Inkl: 33 cl läsk, bröd, sallad, kaffe/te'
      });
    } else {
      lunchMenu = fallbackLunchMenu;
    }

    return {
      pizzaCategories,
      kebabMenu,
      pastaMenu,
      salladMenu,
      barnMenu,
      alacarteMenu,
      lunchMenu,
    };
  } catch (error) {
    console.error('Error transforming menu from sheets:', error);
    // Return fallback data on any error
    return {
      pizzaCategories: fallbackPizzaCategories,
      kebabMenu: fallbackKebabMenu,
      pastaMenu: fallbackPastaMenu,
      salladMenu: fallbackSalladMenu,
      barnMenu: fallbackBarnMenu,
      alacarteMenu: fallbackAlacarteMenu,
      lunchMenu: fallbackLunchMenu,
    };
  }
}
