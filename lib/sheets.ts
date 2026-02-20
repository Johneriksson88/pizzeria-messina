// Google Sheets Menu Integration
// Staff can edit a Google Sheet and changes appear on the website

export interface SheetMenuItem {
  category: string;
  subcategory?: string;
  number?: string;
  name: string;
  description: string;
  price?: string;
}

// Parse CSV from Google Sheets
function parseCSV(csv: string): SheetMenuItem[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

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

    const item: SheetMenuItem = {
      category: values[headers.indexOf('category')] || '',
      subcategory: values[headers.indexOf('subcategory')] || undefined,
      number: values[headers.indexOf('number')] || undefined,
      name: values[headers.indexOf('name')] || '',
      description: values[headers.indexOf('description')] || '',
      price: values[headers.indexOf('price')] || undefined,
    };

    return item;
  }).filter(item => item.name); // Filter out empty rows
}

// Fetch menu from Google Sheets
export async function fetchMenuFromSheets(): Promise<SheetMenuItem[]> {
  const sheetUrl = process.env.GOOGLE_SHEET_CSV_URL;

  if (!sheetUrl) {
    console.warn('GOOGLE_SHEET_CSV_URL not set, using fallback data');
    return [];
  }

  try {
    const response = await fetch(sheetUrl, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const csv = await response.text();
    return parseCSV(csv);
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
