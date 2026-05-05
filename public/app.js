const BUSINESS_INFO = {
    name: "The BakeHouse",
    phone: "+91 9849450882",
    email: "support@thebakehouse.in",
    instagram: "https://www.instagram.com/bakehouse.52?igsh=ZnZsdDIzbWx4cnB4"
};
const MENU_DATA = [
    { category: "Custom Cakes", items: [
        { name: "Fresh Cream Cake", image: "/images/menu/sheet_cake_01.webp", price: "₹400 (1/2 kg) / ₹750 (1 kg)", description: "Light and airy fresh cream custom cakes." },
        { name: "Buttercream Cake", image: "/images/menu/sheet_cake_01.webp", price: "₹400 (1/2 kg) / ₹750 (1 kg)", description: "Rich and smooth buttercream frosting." },
        { name: "Fondant Cake", image: "/images/menu/custom_cake_04.webp", price: "₹800 (1/2 kg) / ₹1500 (1 kg)", description: "Elegant fondant designs for special occasions." },
        { name: "Custom Design Note", price: "Starts at ₹1,500/kg", description: "Final pricing based on intricate designs and detailing." }
    ]},
    { category: "Cupcakes & Muffins", items: [
        { name: "Vanilla Dream Cupcake", image: "/images/menu/cupcake_16.webp", price: "₹70", description: "Classic vanilla topped with vanilla frosting." },
        { name: "Strawberry Cloud Cupcake", image: "/images/menu/cupcake_07.webp", price: "₹70", description: "Vanilla with strawberry frosting." },
        { name: "Chocolate Therapy Cupcake", image: "/images/menu/cupcake_02.webp", price: "₹90", description: "Chocolate topped with chocolate buttercream." },
        { name: "Red Velvet Cupcake", image: "/images/menu/cupcake_05.webp", price: "₹90", description: "Red velvet topped with cream cheese frosting." },
        { name: "Vanilla Muffin", image: "/images/menu/muffin_06.webp", price: "₹50", description: "Classic soft baked muffin." },
        { name: "Blueberry Muffin", image: "/images/menu/muffin_01.webp", price: "₹70", description: "Bursting with fresh blueberries." },
        { name: "Choco Chip Muffin", image: "/images/menu/muffin_08.webp", price: "₹60", description: "Loaded with chocolate chips." }
    ]},
    { category: "Cookies", items: [
        { name: "Chocolate Rock Cookie", image: "/images/menu/cookie_07.webp", price: "₹80", description: "Chunky cocoa cookie loaded with chocolate." },
        { name: "Dark Chocolate Chip", image: "/images/menu/cookie_09.webp", price: "₹80", description: "Decadent cookie packed with premium dark chocolate." },
        { name: "Red Velvet Cookie", image: "/images/menu/red_velvet_cookie.webp", price: "₹80", description: "Soft red velvet cookie with a hint of cocoa." },
        { name: "Nutella Chocolate Chip", image: "/images/menu/cookie_03.webp", price: "₹80", description: "Classic chip cookie filled with Nutella surprise." },
        { name: "Biscoff Cookie", image: "/images/menu/cookie_12.webp", price: "₹80", description: "Buttery cookie infused with caramelized Biscoff." }
    ]},
    { category: "Brownies", items: [
        { name: "Dark Chocolate Brownie", image: "/images/menu/brownie_01.webp", price: "₹80", description: "Fudgy classic brownie made with rich dark cocoa." },
        { name: "White Chocolate Brownie", image: "/images/menu/brownie_11.webp", price: "₹80", description: "Buttery blondie swirled with white chocolate." },
        { name: "Red Velvet Brownie", image: "/images/menu/brownie_14.webp", price: "₹80", description: "Moist red velvet brownie with a velvety finish." },
        { name: "Oreo Brownie", image: "/images/menu/brownie_06.webp", price: "₹80", description: "Decadent chocolate brownie topped with crunchy Oreo." },
        { name: "Nutella Brownie", image: "/images/menu/brownie_03.webp", price: "₹80", description: "Decadent blondie swirled with creamy Nutella." }
    ]},
    { category: "Donuts", items: [
        { name: "Classic Glazed Donut", image: "/images/menu/donut_10.webp", price: "₹80", description: "Classic honey-glazed ring doughnut." }
    ]},
    { category: "Tea Time Cakes", items: [
        { name: "Ribbon Cake", price: "₹300", description: "Beautifully layered colorful sponge." },
        { name: "Marble Cake", image: "/images/menu/tea_time_cake_09.webp", price: "₹350", description: "Swirls of vanilla and chocolate." },
        { name: "Carrot Cake", price: "₹350", description: "Moist cake with fresh carrots and spices." },
        { name: "Walnut Banana Cake", image: "/images/menu/tea_time_cake_13.webp", price: "₹450", description: "Classic combination of sweet banana and crunchy walnut." },
        { name: "Lemon & Coconut Lamington", image: "/images/menu/tea_time_cake_05.webp", price: "₹400", description: "Light lemon sponge coated in coconut." },
        { name: "Chocolate & Coconut Lamington", image: "/images/menu/tea_time_cake_01.webp", price: "₹400", description: "Rich chocolate-coated sponge rolled in coconut." }
    ]},
    { category: "Sheet Cakes", items: [
        { name: "Classic Vanilla Sheet", image: "/images/menu/sheet_cake_01.webp", price: "₹1200", description: "Large rectangular cake, serves 20-25. Perfect for parties." },
        { name: "Double Chocolate Sheet", image: "/images/menu/sheet_cake_03.webp", price: "₹1400", description: "Rich chocolate sheet cake with ganache topping." },
        { name: "Fruit Fiesta Sheet", price: "₹1500", description: "Vanilla sponge topped with fresh seasonal fruits." }
    ]}
];

const icons = {
    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.05 12.05 0 0 0 .57 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.05 12.05 0 0 0 2.81.57A2 2 0 0 1 22 16.92z"/></svg>`,
    instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.47 3.46 1.38 4.95L2 22l5.24-1.37c1.45.79 3.09 1.2 4.79 1.2 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm3.32 12.43c-.15.08-.88.44-1.02.5-.14.07-.29.09-.44.07-.15-.02-.57-.21-1.09-.67-.52-.46-1.03-1.12-1.38-1.59-.35-.47-.03-.72.24-.98.24-.24.53-.61.71-.85.18-.24.23-.41.11-.64-.12-.23-.44-1.07-.61-1.46-.17-.39-.34-.33-.48-.32-.14.01-.3.01-.46.01-.16 0-.41.06-.63.31-.22.25-.84.81-.84 1.99s.86 2.31.98 2.47c.12.16 1.72 2.64 4.13 3.63.59.24 1.05.39 1.41.48.59.14 1.13.1 1.54.07.45-.03.88-.38 1-.74.12-.35.12-.66.08-.74-.03-.08-.14-.13-.29-.21z"/></svg>`,
    cart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    minus: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
};

const PHONE_NUMBER_CLEAN = BUSINESS_INFO.phone.replace(/[^0-9]/g, "");
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER_CLEAN}`;
const CALL_LINK = `tel:${BUSINESS_INFO.phone.replace(/\s+/g, "")}`;
const waLinkFor = (item) => {
    const priceSuffix = item && item.price ? ` (${item.price})` : "";
    const msg = item
        ? `Hi! I'd like to order: *${item.name}*${priceSuffix}. Could you confirm availability and pickup/delivery options?`
        : `Hi! I have a question about The BakeHouse menu.`;
    return `${WHATSAPP_LINK}?text=${encodeURIComponent(msg)}`;
};
const GENERAL_WA_LINK = waLinkFor(null);

const CART_STORAGE_KEY = "bakehouse_cart_v1";

const parsePriceVariants = (priceStr) => {
    if (!priceStr) return [];
    if (!/^\s*₹/.test(priceStr)) return [];
    const variants = [];
    const re = /₹\s*([\d,]+)(?:\s*\(([^)]+)\))?/g;
    let match;
    while ((match = re.exec(priceStr)) !== null) {
        const amount = parseInt(match[1].replace(/,/g, ""), 10);
        if (!Number.isNaN(amount)) variants.push({ amount, label: match[2] || null });
    }
    return variants;
};

const cartKeyFor = (name, label) => label ? `${name}::${label}` : name;
const formatINR = (n) => `₹${n.toLocaleString("en-IN")}`;

let cart = [];
try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) cart = parsed.filter(line =>
            line && typeof line.name === "string" &&
            Number.isFinite(line.unitPrice) &&
            Number.isInteger(line.quantity) && line.quantity > 0
        );
    }
} catch (err) { cart = []; }

const persistCart = () => {
    try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch (err) {}
};

const cartTotalQty = () => cart.reduce((sum, line) => sum + line.quantity, 0);
const cartSubtotal = () => cart.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);

const addToCart = (item, variant) => {
    const key = cartKeyFor(item.name, variant.label);
    const existing = cart.find(line => line.key === key);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            key,
            name: item.name,
            variantLabel: variant.label,
            unitPrice: variant.amount,
            quantity: 1
        });
    }
    persistCart();
    updateCartIndicators();
    renderCartContents();
};

const updateCartLineQty = (key, delta) => {
    const line = cart.find(l => l.key === key);
    if (!line) return;
    line.quantity += delta;
    if (line.quantity <= 0) cart = cart.filter(l => l.key !== key);
    persistCart();
    updateCartIndicators();
    renderCartContents();
};

const removeCartLine = (key) => {
    cart = cart.filter(l => l.key !== key);
    persistCart();
    updateCartIndicators();
    renderCartContents();
};

const clearCart = () => {
    cart = [];
    persistCart();
    updateCartIndicators();
    renderCartContents();
};

const buildCartWhatsAppLink = () => {
    if (!cart.length) return GENERAL_WA_LINK;
    const lines = cart.map(line => {
        const variant = line.variantLabel ? ` — ${line.variantLabel}` : "";
        const lineTotal = line.unitPrice * line.quantity;
        return `• ${line.quantity}× ${line.name}${variant} — ${formatINR(line.unitPrice)} ea (${formatINR(lineTotal)})`;
    });
    const subtotal = cartSubtotal();
    const message = [
        "Hi! I'd like to place an order from The BakeHouse:",
        "",
        ...lines,
        "",
        `Subtotal: ${formatINR(subtotal)}`,
        "",
        "Could you confirm availability and pickup/delivery? Thank you!"
    ].join("\n");
    return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
};

const updateCartIndicators = () => {
    const count = cartTotalQty();
    document.querySelectorAll("[data-cart-count]").forEach(el => {
        el.textContent = count;
        el.classList.toggle("hidden", count === 0);
    });
};

const renderCartContents = () => {
    const container = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("cartSubtotal");
    const checkoutBtn = document.getElementById("cartCheckoutBtn");
    const clearBtn = document.getElementById("cartClearBtn");
    if (!container) return;
    if (!cart.length) {
        container.innerHTML = `<p class="text-center text-[#4a3b32]/60 py-8 italic">Your cart is empty.<br/>Browse the menu and tap "Add to Cart" on anything you'd like.</p>`;
        if (subtotalEl) subtotalEl.textContent = formatINR(0);
        if (checkoutBtn) {
            checkoutBtn.classList.add("opacity-50", "pointer-events-none");
            checkoutBtn.setAttribute("aria-disabled", "true");
        }
        if (clearBtn) clearBtn.classList.add("hidden");
        return;
    }
    container.innerHTML = cart.map(line => {
        const variant = line.variantLabel ? `<span class="text-xs text-[#4a3b32]/60"> · ${line.variantLabel}</span>` : "";
        const lineTotal = line.unitPrice * line.quantity;
        return `
            <div class="flex items-start justify-between gap-3 py-3 border-b border-[#4a3b32]/10 last:border-b-0">
                <div class="flex-1 min-w-0">
                    <div class="font-bold text-[#4a3b32] leading-tight">${line.name}${variant}</div>
                    <div class="text-xs text-[#4a3b32]/70 mt-1">${formatINR(line.unitPrice)} each · ${formatINR(lineTotal)}</div>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="cart-qty-btn w-7 h-7 rounded-full bg-[#f9f3e5] border border-[#4a3b32]/20 flex items-center justify-center hover:bg-[#ebaeb3] transition-colors" data-cart-key="${line.key}" data-delta="-1" aria-label="Decrease quantity">${icons.minus}</button>
                        <span class="font-bold text-[#4a3b32] min-w-[1.5rem] text-center">${line.quantity}</span>
                        <button class="cart-qty-btn w-7 h-7 rounded-full bg-[#f9f3e5] border border-[#4a3b32]/20 flex items-center justify-center hover:bg-[#ebaeb3] transition-colors" data-cart-key="${line.key}" data-delta="1" aria-label="Increase quantity">${icons.plus}</button>
                    </div>
                </div>
                <button class="cart-remove-btn text-[#4a3b32]/50 hover:text-[#d65a66] p-1.5 transition-colors" data-cart-key="${line.key}" aria-label="Remove ${line.name}">${icons.trash}</button>
            </div>
        `;
    }).join("");
    if (subtotalEl) subtotalEl.textContent = formatINR(cartSubtotal());
    if (checkoutBtn) {
        checkoutBtn.classList.remove("opacity-50", "pointer-events-none");
        checkoutBtn.removeAttribute("aria-disabled");
        checkoutBtn.href = buildCartWhatsAppLink();
    }
    if (clearBtn) clearBtn.classList.remove("hidden");
};

window.showCart = () => {
    const modal = document.getElementById("cartModal");
    if (!modal) return;
    renderCartContents();
    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
        modal.classList.remove("opacity-0");
        modal.querySelector(".cart-panel").classList.remove("translate-x-full");
    });
    document.body.style.overflow = "hidden";
};

window.hideCart = () => {
    const modal = document.getElementById("cartModal");
    if (!modal) return;
    modal.querySelector(".cart-panel").classList.add("translate-x-full");
    modal.classList.add("opacity-0");
    setTimeout(() => {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
    }, 300);
};

(function() {
    const app = document.getElementById("app");
    let activeCategory = MENU_DATA[0].category;

    window.showCallOptions = () => {
        const modal = document.getElementById("callModal");
        modal.classList.remove("hidden");
        setTimeout(() => {
            modal.classList.remove("opacity-0");
            modal.querySelector(".modal-content").classList.remove("scale-95");
        }, 10);
    };

    window.hideCallOptions = () => {
        const modal = document.getElementById("callModal");
        modal.querySelector(".modal-content").classList.add("scale-95");
        modal.classList.add("opacity-0");
        setTimeout(() => modal.classList.add("hidden"), 300);
    };

    window.openLightbox = (src, alt) => {
        const lb = document.getElementById("lightbox");
        const img = document.getElementById("lightboxImg");
        const cap = document.getElementById("lightboxCaption");
        img.src = src;
        img.alt = alt || "";
        cap.textContent = alt || "";
        lb.classList.remove("hidden");
        lb.classList.add("flex");
        requestAnimationFrame(() => lb.classList.remove("opacity-0"));
        document.body.style.overflow = "hidden";
    };

    window.closeLightbox = () => {
        const lb = document.getElementById("lightbox");
        lb.classList.add("opacity-0");
        setTimeout(() => {
            lb.classList.add("hidden");
            lb.classList.remove("flex");
            const img = document.getElementById("lightboxImg");
            if (img) img.src = "";
            document.body.style.overflow = "";
        }, 300);
    };

    const renderNavButtons = (currentCategory) => MENU_DATA.map(section => `
        <button data-category="${section.category}" class="nav-btn whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all border-2 ${currentCategory === section.category ? "active" : "inactive"}">
            ${section.category}
        </button>
    `).join("");

    const updateNavButtons = (currentCategory) => {
        document.querySelectorAll(".nav-btn").forEach(button => {
            const category = button.getAttribute("data-category");
            button.classList.toggle("active", category === currentCategory);
            button.classList.toggle("inactive", category !== currentCategory);
        });
    };

    const scrollToCategory = (category) => {
        activeCategory = category;
        updateNavButtons(category);
        const element = document.getElementById(category);
        if (element) {
            const offset = 180;
            const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    const renderApp = () => {
        app.innerHTML = `
            <div class="fixed top-0 left-0 right-0 z-50 bg-[#4a3b32] text-[#f9f3e5] px-4 py-3 shadow-md flex justify-between items-center transition-all duration-300">
                <div class="flex items-center gap-2">
                    <div class="font-serif font-bold text-xl tracking-wider">${BUSINESS_INFO.name}</div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="showCart()" class="relative flex items-center gap-2 bg-[#f9f3e5] text-[#4a3b32] px-3 py-1.5 rounded-full font-bold text-sm hover:bg-[#ebaeb3] transition-colors" aria-label="Open cart">
                        ${icons.cart}
                        <span class="hidden sm:inline">Cart</span>
                        <span data-cart-count class="absolute -top-1 -right-1 bg-[#d65a66] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center hidden">0</span>
                    </button>
                    <button onclick="showCallOptions()" class="flex items-center gap-2 bg-[#ebaeb3] text-[#4a3b32] px-4 py-1.5 rounded-full font-bold text-sm hover:bg-[#d65a66] hover:text-white transition-colors animate-pulse">
                        ${icons.phone}
                        <span class="hidden sm:inline">Call to Order</span>
                        <span class="sm:hidden">Call</span>
                    </button>
                </div>
            </div>
            <div id="navbar" class="fixed top-[52px] left-0 right-0 z-40 bg-[#f9f3e5]/95 backdrop-blur-sm border-b border-[#4a3b32]/10 transition-all duration-300 py-4">
                <div class="max-w-4xl mx-auto px-4 overflow-x-auto no-scrollbar flex gap-4 sm:justify-center" id="nav-container">
                    ${renderNavButtons(activeCategory)}
                </div>
            </div>
            <main class="pt-40 max-w-6xl mx-auto px-4 sm:px-6">
                <div class="text-center mb-12 space-y-4">
                    <div class="w-16 h-16 mx-auto bg-[#ebaeb3] rounded-full flex items-center justify-center text-3xl shadow-inner">🧁</div>
                    <h1 class="text-4xl sm:text-5xl font-serif font-bold text-[#4a3b32]">Menu</h1>
                    <p class="text-[#4a3b32]/70 italic max-w-md mx-auto">Handcrafted with love, sugar, and everything nice.<br/>Call us at <strong class="text-[#d65a66]">${BUSINESS_INFO.phone}</strong></p>
                    <div class="w-24 h-1 bg-[#4a3b32] mx-auto opacity-20 rounded-full"></div>
                </div>
                <div class="space-y-16">
                    ${MENU_DATA.map(section => `
                        <section id="${section.category}" class="scroll-mt-48">
                            <div class="flex items-center gap-4 mb-8">
                                <h2 class="text-2xl font-serif font-bold text-[#4a3b32] border-b-2 border-[#ebaeb3] pb-1 pr-4 inline-block">${section.category.toUpperCase()}</h2>
                                <div class="h-px bg-[#4a3b32]/10 flex-grow"></div>
                            </div>
                            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                ${section.items.map((item, itemIndex) => {
                                    const variants = parsePriceVariants(item.price);
                                    const itemId = `${section.category}__${itemIndex}`;
                                    let actionHtml;
                                    if (variants.length === 0) {
                                        actionHtml = `<a href="${waLinkFor(item)}" target="_blank" rel="noopener noreferrer" class="mt-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-green-700 transition-colors shadow-sm" aria-label="Inquire about ${item.name} on WhatsApp">${icons.whatsapp}<span>Inquire on WhatsApp</span></a>`;
                                    } else if (variants.length === 1) {
                                        actionHtml = `<button type="button" class="add-to-cart-btn mt-1 flex items-center justify-center gap-2 bg-[#d65a66] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#b8434f] transition-colors shadow-sm" data-item-id="${itemId}" data-variant-index="0" aria-label="Add ${item.name} to cart">${icons.plus}<span>Add to Cart</span></button>`;
                                    } else {
                                        const variantBtns = variants.map((v, vi) => `<button type="button" class="add-to-cart-btn flex-1 flex items-center justify-center gap-1 bg-[#d65a66] text-white px-2 py-2 rounded-lg font-bold text-xs hover:bg-[#b8434f] transition-colors shadow-sm" data-item-id="${itemId}" data-variant-index="${vi}" aria-label="Add ${item.name} (${v.label || formatINR(v.amount)}) to cart"><span>+ ${v.label || formatINR(v.amount)}</span></button>`).join("");
                                        actionHtml = `<div class="mt-1 flex gap-2">${variantBtns}</div>`;
                                    }
                                    return `
                                    <div class="group relative bg-white/50 border border-[#4a3b32]/5 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:bg-white/70 flex flex-col" data-item-card="${itemId}">
                                        ${item.image ? `
                                            <button type="button" class="block w-full aspect-square overflow-hidden bg-[#f1c6cf]/30 lightbox-trigger" data-image="${item.image}" data-alt="${item.name}" aria-label="View larger photo of ${item.name}">
                                                <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            </button>
                                        ` : `
                                            <div class="w-full aspect-square bg-gradient-to-br from-[#f8e2e7] via-[#f9f3e5] to-[#f1c6cf] flex flex-col items-center justify-center gap-2 text-center px-4">
                                                <span class="font-serif text-2xl text-[#4a3b32]">Sweet Treat</span>
                                                <span class="text-[10px] uppercase tracking-widest text-[#4a3b32]/60 font-semibold">Photo coming soon</span>
                                            </div>
                                        `}
                                        <div class="p-5 flex-1 flex flex-col gap-3">
                                            <div class="flex items-start justify-between gap-3">
                                                <h3 class="text-lg font-bold text-[#4a3b32] group-hover:text-[#d65a66] transition-colors leading-tight">${item.name}</h3>
                                                <span class="font-serif text-sm font-semibold text-[#d65a66] whitespace-nowrap shrink-0 pt-1">${item.price || ""}</span>
                                            </div>
                                            <p class="text-sm text-[#4a3b32]/75 leading-relaxed flex-1">${item.description}</p>
                                            ${actionHtml}
                                        </div>
                                    </div>
                                `;}).join("")}
                            </div>
                        </section>
                    `).join("")}
                </div>
            </main>
            <footer class="mt-24 py-12 bg-[#4a3b32] text-[#f9f3e5] text-center px-4 relative">
                <div class="max-w-md mx-auto space-y-6">
                    <h3 class="font-serif text-2xl">${BUSINESS_INFO.name}</h3>
                    <div class="flex justify-center gap-6">
                        <a href="${BUSINESS_INFO.instagram}" target="_blank" rel="noreferrer" class="hover:text-[#ebaeb3] transition-colors">${icons.instagram}</a>
                        <a href="#" class="hover:text-[#ebaeb3] transition-colors">${icons.facebook}</a>
                        <a href="mailto:${BUSINESS_INFO.email}" class="hover:text-[#ebaeb3] transition-colors">${icons.mail}</a>
                    </div>
                    <div class="text-sm opacity-60 font-sans">
                        <p>Open Daily: 9:00 AM - 9:00 PM</p>
                        <p>© ${new Date().getFullYear()} ${BUSINESS_INFO.name}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
            <button id="backToTop" class="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 bg-[#4a3b32] text-[#f9f3e5] p-3 rounded-full shadow-lg hover:bg-[#d65a66] transition-all z-40 opacity-0 translate-y-10" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" aria-label="Back to top">
                ${icons.arrowUp}
            </button>
            <div id="mobileCtaBar" class="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#4a3b32] text-[#f9f3e5] shadow-[0_-4px_16px_rgba(0,0,0,0.18)]" style="padding-bottom: env(safe-area-inset-bottom);">
                <div class="grid grid-cols-3">
                    <a href="${CALL_LINK}" class="flex items-center justify-center gap-2 py-3.5 font-bold text-sm tracking-wide hover:bg-[#3a2d27] transition-colors" aria-label="Call The BakeHouse">
                        ${icons.phone}
                        <span>Call</span>
                    </a>
                    <button onclick="showCart()" class="relative flex items-center justify-center gap-2 py-3.5 font-bold text-sm tracking-wide bg-[#ebaeb3] text-[#4a3b32] hover:bg-[#d65a66] hover:text-white transition-colors" aria-label="Open cart">
                        ${icons.cart}
                        <span>Cart</span>
                        <span data-cart-count class="absolute top-1.5 right-1.5 bg-[#d65a66] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center hidden">0</span>
                    </button>
                    <a href="${GENERAL_WA_LINK}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 py-3.5 font-bold text-sm tracking-wide bg-green-600 text-white hover:bg-green-700 transition-colors" aria-label="Message The BakeHouse on WhatsApp">
                        ${icons.whatsapp}
                        <span>Chat</span>
                    </a>
                </div>
            </div>
            <div id="callModal" class="fixed inset-0 bg-black/50 z-[100] hidden transition-opacity duration-300 opacity-0 flex items-center justify-center p-4" aria-modal="true" role="dialog">
                <div class="modal-content bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center space-y-4 transform scale-95 transition-transform duration-300">
                    <h3 class="text-xl font-serif font-bold text-[#4a3b32]">How would you like to order?</h3>
                    <p class="text-sm text-[#4a3b32]/80">Contact us at ${BUSINESS_INFO.phone} for custom orders.</p>
                    <div class="space-y-3 pt-2">
                        <a href="${CALL_LINK}" target="_top" onclick="hideCallOptions()" class="w-full flex items-center justify-center gap-2 bg-[#d65a66] text-white py-3 rounded-lg font-bold hover:bg-[#c34d58] transition-colors shadow-md">${icons.phone} Call Directly</a>
                        <a href="${GENERAL_WA_LINK}" target="_blank" onclick="hideCallOptions()" class="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-md">${icons.whatsapp} Order via WhatsApp</a>
                        <button onclick="hideCallOptions()" class="w-full text-sm text-[#4a3b32]/60 py-2 hover:text-[#4a3b32] transition-colors">Cancel</button>
                    </div>
                </div>
            </div>
            <div id="cartModal" class="fixed inset-0 bg-black/50 z-[105] hidden transition-opacity duration-300 opacity-0" aria-modal="true" role="dialog" aria-label="Your cart">
                <div class="cart-panel absolute right-0 top-0 bottom-0 w-full sm:max-w-md bg-[#f9f3e5] shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300">
                    <div class="flex items-center justify-between px-5 py-4 border-b border-[#4a3b32]/15 bg-[#4a3b32] text-[#f9f3e5]">
                        <h3 class="font-serif text-xl font-bold flex items-center gap-2">${icons.cart} Your Cart</h3>
                        <button onclick="hideCart()" class="p-1.5 hover:bg-white/10 rounded-full transition-colors" aria-label="Close cart">${icons.close}</button>
                    </div>
                    <div id="cartItems" class="flex-1 overflow-y-auto px-5 py-2"></div>
                    <div class="border-t border-[#4a3b32]/15 px-5 py-4 space-y-3 bg-white/50">
                        <div class="flex items-center justify-between text-[#4a3b32]">
                            <span class="font-bold">Subtotal</span>
                            <span id="cartSubtotal" class="font-serif text-xl font-bold text-[#d65a66]">₹0</span>
                        </div>
                        <p class="text-[10px] text-[#4a3b32]/60 leading-relaxed">Final price confirmed by ${BUSINESS_INFO.name} on WhatsApp. Custom cake designs may carry additional cost.</p>
                        <a id="cartCheckoutBtn" href="${GENERAL_WA_LINK}" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md opacity-50 pointer-events-none" aria-disabled="true">${icons.whatsapp} Send Order on WhatsApp</a>
                        <button id="cartClearBtn" type="button" class="w-full text-xs text-[#4a3b32]/60 py-1 hover:text-[#d65a66] transition-colors hidden">Clear cart</button>
                    </div>
                </div>
            </div>
            <div id="lightbox" class="fixed inset-0 bg-black/90 z-[110] hidden opacity-0 transition-opacity duration-300 items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Photo viewer">
                <button type="button" id="lightboxClose" class="absolute top-4 right-4 text-white/85 hover:text-white w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 text-3xl leading-none z-10" aria-label="Close photo viewer">&times;</button>
                <img id="lightboxImg" src="" alt="" class="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
                <div id="lightboxCaption" class="absolute bottom-6 left-0 right-0 text-center text-white/90 font-serif text-lg px-4"></div>
            </div>
        `;
    };

    const initListeners = () => {
        const navContainer = document.getElementById("nav-container");
        if (navContainer) {
            navContainer.addEventListener("click", (event) => {
                const button = event.target.closest(".nav-btn");
                if (button) scrollToCategory(button.getAttribute("data-category"));
            });
        }
        const callModal = document.getElementById("callModal");
        if (callModal) {
            callModal.addEventListener("click", (event) => {
                if (event.target.id === "callModal") hideCallOptions();
            });
        }
        document.addEventListener("click", (event) => {
            const trigger = event.target.closest(".lightbox-trigger");
            if (trigger) {
                event.preventDefault();
                openLightbox(trigger.dataset.image, trigger.dataset.alt);
            }
            const addBtn = event.target.closest(".add-to-cart-btn");
            if (addBtn) {
                const itemId = addBtn.getAttribute("data-item-id");
                const variantIndex = parseInt(addBtn.getAttribute("data-variant-index"), 10);
                const [categoryName, idxStr] = itemId.split("__");
                const section = MENU_DATA.find(s => s.category === categoryName);
                const item = section ? section.items[parseInt(idxStr, 10)] : null;
                if (item) {
                    const variants = parsePriceVariants(item.price);
                    const variant = variants[variantIndex];
                    if (variant) {
                        addToCart(item, variant);
                        addBtn.classList.add("ring-2", "ring-[#4a3b32]");
                        setTimeout(() => addBtn.classList.remove("ring-2", "ring-[#4a3b32]"), 220);
                    }
                }
            }
        });
        const lightbox = document.getElementById("lightbox");
        if (lightbox) {
            lightbox.addEventListener("click", (event) => {
                if (event.target.closest("img")) return;
                closeLightbox();
            });
        }
        const cartModal = document.getElementById("cartModal");
        if (cartModal) {
            cartModal.addEventListener("click", (event) => {
                if (event.target.id === "cartModal") hideCart();
                const qtyBtn = event.target.closest(".cart-qty-btn");
                if (qtyBtn) {
                    updateCartLineQty(qtyBtn.getAttribute("data-cart-key"), parseInt(qtyBtn.getAttribute("data-delta"), 10));
                    return;
                }
                const removeBtn = event.target.closest(".cart-remove-btn");
                if (removeBtn) {
                    removeCartLine(removeBtn.getAttribute("data-cart-key"));
                    return;
                }
                if (event.target.id === "cartClearBtn") {
                    if (confirm("Remove all items from your cart?")) clearCart();
                }
            });
        }
        document.addEventListener("keydown", (event) => {
            if (event.key !== "Escape") return;
            if (!document.getElementById("lightbox").classList.contains("hidden")) closeLightbox();
            else if (!document.getElementById("cartModal").classList.contains("hidden")) hideCart();
            else if (!document.getElementById("callModal").classList.contains("hidden")) hideCallOptions();
        });
        const navbar = document.getElementById("navbar");
        const backToTop = document.getElementById("backToTop");
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                navbar.classList.add("shadow-sm", "py-2");
                navbar.classList.remove("py-4");
            } else {
                navbar.classList.remove("shadow-sm", "py-2");
                navbar.classList.add("py-4");
            }
            if (scrollY > 300) {
                backToTop.classList.remove("opacity-0", "translate-y-10");
                backToTop.classList.add("opacity-100", "translate-y-0");
            } else {
                backToTop.classList.add("opacity-0", "translate-y-10");
                backToTop.classList.remove("opacity-100", "translate-y-0");
            }
            let currentActive = activeCategory;
            let minDistance = Infinity;
            const offset = 190;
            MENU_DATA.forEach(section => {
                const element = document.getElementById(section.category);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const top = rect.top;
                    if (top < offset && top > -rect.height + 100) {
                        const distance = Math.abs(top - offset);
                        if (distance < minDistance) {
                            minDistance = distance;
                            currentActive = section.category;
                        }
                    }
                }
            });
            if (currentActive !== activeCategory) {
                activeCategory = currentActive;
                updateNavButtons(activeCategory);
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
    };

    window.addEventListener("load", () => {
        renderApp();
        initListeners();
        updateCartIndicators();
    });
})();
