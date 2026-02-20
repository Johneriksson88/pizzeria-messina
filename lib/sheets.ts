// Google Sheets Menu Integration
// Staff can edit a Google Sheet and changes appear on the website

export interface SheetMenuItem {
  active: boolean;
  category: string;
  subcategory?: string;
  categoryPrice?: string;
  number?: string;
  name: string;
  description: string;
  price?: string;
}

// Parse CSV from Google Sheets
function parseCSV(csv: string): SheetMenuItem[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));

  return lines.slice(1).map(line => {
    // Handle commas inside quoted strings
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const getValue = (col: string) => values[headers.indexOf(col)] || '';
    const activeValue = getValue('active').toLowerCase();

    const item: SheetMenuItem = {
      active: activeValue === 'true' || activeValue === '1' || activeValue === 'ja' || activeValue === 'yes',
      category: getValue('category'),
      subcategory: getValue('subcategory') || undefined,
      categoryPrice: getValue('category_price') || undefined,
      number: getValue('number') || undefined,
      name: getValue('name'),
      description: getValue('description'),
      price: getValue('price') || undefined,
    };

    return item;
  }).filter(item => item.name && item.active); // Filter out empty rows and inactive items
}

// Fetch menu from Google Sheets
export async function fetchMenuFromSheets(): Promise<SheetMenuItem[]> {
  const sheetUrl = process.env.GOOGLE_SHEET_CSV_URL;

  if (!sheetUrl) {
    console.warn('GOOGLE_SHEET_CSV_URL not set, using fallback data');
    return [];
  }

  try {
    // In development, use no-store to always get fresh data
    // In production, use revalidate for ISR
    const isDev = process.env.NODE_ENV === 'development';

    const response = await fetch(sheetUrl, {
      cache: isDev ? 'no-store' : undefined,
      next: isDev ? undefined : { revalidate: 300 }
    });

    console.log(`[Sheets] Fetching from Google Sheets... Status: ${response.status}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const csv = await response.text();
    const items = parseCSV(csv);
    console.log(`[Sheets] Parsed ${items.length} active menu items`);

    // Log first item for debugging
    if (items.length > 0) {
      console.log(`[Sheets] Sample item: ${items[0].name} - ${items[0].price || items[0].categoryPrice}`);
    }

    return items;
  } catch (error) {
    console.error('Error fetching menu from Google Sheets:', error);
    return [];
  }
}

// Group menu items by category and subcategory
export function groupMenuItems(items: SheetMenuItem[]) {
  const grouped: Record<string, Record<string, SheetMenuItem[]>> = {};

  for (const item of items) {
    const cat = item.category || 'Övrigt';
    const subcat = item.subcategory || 'default';

    if (!grouped[cat]) {
      grouped[cat] = {};
    }
    if (!grouped[cat][subcat]) {
      grouped[cat][subcat] = [];
    }
    grouped[cat][subcat].push(item);
  }

  return grouped;
}
