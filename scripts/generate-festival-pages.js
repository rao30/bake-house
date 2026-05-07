#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const PHONE = "919849450882";
const WA = `https://wa.me/${PHONE}`;
const waText = (msg) => `${WA}?text=${encodeURIComponent(msg)}`;

const FESTIVALS = [
    {
        slug: "diwali",
        emoji: "🪔",
        name: "Diwali Hampers",
        title: "Diwali Hampers — The BakeHouse",
        tagline: "Light up the festival of lights with our handcrafted gift boxes.",
        description: "Curated Diwali hampers with brownies and cookies, packaged in festive tins. Pre-order on WhatsApp.",
        heroImage: "/images/menu/brownie_06.webp",
        ogImage: "/images/menu/brownie_06.webp",
        accent: "Festival of Lights · Pre-orders open",
        offerings: [
            {
                name: "Sparkler Box",
                price: "₹650",
                description: "6 brownies + 6 mixed cookies in a festive tin. Great as a gift box or personal indulgence.",
                image: "/images/menu/brownie_06.webp"
            },
            {
                name: "Diya Hamper",
                price: "₹950",
                description: "9 brownies, 12 cookies, and a small marble loaf. A larger box for family sharing.",
                image: "/images/menu/cookie_07.webp"
            },
            {
                name: "Roshni Premium",
                price: "₹1,500",
                description: "Custom-decorated half-kg cake + brownie box + cookie box. Our signature gifting choice for clients and family.",
                image: "/images/menu/custom_cake_04.webp"
            }
        ],
        gallery: ["brownie_03.webp", "cookie_12.webp", "brownie_11.webp", "cookie_03.webp", "brownie_06.webp", "tea_time_cake_09.webp"]
    },
    {
        slug: "christmas",
        emoji: "🎄",
        name: "Christmas Bakes",
        title: "Christmas Bakes — The BakeHouse",
        tagline: "Plum cakes, festive sheet cakes and warm spiced bakes for the season.",
        description: "Christmas plum cakes, sheet cakes, and gingerbread cookies. Pickup-only festive bakes from The BakeHouse.",
        heroImage: "/images/menu/tea_time_cake_13.webp",
        ogImage: "/images/menu/tea_time_cake_13.webp",
        accent: "Limited season · Mid-Dec onwards",
        offerings: [
            {
                name: "Classic Plum Cake",
                price: "₹450",
                description: "Rich, fruit-soaked plum cake with rum-cured raisins and warm spices. The Christmas classic.",
                image: "/images/menu/tea_time_cake_13.webp"
            },
            {
                name: "Christmas Sheet Cake",
                price: "₹1,400",
                description: "Festive double-chocolate sheet, decorated with seasonal toppers. Serves 20–25.",
                image: "/images/menu/sheet_cake_03.webp"
            },
            {
                name: "Gingerbread Cookie Tin",
                price: "₹500",
                description: "12 spiced gingerbread cookies, hand-decorated. Comes wrapped in a tin, ready to gift.",
                image: "/images/menu/cookie_05.webp"
            }
        ],
        gallery: ["tea_time_cake_13.webp", "sheet_cake_03.webp", "cookie_05.webp", "cookie_09.webp", "tea_time_cake_09.webp", "custom_cake_04.webp"]
    },
    {
        slug: "birthdays",
        emoji: "🎂",
        name: "Birthday Cakes",
        title: "Custom Birthday Cakes — The BakeHouse",
        tagline: "Custom designs, themed cakes, photo prints, fondant figurines.",
        description: "Custom birthday cakes from The BakeHouse — fresh cream, buttercream, fondant, photo-print toppers. 48-hour notice.",
        heroImage: "/images/menu/custom_cake_04.webp",
        ogImage: "/images/menu/custom_cake_04.webp",
        accent: "48-hour pre-order · Custom designs",
        offerings: [
            {
                name: "Fresh Cream Custom",
                price: "₹400 / ₹750",
                description: "Half-kg or full-kg fresh cream cake, your flavor + theme. Light, airy, kid-favorite.",
                image: "/images/menu/sheet_cake_01.webp"
            },
            {
                name: "Fondant Showcase",
                price: "₹800 / ₹1,500",
                description: "Sculpted fondant figures, themed decor (cartoons, sports, character cakes). For the show-stopper moment.",
                image: "/images/menu/custom_cake_04.webp"
            },
            {
                name: "Cupcake Tower",
                price: "₹70 each (min 12)",
                description: "Mixed-flavor cupcake tower in your color palette. Easier serving, no slicing — great for parties.",
                image: "/images/menu/cupcake_05.webp"
            }
        ],
        gallery: ["custom_cake_04.webp", "sheet_cake_01.webp", "cupcake_05.webp", "cupcake_07.webp", "cupcake_02.webp", "sheet_cake_03.webp"]
    },
    {
        slug: "valentines",
        emoji: "💝",
        name: "Valentine's Boxes",
        title: "Valentine's Boxes — The BakeHouse",
        tagline: "Heart cupcakes, red velvet brownies, and cake-for-two date night boxes.",
        description: "Valentine's Day cake boxes from The BakeHouse — heart cupcakes, red velvet brownies, mini date-night cakes.",
        heroImage: "/images/menu/cupcake_07.webp",
        ogImage: "/images/menu/cupcake_07.webp",
        accent: "Feb 14 · Pre-order by Feb 12",
        offerings: [
            {
                name: "Sweetheart Box",
                price: "₹350",
                description: "4 strawberry cupcakes + 4 red velvet brownies in a heart-print box. Perfect surprise gift.",
                image: "/images/menu/cupcake_07.webp"
            },
            {
                name: "Date Night Mini Cake",
                price: "₹500",
                description: "Mini half-pound red velvet or chocolate-strawberry cake decorated for two. Includes candle + message card.",
                image: "/images/menu/brownie_14.webp"
            },
            {
                name: "Cookie Bouquet",
                price: "₹450",
                description: "8 hand-decorated heart cookies on sticks, wrapped as a bouquet. A no-flowers alternative.",
                image: "/images/menu/cookie_03.webp"
            }
        ],
        gallery: ["cupcake_07.webp", "brownie_14.webp", "cookie_03.webp", "cupcake_05.webp", "cookie_09.webp", "brownie_06.webp"]
    }
];

const renderOffering = (festSlug, festName, o) => {
    const inquiryMsg = `Hi! I'd like to inquire about the *${o.name}* (${o.price}) from your ${festName} collection. Could you confirm availability and pickup details?`;
    return `
        <article class="bg-white border border-[#4a3b32]/10 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div class="aspect-[4/3] bg-cover bg-center" style="background-image: url('${o.image}');"></div>
            <div class="p-5 flex-1 flex flex-col gap-2">
                <div class="flex items-start justify-between gap-3">
                    <h3 class="font-serif text-xl font-bold text-[#4a3b32]">${o.name}</h3>
                    <span class="font-serif text-sm font-semibold text-[#d65a66] whitespace-nowrap pt-1">${o.price}</span>
                </div>
                <p class="text-sm text-[#4a3b32]/75 leading-relaxed flex-1">${o.description}</p>
                <a href="${waText(inquiryMsg)}" target="_blank" rel="noopener" class="mt-2 inline-flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.47 3.46 1.38 4.95L2 22l5.24-1.37c1.45.79 3.09 1.2 4.79 1.2 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm3.32 12.43c-.15.08-.88.44-1.02.5-.14.07-.29.09-.44.07-.15-.02-.57-.21-1.09-.67-.52-.46-1.03-1.12-1.38-1.59-.35-.47-.03-.72.24-.98.24-.24.53-.61.71-.85.18-.24.23-.41.11-.64-.12-.23-.44-1.07-.61-1.46-.17-.39-.34-.33-.48-.32-.14.01-.3.01-.46.01-.16 0-.41.06-.63.31-.22.25-.84.81-.84 1.99s.86 2.31.98 2.47c.12.16 1.72 2.64 4.13 3.63.59.24 1.05.39 1.41.48.59.14 1.13.1 1.54.07.45-.03.88-.38 1-.74.12-.35.12-.66.08-.74-.03-.08-.14-.13-.29-.21z"/></svg>
                    Inquire on WhatsApp
                </a>
            </div>
        </article>`;
};

const renderPage = (f) => {
    const offeringsHtml = f.offerings.map(o => renderOffering(f.slug, f.name, o)).join("\n");
    const galleryHtml = f.gallery.map(img => `<a href="https://www.instagram.com/bakehouse.52" target="_blank" rel="noopener" class="aspect-square overflow-hidden rounded-lg group"><img src="/images/menu/${img}" alt="The BakeHouse ${f.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></a>`).join("\n");
    const fullInquiryMsg = `Hi! I'd like to ask about your ${f.name} collection. Could you share what's available and pickup options?`;
    const productsLd = f.offerings.map(o => ({
        "@type": "Product",
        "name": o.name,
        "description": o.description,
        "image": `https://thebakehouse.in${o.image}`,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": (o.price.match(/[\d,]+/) || ["0"])[0].replace(/,/g, ""),
            "availability": "https://schema.org/PreOrder"
        }
    }));

    return `<!DOCTYPE html>
<html lang="en-IN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${f.title}</title>
    <meta name="description" content="${f.description}" />
    <meta name="theme-color" content="#4a3b32" />
    <link rel="canonical" href="https://thebakehouse.in/festivals/${f.slug}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${f.title}" />
    <meta property="og:description" content="${f.description}" />
    <meta property="og:image" content="https://thebakehouse.in${f.ogImage}" />
    <meta property="og:url" content="https://thebakehouse.in/festivals/${f.slug}" />
    <meta property="og:site_name" content="The BakeHouse" />
    <meta property="og:locale" content="en_IN" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${f.title}" />
    <meta name="twitter:description" content="${f.description}" />
    <meta name="twitter:image" content="https://thebakehouse.in${f.ogImage}" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/styles.css" />
    <link rel="preload" as="image" href="${f.heroImage}" />

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": ${JSON.stringify(f.name)},
      "description": ${JSON.stringify(f.description)},
      "url": "https://thebakehouse.in/festivals/${f.slug}",
      "itemListElement": ${JSON.stringify(productsLd.map((p, i) => ({ "@type": "ListItem", "position": i + 1, "item": p })))}
    }
    </script>
</head>
<body>
    <div class="texture-overlay"></div>

    <header class="fixed top-0 left-0 right-0 z-50 bg-[#4a3b32] text-[#f9f3e5] px-4 py-3 shadow-md flex justify-between items-center">
        <a href="/" class="font-serif font-bold text-xl tracking-wider hover:opacity-90">The BakeHouse</a>
        <nav class="flex items-center gap-2 text-sm font-bold">
            <a href="/" class="px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors">Menu</a>
            <a href="/festivals" class="px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors hidden sm:inline">Festivals</a>
            <a href="${WA}" target="_blank" rel="noopener" class="px-4 py-1.5 rounded-full bg-green-600 hover:bg-green-700 transition-colors">Chat</a>
        </nav>
    </header>

    <section class="hero-photo relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 overflow-hidden" style="background-image: url('${f.heroImage}');">
        <div class="relative z-10 max-w-3xl mx-auto text-center text-[#f9f3e5] space-y-4">
            <a href="/festivals" class="inline-flex items-center gap-1 text-xs font-bold tracking-wider uppercase text-[#f9f3e5]/85 hover:text-[#ebaeb3] transition-colors">
                ← All Festivals
            </a>
            <div class="inline-flex items-center gap-2 bg-[#f9f3e5]/15 backdrop-blur-sm border border-[#f9f3e5]/25 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase">
                ${f.accent}
            </div>
            <h1 class="text-4xl sm:text-5xl font-serif font-bold leading-tight">${f.emoji} ${f.name}</h1>
            <p class="text-base sm:text-lg max-w-xl mx-auto text-[#f9f3e5]/90 leading-relaxed">${f.tagline}</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a href="#offerings" class="inline-flex items-center justify-center gap-2 bg-[#ebaeb3] text-[#4a3b32] px-6 py-3 rounded-full font-bold hover:bg-white transition-colors shadow-lg">View boxes</a>
                <a href="${waText(fullInquiryMsg)}" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg">Inquire on WhatsApp</a>
            </div>
        </div>
    </section>

    <main id="offerings" class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-24">
        <div class="text-center mb-10">
            <h2 class="font-serif text-3xl font-bold text-[#4a3b32]">What's in the collection</h2>
            <p class="text-sm text-[#4a3b32]/70 mt-2 max-w-md mx-auto">Pickup only · Final price confirmed on WhatsApp · Custom variations welcome.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${offeringsHtml}
        </div>
    </main>

    <section class="bg-[#4a3b32]/5 py-14 px-4">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-8">
                <div class="text-[10px] tracking-[0.18em] uppercase text-[#d65a66] font-bold">From the kitchen</div>
                <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#4a3b32] mt-1">Latest from @bakehouse.52</h2>
                <p class="text-sm text-[#4a3b32]/70 mt-2 max-w-md mx-auto">Tap any photo to follow us on Instagram for behind-the-scenes and weekly drops.</p>
            </div>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                ${galleryHtml}
            </div>
            <div class="text-center mt-7">
                <a href="https://www.instagram.com/bakehouse.52" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-[#4a3b32] text-[#f9f3e5] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#d65a66] transition-colors">
                    Follow @bakehouse.52
                </a>
            </div>
        </div>
    </section>

    <section class="max-w-3xl mx-auto px-4 py-12">
        <h2 class="font-serif text-2xl font-bold text-[#4a3b32] text-center mb-6">How to order</h2>
        <ol class="grid sm:grid-cols-3 gap-4 text-center">
            <li class="bg-white border border-[#4a3b32]/10 rounded-xl p-5">
                <div class="w-10 h-10 mx-auto bg-[#ebaeb3] rounded-full flex items-center justify-center font-serif text-xl font-bold text-[#4a3b32]">1</div>
                <p class="text-sm text-[#4a3b32] mt-3 font-bold">Pick a box</p>
                <p class="text-xs text-[#4a3b32]/65 mt-1">Tap "Inquire on WhatsApp" on any item above.</p>
            </li>
            <li class="bg-white border border-[#4a3b32]/10 rounded-xl p-5">
                <div class="w-10 h-10 mx-auto bg-[#ebaeb3] rounded-full flex items-center justify-center font-serif text-xl font-bold text-[#4a3b32]">2</div>
                <p class="text-sm text-[#4a3b32] mt-3 font-bold">Confirm details</p>
                <p class="text-xs text-[#4a3b32]/65 mt-1">We confirm availability, custom tweaks, and pickup time.</p>
            </li>
            <li class="bg-white border border-[#4a3b32]/10 rounded-xl p-5">
                <div class="w-10 h-10 mx-auto bg-[#ebaeb3] rounded-full flex items-center justify-center font-serif text-xl font-bold text-[#4a3b32]">3</div>
                <p class="text-sm text-[#4a3b32] mt-3 font-bold">Pick up fresh</p>
                <p class="text-xs text-[#4a3b32]/65 mt-1">Collect from the bakery on your scheduled date.</p>
            </li>
        </ol>
    </section>

    <footer class="py-10 bg-[#4a3b32] text-[#f9f3e5] text-center px-4">
        <div class="max-w-md mx-auto space-y-3">
            <h3 class="font-serif text-xl">The BakeHouse</h3>
            <p class="text-sm opacity-70">+91 9849450882 · support@thebakehouse.in</p>
            <p class="text-xs opacity-50">Open Daily: 9:00 AM – 9:00 PM · Pickup only</p>
            <div class="flex justify-center gap-4 pt-2 text-xs opacity-70">
                <a href="/" class="hover:text-[#ebaeb3]">Menu</a>
                <span>·</span>
                <a href="/festivals" class="hover:text-[#ebaeb3]">All Festivals</a>
                <span>·</span>
                <a href="https://www.instagram.com/bakehouse.52" target="_blank" rel="noopener" class="hover:text-[#ebaeb3]">Instagram</a>
            </div>
        </div>
    </footer>
</body>
</html>
`;
};

const outDir = path.join(__dirname, "..", "public", "festivals");
fs.mkdirSync(outDir, { recursive: true });
for (const f of FESTIVALS) {
    const html = renderPage(f);
    const file = path.join(outDir, `${f.slug}.html`);
    fs.writeFileSync(file, html, "utf8");
    console.log(`wrote ${path.relative(path.join(__dirname, ".."), file)}`);
}
