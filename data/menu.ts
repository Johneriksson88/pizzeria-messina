// Pizzeria Messina - Complete Menu Data

export interface MenuItem {
  number?: number | string;
  name: string;
  description: string;
  price?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  price?: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuSection {
  id: string;
  name: string;
  categories?: MenuCategory[];
  items?: MenuItem[];
  description?: string;
  priceInfo?: string;
}

// ===================
// PIZZOR
// ===================

export const pizzaCategories: MenuCategory[] = [
  {
    id: "klass1",
    name: "Pizzor Klass 1",
    price: "137 kr",
    items: [
      { number: 1, name: "Margherita", description: "Ost, färsk basilika, mozzarella" },
      { number: 2, name: "Vesuvio", description: "Skinka" },
      { number: 3, name: "Capricciosa", description: "Skinka, champinjoner" },
      { number: 4, name: "Hawaii", description: "Skinka, ananas" },
      { number: 5, name: "Bolognese", description: "Köttfärssås, lök" },
      { number: 6, name: "Salami", description: "Ventriccina piccante, gröna oliver" },
      { number: 7, name: "Napolitana", description: "Sardeller, kalamataoliver" },
    ],
  },
  {
    id: "klass2",
    name: "Pizzor Klass 2",
    price: "147 kr",
    items: [
      { number: 8, name: "Pepperoni", description: "Mozzarella, pepperonikorv" },
      { number: 9, name: "Gorgonzola", description: "Skinka, gorgonzola, körsbärstomat" },
      { number: 10, name: "Bussola", description: "Skinka, handskalade räkor" },
      { number: 11, name: "Prezzemolo", description: "Handskalade räkor, färsk persilja, vitlök, sambal oelek" },
      { number: 12, name: "Tropicana", description: "Skinka, banan, ananas, curry" },
      { number: 13, name: "Roma", description: "Skinka, champinjoner, handskalade räkor" },
      { number: 14, name: "Quattro Stagioni", description: "Skinka, handskalade räkor, champinjoner, gröna musslor, kronärtskocka, kalamataoliver" },
      { number: 15, name: "Di Pollo", description: "Kyckling, banan, ananas, curry, jordnötter" },
      { number: 16, name: "Kebab Pizza", description: "Kebabkött, körsbärstomat, lök, fefferoni, vitlökssås, stark sås" },
    ],
  },
  {
    id: "klass3",
    name: "Pizzor Klass 3",
    price: "155 kr",
    items: [
      { number: 17, name: "Scampi", description: "Marinerade scampi, champinjoner, färsk persilja, vitlök, körsbärstomater" },
      { number: 18, name: "Messina Special", description: "Oxfilé, champinjoner, körsbärstomat, lök, fefferoni, paprika, vitlök, bearnaisesås" },
      { number: 19, name: "Black & White", description: "Oxfilé, fläskfilé, champinjoner, körsbärstomat, paprika, vitlök, bearnaisesås" },
      { number: 20, name: "Kebab Pizza Special", description: "Kebabkött, pommes, isbergssallad, körsbärstomater, röd lök, fefferoni, vitlökssås, stark sås" },
      { number: 21, name: "Milano", description: "Pepperonikorv, äkta grekisk fetaost, körsbärstomat, kalamataoliver, färsk basilika" },
      { number: 22, name: "Husets (gratinerad)", description: "Handskalade räkor, skinka, champinjoner, lök, paprika" },
      { number: 23, name: "La Favorita", description: "Oxfilé, gorgonzola, champinjoner, körsbärstomater, jalapeño, bearnaisesås" },
      { number: 24, name: "Viking (inbakad)", description: "Kebabkött, isbergssallad, körsbärstomater, fefferoni, vitlökssås, stark sås" },
      { number: 25, name: "Havets Special", description: "Scampi, kräftstjärtar, gröna musslor, vitlök, rucola, citron, sambal oelek" },
      { number: 26, name: "Tabasco", description: "Oxfilé, champinjoner, röd lök, körsbärstomater, tabasco, parmigiano reggiano, bearnaisesås" },
    ],
  },
  {
    id: "delikatess",
    name: "Delikatess Pizzor",
    price: "159 kr",
    description: "Med mozzarella",
    items: [
      { number: 28, name: "Al Prosciutto", description: "Prosciutto, soltorkade tomater, rucola, parmigiano reggiano" },
      { number: 29, name: "Venedig", description: "Avokado, soltorkade tomater, färsk basilika, paprika, honung, chèvre, valnötter" },
      { number: 30, name: "Honung", description: "Prosciutto, chèvre, rostade valnötter, rucola, pesto rosso" },
      { number: 31, name: "Avokado", description: "Champinjoner, kronärtskocka, handskalade räkor, pinjenötter, rucola, citron" },
      { number: 32, name: "Mezza Luna (inbakad/öppen)", description: "Ost, skinka, prosciutto, rucola, parmigiano reggiano, extra virgin olivolja" },
      { number: 33, name: "Formaggio", description: "Mozzarella, äkta grekisk fetaost, gorgonzola, parmigiano reggiano, färsk basilika" },
      { number: 34, name: "Kantareller", description: "Chèvre, rödlök, honung, ventriccina piccante, färsk basilika, pesto rosso" },
      { number: 35, name: "Bagarens", description: "Prosciutto, kronärtskocka, rödlök, körsbärstomater, rucola, parmigiano reggiano" },
      { number: 36, name: "Rödbetspizza", description: "Rödbetor, chèvre, valnötter, sparris, crema di balsamico, rucola" },
      { number: 37, name: "Halloumi Pizza", description: "Halloumi, avokado, valnötter, crema di balsamico, körsbärstomater, rucola" },
    ],
  },
  {
    id: "gourmet",
    name: "Messina's Gourmet Pizzor",
    price: "168 kr",
    description: "På napolitansk vis — olivolja, hyvlad parmesan och fior di latte ingår",
    items: [
      { number: 38, name: "Alle Melanzane", description: "Rökt aubergineröra, körsbärstomater, champinjoner, finhackad vitlök, kronärtskocka, kalamataoliver, basilika" },
      { number: 39, name: "Diavola", description: "Färsk salsiccia, röd chili, gorgonzola, körsbärstomater, karamelliserad lök, basilika, svartpeppar" },
      { number: 40, name: "Fikon", description: "Prosciutto, chèvre, färsk fikon, rostade valnötter, rucola, crema di balsamico" },
      { number: 41, name: "Villa Dante", description: "Prosciutto, ventriccina piccante, karamelliserad lök, körsbärstomater, champinjoner, pinjenötter, balsamico" },
      { number: 42, name: "Barbeque Pizza", description: "Oxfilé, soltorkade tomater, champinjoner, röd chili, hackad vitlök, bearnaisesås, barbequesås (utan tomatsås)" },
    ],
  },
  {
    id: "mexikanska",
    name: "Mexikanska Pizzor",
    items: [
      { number: 43, name: "Mexicana", description: "Köttfärssås, lök, jalapeño, vitlök, tacosås, tacokrydda", price: "149 kr" },
      { number: 44, name: "Azteka", description: "Skinka, jalapeño, tacosås, tacokrydda, gräddfil", price: "149 kr" },
      { number: 45, name: "Acapulco", description: "Oxfilé, champinjoner, lök, jalapeño, vitlök, tacosås, tacokrydda", price: "155 kr" },
    ],
  },
  {
    id: "vegetariska",
    name: "Vegetariska Pizzor",
    price: "149 kr",
    items: [
      { number: 46, name: "Rimini", description: "Äkta grekisk fetaost, soltorkade tomater, champinjoner, kalamataoliver, färsk basilika" },
      { number: 47, name: "Vegetarisk", description: "Champinjoner, lök, körsbärstomater, kalamataoliver, paprika, kronärtskocka, vitlök" },
      { number: 48, name: "Ortolana", description: "Champinjoner, aubergine, zucchini, oliver, lök, paprika, körsbärstomater, vitlök" },
      { number: 49, name: "Pomodoro", description: "Mozzarella, körsbärstomater, basilika, svartpeppar, kalamataoliver, extra virgin olivolja" },
    ],
  },
  {
    id: "inbakade",
    name: "Inbakade Pizzor",
    items: [
      { number: 50, name: "Calzone", description: "Skinka", price: "137 kr" },
      { number: 51, name: "Calzone Capri", description: "Skinka, champinjoner", price: "145 kr" },
      { number: 52, name: "Calzone Bussola", description: "Handskalade räkor, skinka", price: "145 kr" },
      { number: 53, name: "Calzone Special", description: "Handskalade räkor, skinka, champinjoner", price: "149 kr" },
      { number: 54, name: "Tefat (dubbelinbakad)", description: "Handskalade räkor, skinka, champinjoner", price: "155 kr" },
      { number: 55, name: "Super Calzone", description: "Oxfilé, körsbärstomater, gorgonzola, röd chili, bearnaisesås", price: "155 kr" },
      { number: 56, name: "Verzino (halv inbakad)", description: "Oxfilé, champinjoner, körsbärstomater, röd chili, rucola, bearnaisesås, vitlök", price: "155 kr" },
    ],
  },
  {
    id: "pan",
    name: "Pan Pizzor",
    description: "Tjock & krispig botten",
    items: [
      { name: "Dallas", description: "Oxfilé, champinjoner, körsbärstomater, lök, paprika, bearnaisesås", price: "S 189 kr / M 219 kr" },
      { name: "Alaska", description: "Fläskfilé, röd chili, champinjoner, vitlök, bearnaisesås", price: "S 189 kr / M 219 kr" },
      { name: "Honolulu", description: "Skinka, banan, ananas, curry, jordnötter", price: "S 189 kr / M 219 kr" },
      { name: "Arizona", description: "Oxfilé, gorgonzola, tomater, jalapeño, bearnaisesås", price: "S 189 kr / M 219 kr" },
      { name: "Montana", description: "Pepperonikorv, basilika, körsbärstomater", price: "S 189 kr / M 219 kr" },
    ],
  },
];

// ===================
// KEBAB / GYROS / FALAFEL
// ===================

export const kebabMenu: MenuSection = {
  id: "kebab",
  name: "Kebab / Gyros / Falafel",
  description: "Serveras med sallad, vitlökssås och stark sås",
  items: [
    { name: "Med hembakat bröd", description: "Kebab, gyros eller falafel i hembakat bröd", price: "115 kr" },
    { name: "Med hembakad rulle", description: "Kebab, gyros eller falafel i hembakad rulle", price: "139 kr" },
    { name: "Tallrik", description: "Med pommes, ris eller bulgur", price: "145 kr" },
  ],
};

// ===================
// PASTA ALLA PANNA
// ===================

export const pastaMenu: MenuSection = {
  id: "pasta",
  name: "Pasta Alla Panna",
  items: [
    { number: 1, name: "Bolognese", description: "Spaghetti med köttfärssås, parmigiano reggiano", price: "155 kr" },
    { number: 2, name: "Carbonara", description: "Tagliatelle, bacon, lök, svartpeppar och äggula toppad med parmigiano reggiano", price: "155 kr" },
    { number: 3, name: "Canneloni (vegetarisk)", description: "Gratinerad med västerbottenost, kantareller och parmigiano reggiano", price: "155 kr" },
    { number: 4, name: "Delizie (gratinerad)", description: "Med skinka, parmigiano reggiano och zucchini", price: "155 kr" },
    { number: 5, name: "Lasagne al Forno", description: "Gratinerad, hemlagad lasagne", price: "155 kr" },
    { number: 6, name: "Pasta con Pomodorini", description: "Tagliatelle, körsbärstomater, basilika, vitlök, svartpeppar, toppad med färsk mozzarella", price: "155 kr" },
    { number: 7, name: "Pasta con Scampi", description: "Tagliatelle, scampi, vitlök, champinjoner, färsk persilja, svartpeppar, citron, parmigiano reggiano, röd chili", price: "169 kr" },
    { number: 8, name: "Pasta con Filetto di Manzo", description: "Oxfilé, soltorkade tomater, champinjoner, persilja och parmigiano reggiano", price: "169 kr" },
    { number: 9, name: "Pasta con Carne di Maiale", description: "Fläskfilé, kantareller, röd chili, färsk basilika, toppad med parmigiano reggiano", price: "169 kr" },
    { number: 10, name: "Pasta con Pollo", description: "Tagliatelle, kyckling, soltorkade tomater, paprika, curry, pesto, parmigiano reggiano, basilika", price: "169 kr" },
    { number: 11, name: "Pasta al Salmone", description: "Tagliatelle, laxbitar, avokado, champinjoner, körsbärstomater, citron, basilika", price: "169 kr" },
    { number: 12, name: "La Pasta dello Chef", description: "Oxfilé, gorgonzola, röd chili, champinjoner, toppad med parmigiano reggiano", price: "169 kr" },
  ],
};

// ===================
// SALLADER
// ===================

export const salladMenu: MenuSection = {
  id: "sallader",
  name: "Sallader",
  priceInfo: "149 kr",
  items: [
    { number: 1, name: "Ost och Skinksallad", description: "Skinka, ost, ananas, ägg, majs" },
    { number: 2, name: "Grekisk Sallad", description: "Äkta grekisk fetaost, rödlök, kalamataoliver, citron, fefferoni" },
    { number: 3, name: "Tonfisksallad", description: "Tonfisk, rödlök, citron, kalamataoliver, ägg, majs" },
    { number: 4, name: "Kycklingsallad", description: "Kyckling, rödlök, kalamataoliver, majs, ananas, ägg" },
    { number: 5, name: "Kebabsallad", description: "Kebabkött, röd lök, fefferoni" },
    { number: 6, name: "Räksallad", description: "Handskalade räkor, ost, oliver, ägg, citron, rucola, majs" },
    { number: 7, name: "Avokadosallad", description: "Avokado (hel), skinka, ost, handskalade räkor, citron, ägg, majs" },
    { number: 8, name: "Caesarsallad", description: "Kyckling, röd lök, krutonger, majs, parmigiano reggiano" },
    { number: 9, name: "Fikonsallad", description: "Färsk fikon, prosciutto, färsk mozzarella, valnötter, majs, balsamico" },
    { number: 10, name: "Sanna's Special", description: "Kyckling, chèvre, balsamico, valnötter, gröna oliver, majs" },
    { number: 11, name: "Honungsallad", description: "Avokado, prosciutto, soltorkade tomater, valnötter, färsk basilika, honung, chèvre, majs" },
    { number: 12, name: "Chèvresallad", description: "Chèvre, kyckling, lök, honung, soltorkade tomater, valnötter, majs, russin" },
    { number: 13, name: "Haloumisallad", description: "Halloumi, avokado, parmigiano reggiano, majs, russin, rödbetor" },
    { number: 14, name: "Kräftsallad", description: "Kräftstjärtar, avokado, röd lök, parmigiano reggiano, majs, ägg" },
  ],
};

// ===================
// BARNMENY
// ===================

export const barnMenu: MenuSection = {
  id: "barn",
  name: "Barnmeny",
  items: [
    { name: "Pannkakor (4 st)", description: "Med sylt och grädde", price: "89 kr" },
    { name: "90 gr Meny", description: "Med pommes och läsk 33 cl", price: "119 kr" },
    { name: "Chicken Nuggets (5 bitar)", description: "Av kycklingbröstfilé, serveras med sallad, pommes och valfri sås", price: "119 kr" },
    { name: "Spaghetti Bolognese", description: "Pasta med köttfärssås", price: "125 kr" },
    { name: "Lasagne", description: "Hemlagad lasagne", price: "125 kr" },
    { name: "Pizza", description: "Valfri pizza i mindre storlek", price: "15 kr mindre än ordinarie" },
  ],
};

// ===================
// À LA CARTE
// ===================

export const alacarteMenu: MenuSection = {
  id: "alacarte",
  name: "À la Carte",
  items: [
    { name: "Chicken Nuggets (9 bitar)", description: "Av kycklingbröstfilé, serveras med sallad, pommes och valfri sås", price: "139 kr" },
    { name: "Högrevsburgare (150 gr)", description: "Hemmagjord med karamelliserad lök, cheddar, jalapeño, tomat", price: "149 kr" },
  ],
};

// ===================
// LUNCH
// ===================

export const lunchMenu: MenuSection = {
  id: "lunch",
  name: "Lunch",
  priceInfo: "137 kr",
  description: "Inkl: 33 cl läsk, bröd, sallad, kaffe/te",
  items: [
    { name: "Pizza (nr 1-7)", description: "Valfri pizza från Klass 1" },
    { name: "Pasta (nr 1-6)", description: "Valfri pasta från menyn" },
    { name: "Sallader", description: "Valfri sallad från menyn" },
    { name: "Kebab", description: "Med valfritt tillbehör" },
    { name: "Gyros", description: "Med valfritt tillbehör" },
    { name: "Falafel", description: "Med valfritt tillbehör" },
    { name: "Högrevsburgare", description: "Hemmagjord med pommes och chilimajo" },
    { name: "Kycklingbröstfilé", description: "På grillpanna, serveras med rödvinssås, ris eller bulgur" },
    { name: "Panerad Fisk", description: "Med remouladsås, serveras med ris eller pommes" },
    { name: "Fläsknoisette", description: "Med pommes och bearnaisesås" },
    { name: "Fläskschnitzel", description: "Serveras med stekt potatis, rödvinssås, ärtor och citron" },
  ],
};

// ===================
// ALL MENU SECTIONS
// ===================

export const allMenuSections = [
  { id: "lunch", name: "Lunch", section: lunchMenu },
  { id: "pizzor", name: "Pizzor", categories: pizzaCategories },
  { id: "kebab", name: "Kebab", section: kebabMenu },
  { id: "pasta", name: "Pasta", section: pastaMenu },
  { id: "sallader", name: "Sallader", section: salladMenu },
  { id: "barn", name: "Barnmeny", section: barnMenu },
  { id: "alacarte", name: "À la Carte", section: alacarteMenu },
];
