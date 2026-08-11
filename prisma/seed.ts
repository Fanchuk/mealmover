/**
 * MealMover — seed
 *
 * Run:  npx prisma db push && npx tsx prisma/seed.ts
 * or via package.json:  "prisma": { "seed": "tsx prisma/seed.ts" } → npx prisma db seed
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

// Constants instead of enum imports
const MenuSection = { TODAYS_OFFER: "TODAYS_OFFER", MAIN_COURSE: "MAIN_COURSE", DRINKS_DESSERTS: "DRINKS_DESSERTS" } as const;
const ReviewAspect = { PRICE: "PRICE", TASTE: "TASTE", HYGIENE: "HYGIENE", PACKAGING: "PACKAGING" } as const;
const PromoType = { PERCENT: "PERCENT", FIXED: "FIXED" } as const;
const AddressLabel = { HOME: "HOME", OFFICE: "OFFICE", OTHER: "OTHER" } as const;
const OrderStatus = { DRAFT: "DRAFT", PENDING: "PENDING", CONFIRMED: "CONFIRMED", PREPARING: "PREPARING", ON_THE_WAY: "ON_THE_WAY", DELIVERED: "DELIVERED", CANCELLED: "CANCELLED" } as const;
const PaymentMethod = { CREDIT_CARD: "CREDIT_CARD", CASH: "CASH", PAYPAL: "PAYPAL" } as const;
const PaymentStatus = { PENDING: "PENDING", PAID: "PAID", FAILED: "FAILED", REFUNDED: "REFUNDED" } as const;
const Role = { USER: "USER", ADMIN: "ADMIN" } as const;

// ── helpers ──────────────────────────────────────────────────
const img = (seed: string, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
const avatar = (seed: string) => `https://i.pravatar.cc/300?u=${seed}`;
const money = (n: number) => Math.round(n * 100) / 100;
const daysAgo = (d: number) => new Date(Date.now() - d * 24 * 60 * 60 * 1000);

// ── 1. CITIES ─────────────────────────────────────────────────
const CITIES = [
  "Surabaya", "Sidoarjo", "Malang", "Jakarta", "Bali", "Bandung", "Jember",
  "Palembang", "Batam", "Medan", "Aceh", "Papua", "Manokwari",
  "Manado", "Lampung", "Semarang", "Makassar",
];

const DELIVERY_LOCATIONS = [
  { title: "Sunset Road",   street: "Sunset Road, 18 Bali",        city: "Bali",     lat: -8.6905, lng: 115.1729, isDefault: true,  order: 1 },
  { title: "Sentani Road",  street: "Sentani Road, 10 Malang",     city: "Malang",   lat: -7.9666, lng: 112.6326, isDefault: false, order: 2 },
  { title: "Garden Bay St", street: "Garden Bay St, 14 Sidoarjo",  city: "Sidoarjo", lat: -7.4478, lng: 112.7183, isDefault: false, order: 3 },
  { title: "Riverfront",    street: "Riverfront Street, 22 Surabaya", city: "Surabaya", lat: -7.2575, lng: 112.7521, isDefault: false, order: 4 },
  { title: "Merdeka St",    street: "Merdeka Street, 3 Jakarta",   city: "Jakarta",  lat: -6.1754, lng: 106.8272, isDefault: false, order: 5 },
];

// ── 2. CATEGORIES ───────────
const CATEGORIES = [
  { name: "Fast Food",  slug: "fast-food",  icon: "/Hamburger.svg",         order: 1 },
  { name: "Dessert",    slug: "dessert",    icon: "/Ice_cream.svg",         order: 2 },
  { name: "Drink",      slug: "drink",      icon: "/Sparkling_water.svg",   order: 3 },
  { name: "Vegetables", slug: "vegetables", icon: "/Burrito.svg",           order: 4 },
  { name: "Noodle",     slug: "noodle",     icon: "/Noodle.svg",            order: 5 },
  { name: "Rice",       slug: "rice",       icon: "/Burrito.svg",           order: 6 },
  { name: "Grill",      slug: "grill",      icon: "/takoyaki.svg",          order: 7 },
];

// ── 3. TAGS ──────────────────────────────────────────────────
const TAGS = [
  "Asian", "Seafood", "Lunch", "Grill", "Steak", "Vegetarian",
  "Dessert", "Coffee", "Padang", "Burger", "Healthy", "European",
];

// ── 4. RESTAURANTS ─────────────────────────────────────────────
type RestaurantSeed = {
  name: string;
  slug: string;
  image: string;
  coverImage: string;
  description: string;
  street: string;
  city: string;
  lat: number;
  lng: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  distanceKm: number;
  priceLevel: number;
  priceRange: string;
  isFeatured?: boolean;
  isRestaurantOfChoice?: boolean;
  promoTitle?: string;
  promoSubtitle?: string;
};

const RESTAURANTS: RestaurantSeed[] = [
  {
    name: "Oriental Restaurant",
    slug: "oriental-restaurant",
    image: "/Rectangle 670 (4).jpg",
    coverImage: "/Rectangle 670 (4).jpg",
    description: "Authentic Asian cuisine in the city center: Thai soups, hand-pulled noodles, and catch-of-the-day seafood.",
    street: "Sentani Road, 10 Malang",
    city: "Malang",
    lat: -7.9666, lng: 112.6326,
    tags: ["Asian", "Seafood", "Lunch"],
    rating: 4.9, reviewCount: 1240, distanceKm: 2.5,
    priceLevel: 2, priceRange: "20K - 100K",
    isFeatured: true, isRestaurantOfChoice: true,
    promoTitle: "Choose 2 Dinner", promoSubtitle: "Pay for One",
  },
  {
    name: "Zen Garden Asian",
    slug: "zen-garden-asian",
    image: "/Rectangle 670.jpg",
    coverImage: "/Rectangle 670.jpg",
    description: "Peaceful garden, steamed dim sum, and a tea menu with 20 items. Ideal for long lunches.",
    street: "Sentani Road, 10 Malang",
    city: "Malang",
    lat: -7.9553, lng: 112.6142,
    tags: ["Asian", "Seafood", "Vegetarian"],
    rating: 4.9, reviewCount: 1010, distanceKm: 1.4,
    priceLevel: 2, priceRange: "20K - 90K",
  },
  {
    name: "Saddleback Tavern",
    slug: "saddleback-tavern",
    image: "/Rectangle 670 (1).jpg",
    coverImage: "/Rectangle 670 (1).jpg",
    description: "American tavern: slow-smoked ribs, charcoal-grilled burgers, and craft lemonade.",
    street: "Riverfront Street, 22 Surabaya",
    city: "Surabaya",
    lat: -7.2575, lng: 112.7521,
    tags: ["Grill", "Steak", "Burger"],
    rating: 4.8, reviewCount: 860, distanceKm: 3.2,
    priceLevel: 3, priceRange: "40K - 150K",
  },
  {
    name: "Golden Bamboo",
    slug: "golden-bamboo",
    image: "/Rectangle 670 (2).jpg",
    coverImage: "/Rectangle 670 (2).jpg",
    description: "Cantonese classics and noodles in a 12-hour simmered broth. Open until midnight.",
    street: "Bamboo Alley, 5 Surabaya",
    city: "Surabaya",
    lat: -7.2892, lng: 112.7345,
    tags: ["Asian", "Seafood", "Lunch"],
    rating: 4.7, reviewCount: 640, distanceKm: 2.1,
    priceLevel: 2, priceRange: "25K - 95K",
  },
  {
    name: "Quickbite Resto",
    slug: "quickbite-resto",
    image: "/Rectangle 670 (3).jpg",
    coverImage: "/Rectangle 670 (3).jpg",
    description: "The fastest kitchen in town: average prep time is 8 minutes. Burgers, bowls, smoothies.",
    street: "Garden Bay St, 14 Sidoarjo",
    city: "Sidoarjo",
    lat: -7.4478, lng: 112.7183,
    tags: ["Burger", "Healthy", "Lunch"],
    rating: 4.9, reviewCount: 1520, distanceKm: 1.4,
    priceLevel: 1, priceRange: "15K - 70K",
  },
  {
    name: "Merah Putih Resto",
    slug: "merah-putih-resto",
    image: "/Rectangle 670 (5).jpg",
    coverImage: "/Rectangle 670 (5).jpg",
    description: "Indonesian home cooking: rendang, gado-gado, and family-recipe sambal.",
    street: "Merdeka Street, 3 Jakarta",
    city: "Jakarta",
    lat: -6.1754, lng: 106.8272,
    tags: ["Asian", "Padang", "Lunch"],
    rating: 4.8, reviewCount: 990, distanceKm: 4.0,
    priceLevel: 2, priceRange: "20K - 110K",
  },
  {
    name: "Golden West Diner",
    slug: "golden-west-diner",
    image: "/Mask group (26).png",
    coverImage: "/Mask group (26).png",
    description: "Dry-aged steaks, grilled potatoes, and 60s American diner-style desserts.",
    street: "Sunset Road, 18 Bali",
    city: "Bali",
    lat: -8.6905, lng: 115.1729,
    tags: ["Steak", "Grill", "European"],
    rating: 4.9, reviewCount: 720, distanceKm: 5.1,
    priceLevel: 4, priceRange: "60K - 250K",
  },
  {
    name: "Sei Sapi Bakar",
    slug: "sei-sapi-bakar",
    image: "/Rectangle 670 (6).jpg",
    coverImage: "/Rectangle 670 (6).jpg",
    description: "Timorese smoked beef, coconut milk rice, and spicy sambal matah.",
    street: "Riverfront Street, 09 Semarang",
    city: "Semarang",
    lat: -6.9932, lng: 110.4203,
    tags: ["Grill", "Asian", "Lunch"],
    rating: 4.8, reviewCount: 540, distanceKm: 2.8,
    priceLevel: 2, priceRange: "25K - 120K",
  },
];

// ── 5. DISH CATALOG ──
type DishSeed = {
  name: string;
  slug: string;
  description: string;
  category: string;
  section: MenuSection;
  price: number;
  oldPrice?: number;
  calories: number;
  prepTimeMin: number;
  isPopular?: boolean;
};

const DISHES: DishSeed[] = [
  // ── Today's Offer (8) ──
  { name: "Green Fried Rice",     slug: "green-fried-rice",     description: "Fresh green chili mixture", category: "rice",       section: MenuSection.TODAYS_OFFER, price: 10.02, oldPrice: 32.10, calories: 520, prepTimeMin: 10, isPopular: true },
  { name: "Tom Yam Koong",        slug: "tom-yam-koong",        description: "Thai Seafood Soup",         category: "noodle",     section: MenuSection.TODAYS_OFFER, price: 11.04, oldPrice: 32.10, calories: 410, prepTimeMin: 12, isPopular: true },
  { name: "Tarik Noodle",         slug: "tarik-noodle",         description: "Hand-pulled egg noodle",    category: "noodle",     section: MenuSection.TODAYS_OFFER, price: 10.02, oldPrice: 32.10, calories: 610, prepTimeMin: 10, isPopular: true },
  { name: "Hainan Chick Noodle",  slug: "hainan-chick-noodle",  description: "Chicken broth noodle",      category: "noodle",     section: MenuSection.TODAYS_OFFER, price: 12.50, oldPrice: 32.10, calories: 580, prepTimeMin: 14 },
  { name: "Beef Rendang",         slug: "beef-rendang",         description: "Slow cooked coconut beef",  category: "grill",      section: MenuSection.TODAYS_OFFER, price: 14.20, oldPrice: 34.00, calories: 720, prepTimeMin: 18 },
  { name: "Nasi Goreng Spesial",  slug: "nasi-goreng-spesial",  description: "Fried rice with egg",       category: "rice",       section: MenuSection.TODAYS_OFFER, price: 9.40,  oldPrice: 28.00, calories: 640, prepTimeMin: 9 },
  { name: "Chicken Katsu Curry",  slug: "chicken-katsu-curry",  description: "Crispy katsu, curry sauce", category: "fast-food",  section: MenuSection.TODAYS_OFFER, price: 12.90, oldPrice: 30.00, calories: 810, prepTimeMin: 15 },
  { name: "Seafood Fried Rice",   slug: "seafood-fried-rice",   description: "Shrimp, squid, sweet corn", category: "rice",       section: MenuSection.TODAYS_OFFER, price: 13.10, oldPrice: 33.00, calories: 690, prepTimeMin: 13 },

  // ── Main Course (4) ──
  { name: "Gado - Gado",          slug: "gado-gado",            description: "Vegetables in peanut sauce", category: "vegetables", section: MenuSection.MAIN_COURSE, price: 10.02, oldPrice: 32.10, calories: 430, prepTimeMin: 11 },
  { name: "Grill Potato",         slug: "grill-potato",         description: "Herb butter, sour cream",    category: "vegetables", section: MenuSection.MAIN_COURSE, price: 10.02, oldPrice: 32.10, calories: 380, prepTimeMin: 12 },
  { name: "Supreme Burger",       slug: "supreme-burger",       description: "Double beef, cheddar",       category: "fast-food",  section: MenuSection.MAIN_COURSE, price: 11.80, oldPrice: 32.10, calories: 940, prepTimeMin: 10, isPopular: true },
  { name: "Veg Big Burger",       slug: "veg-big-burger",       description: "Grilled halloumi, avocado",  category: "vegetables", section: MenuSection.MAIN_COURSE, price: 10.02, oldPrice: 30.00, calories: 620, prepTimeMin: 10 },

  // ── Drinks & Desserts (4) ──
  { name: "Thai Tea Original",    slug: "thai-tea-original",    description: "Creamy iced thai tea",       category: "drink",      section: MenuSection.DRINKS_DESSERTS, price: 10.02, oldPrice: 32.10, calories: 240, prepTimeMin: 5 },
  { name: "Blueberry Pancake",    slug: "blueberry-pancake",    description: "Maple syrup, fresh berries", category: "dessert",    section: MenuSection.DRINKS_DESSERTS, price: 10.02, oldPrice: 32.10, calories: 520, prepTimeMin: 12 },
  { name: "Kulfi Premium",        slug: "kulfi-premium",        description: "Pistachio milk ice cream",   category: "dessert",    section: MenuSection.DRINKS_DESSERTS, price: 10.02, oldPrice: 32.10, calories: 310, prepTimeMin: 6 },
  { name: "Choco Biscuit",        slug: "choco-biscuit",        description: "Dark chocolate & berries",   category: "dessert",    section: MenuSection.DRINKS_DESSERTS, price: 10.02, oldPrice: 32.10, calories: 460, prepTimeMin: 7 },
];

// ── 6. SITE CONTENT (About 7.9) ──────────────────────────────
const STATS = [
  { value: "5000", label: "Happy customers", order: 1 },
  { value: "15", label: "Cities covered", order: 2 },
  { value: "2", label: "Best delivery app 2024", order: 3 },
];

const HOW_IT_WORKS = [
  { step: 1, title: "Choose restaurant", text: "Browse and pick your favourite spot.", icon: "🍽️" },
  { step: 2, title: "Select dishes", text: "Add meals to your cart and customize.", icon: "🛒" },
  { step: 3, title: "Checkout", text: "Pick address and pay securely.", icon: "💳" },
  { step: 4, title: "Enjoy delivery", text: "Track your courier in real time.", icon: "🛵" },
];

const FEATURES = [
  { title: "Fresh Food",    text: "Daily fresh products from local suppliers.", icon: "/takoyaki.svg",      order: 1 },
  { title: "Fast Delivery", text: "Average delivery time is 24 minutes across the city.", icon: "/fast delivery.svg", order: 2 },
  { title: "Quality Food",  text: "Every restaurant undergoes a quality check.",   icon: "/award.svg",         order: 3 },
  { title: "24/7 Service",  text: "Support and couriers are available 24/7.",    icon: "/smile.svg",         order: 4 },
];

const TEAM = [
  { name: "Nala Gilbert",   role: "Head of Operations",  avatar: avatar("nala"),  twitter: "https://twitter.com", linkedin: "https://linkedin.com", instagram: "https://instagram.com", order: 1 },
  { name: "Emily James",    role: "Product Manager",     avatar: avatar("emily"), twitter: "https://twitter.com", linkedin: "https://linkedin.com", instagram: "https://instagram.com", order: 2 },
  { name: "David Anderson", role: "Head of Partnership", avatar: avatar("david"), twitter: "https://twitter.com", linkedin: "https://linkedin.com", instagram: "https://instagram.com", order: 3 },
];

const PARTNERS = [
  { name: "Layers",    logo: "/partners/layers.svg" },
  { name: "Sisyphus",  logo: "/partners/sisyphus.svg" },
  { name: "Hourglass", logo: "/partners/hourglass.svg" },
  { name: "Command+R", logo: "/partners/command-r.svg" },
];

const TESTIMONIALS = [
  { name: "Angeline Liu", role: "Food Vlogger", avatar: avatar("angeline"), rating: 5, text: "I order weekly for shoots — delivery has never been late, the food arrives hot and perfectly packaged." },
  { name: "Anne Marie",   role: "Career Woman", avatar: avatar("anne"),     rating: 4, text: "My lunch break is 40 minutes, and MealMover always makes it in time. Promo codes also make it cheaper than the cafeteria." },
  { name: "Marcus Dwi",   role: "Software Engineer", avatar: avatar("marcus"), rating: 5, text: "Courier tracking on the map is what other services lacked. You can see every step of the order." },
];

const FAQS = [
  { order: 1, question: "Do you charge per hour our per project rate?", answer: "MealMover does not charge an hourly rate. You pay for the order: the cost of dishes + a fixed delivery fee based on the distance to the restaurant." },
  { order: 2, question: "Can I have the plan for one package or any bundling?", answer: "Yes, the app features combo meals from restaurants and a MealMover+ subscription that provides free delivery for orders over $20." },
  { order: 3, question: "Can I consult first when I feel confused what should I choose?", answer: "Of course. The built-in AI assistant will select a dish based on your mood, budget, and dietary restrictions. If you need a human — support is available 24/7 via chat and phone, with an average response time of under 2 minutes." },
  { order: 4, question: "Can I have any revision if the work unexpectedly?", answer: "If something goes wrong with your order — let us know within 30 minutes of delivery, and we will refund you or arrange a free replacement delivery." },
];

// ── MISCELLANEOUS ──
const PROMO_CODES = [
  { code: "FOODORI24",   description: "Promo applied successfully!", type: PromoType.FIXED,   value: 4,    minOrder: 15, usageLimit: 1000 },
  { code: "MEALMOVER10", description: "10% off your first order", type: PromoType.PERCENT, value: 10, minOrder: 20, maxDiscount: 8 },
  { code: "FREESHIP",    description: "Free delivery",         type: PromoType.FIXED,   value: 2.12, minOrder: 10 },
  { code: "NEWUSER15",   description: "15% for new users",   type: PromoType.PERCENT, value: 15,   minOrder: 25, maxDiscount: 12 },
];

const DRIVERS = [
  { name: "John Doe",     code: "ASHY98435JK", avatar: avatar("driver-john"),  phone: "+62 812 3456 7890", rating: 4.9 },
  { name: "Michael Reed", code: "BRTY55120LM", avatar: avatar("driver-mike"),  phone: "+62 812 7788 1122", rating: 4.8 },
  { name: "Sari Dewi",    code: "CKLM77341QP", avatar: avatar("driver-sari"),  phone: "+62 813 9900 3344", rating: 5.0 },
];

const REVIEWERS = [
  { name: "Angeline Liu",  email: "angeline@example.com",  memberSince: 2022 },
  { name: "Amina Toure",   email: "amina@example.com",     memberSince: 2022 },
  { name: "Gordon Lee",    email: "gordon@example.com",    memberSince: 2021 },
  { name: "Alice Sankara", email: "alice@example.com",     memberSince: 2023 },
  { name: "Andrew Tan",    email: "andrew@example.com",    memberSince: 2020 },
  { name: "Pablo Torres",  email: "pablo@example.com",     memberSince: 2022 },
];

const REVIEW_TEXTS = [
  "Ordered several times — consistently hot and neatly packaged. Portions are bigger than in the photos.",
  "Rich flavor, not too salty. The courier arrived earlier than promised.",
  "The price for this quality is more than fair, especially with a promo code.",
  "Airtight packaging, the sauce came separately — nothing spilled.",
  "The kitchen clearly maintains cleanliness: everything is fresh with no off odors.",
  "Favorite spot for dinner at home. The only thing — sometimes they run out of dessert.",
];

const ASPECTS = [
  ReviewAspect.PRICE,
  ReviewAspect.TASTE,
  ReviewAspect.HYGIENE,
  ReviewAspect.PACKAGING,
];

// ── SEED ─────────────────────────────────────────────────────
async function main() {
  console.log("🧹 Clearing the database...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.blogComment.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.city.deleteMany();
  await prisma.deliveryLocation.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.promoCode.deleteMany();
  await prisma.feature.deleteMany();
  await prisma.howItWorksStep.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.contactMessage.deleteMany();

  // 1. Cities
  console.log("🏙  Cities...");
  const cities = await Promise.all(
    CITIES.map((name, i) =>
      prisma.city.create({
        data: { name, slug: name.toLowerCase().replace(/\s+/g, "-"), order: i + 1 },
      })
    )
  );
  const cityByName = new Map(cities.map((c) => [c.name, c.id]));

  // 1b. Delivery locations
  console.log("📍 Delivery locations...");
  await prisma.deliveryLocation.createMany({ data: DELIVERY_LOCATIONS });

  // 2. Categories
  console.log("🍔 Categories...");
  const categories = await Promise.all(
    CATEGORIES.map((c) => prisma.category.create({ data: c }))
  );
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c.id]));

  // 3. Tags
  console.log("🏷  Tags...");
  const tags = await Promise.all(
    TAGS.map((name) =>
      prisma.tag.create({ data: { name, slug: name.toLowerCase().replace(/\s+/g, "-") } })
    )
  );
  const tagByName = new Map(tags.map((t) => [t.name, t.id]));

  // 4. Users
  console.log("👤 Users...");
  const passwordHash = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin MealMover",
      email: "admin@mealmover.dev",
      password: passwordHash,
      role: Role.ADMIN,
      image: avatar("admin"),
      memberSince: 2020,
      emailVerified: new Date(),
    },
  });

  const demoUser = await prisma.user.create({
    data: {
      name: "John Customer",
      email: "demo@mealmover.dev",
      password: passwordHash,
      role: Role.USER,
      image: avatar("demo"),
      phone: "+62 812 5566 7788",
      memberSince: 2022,
      emailVerified: new Date(),
    },
  });

  const reviewers = await Promise.all(
    REVIEWERS.map((r) =>
      prisma.user.create({
        data: {
          name: r.name,
          email: r.email,
          password: passwordHash,
          image: avatar(r.email),
          memberSince: r.memberSince,
          emailVerified: new Date(),
        },
      })
    )
  );

  // 5. Demo user addresses
  console.log("📍 Addresses...");
  const homeAddress = await prisma.address.create({
    data: {
      userId: demoUser.id,
      label: AddressLabel.HOME,
      title: "Home",
      street: "Front Lake Street, 09",
      city: "Surabaya",
      note: "Stainless steel house fence",
      lat: -7.2575, lng: 112.7521,
      isDefault: true,
    },
  });

  await prisma.address.create({
    data: {
      userId: demoUser.id,
      label: AddressLabel.OFFICE,
      title: "Office",
      street: "Papaya Street, 20-D",
      city: "Surabaya",
      note: "Reception on the 3rd floor",
      lat: -7.2762, lng: 112.7419,
    },
  });

  // 6. Couriers
  console.log("🛵 Couriers...");
  const drivers = await Promise.all(
    DRIVERS.map((d) => prisma.driver.create({ data: d }))
  );

  // 7. Promo codes
  console.log("🎟  Promo codes...");
  await Promise.all(
    PROMO_CODES.map((p) =>
      prisma.promoCode.create({
        data: { ...p, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180) },
      })
    )
  );

  // 8. Restaurants + menus
  console.log("🍽  Restaurants and menus...");
  const createdRestaurants = [];

  for (const [rIndex, r] of RESTAURANTS.entries()) {
    const restaurant = await prisma.restaurant.create({
      data: {
        name: r.name,
        slug: r.slug,
        description: r.description,
        image: r.image,
        coverImage: r.coverImage,
        street: r.street,
        cityId: cityByName.get(r.city)!,
        lat: r.lat,
        lng: r.lng,
        phone: "+62 341 555 01" + String(rIndex + 10),
        rating: r.rating,
        reviewCount: r.reviewCount,
        distanceKm: r.distanceKm,
        deliveryMinMin: 20,
        deliveryMaxMin: 30,
        priceLevel: r.priceLevel,
        priceRange: r.priceRange,
        openingHours: "08.00 - 23.00",
        isFeatured: r.isFeatured ?? false,
        isRestaurantOfChoice: r.isRestaurantOfChoice ?? false,
        promoTitle: r.promoTitle ?? null,
        promoSubtitle: r.promoSubtitle ?? null,
        tags: {
          connect: Array.from(new Set(r.tags)).map((t) => ({ id: tagByName.get(t)! })),
        },
      },
    });

    const priceShift = 1 + rIndex * 0.04;

    await prisma.menuItem.createMany({
      data: DISHES.map((d) => {
        const price = money(d.price * priceShift);
        const oldPrice = d.oldPrice ? money(d.oldPrice * priceShift) : null;
        return {
          name: d.name,
          slug: d.slug,
          description: d.description,
          image: img(`dish-${d.slug}-${rIndex}`, 800, 600),
          price,
          oldPrice,
          discountLabel: oldPrice ? `Discount $${money(oldPrice - price).toFixed(2)}` : null,
          section: d.section,
          rating: money(4.5 + ((rIndex + d.name.length) % 5) / 10),
          prepTimeMin: d.prepTimeMin,
          calories: d.calories,
          isPopular: d.isPopular ?? false,
          restaurantId: restaurant.id,
          categoryId: categoryBySlug.get(d.category)!,
        };
      }),
    });

    createdRestaurants.push(restaurant);
  }

  // 9. Reviews
  console.log("⭐ Reviews...");
  for (const [rIndex, restaurant] of createdRestaurants.entries()) {
    await prisma.review.createMany({
      data: reviewers.map((user, i) => ({
        userId: user.id,
        restaurantId: restaurant.id,
        rating: [4.9, 4.8, 5.0, 4.7, 4.9, 4.6][i],
        comment: REVIEW_TEXTS[(i + rIndex) % REVIEW_TEXTS.length],
        aspect: ASPECTS[i % ASPECTS.length],
        orderedItems: [DISHES[(i + rIndex) % DISHES.length].name, "Ice Tea"],
        purchasedAt: daysAgo(5 + i * 3 + rIndex),
      })),
    });
  }

  // 10. Demo user orders
  console.log("🧾 Orders...");
  const orderPlan: {
    number: string;
    restaurantSlug: string;
    status: OrderStatus;
    payment: PaymentMethod;
    paid: PaymentStatus;
    ago: number;
    driverIndex: number | null;
    rating: number | null;
  }[] = [
    { number: "45YH875439", restaurantSlug: "oriental-restaurant", status: OrderStatus.DELIVERED, payment: PaymentMethod.CREDIT_CARD, paid: PaymentStatus.PAID, ago: 2,  driverIndex: 0, rating: 5 },
    { number: "45YH875440", restaurantSlug: "quickbite-resto",     status: OrderStatus.DELIVERED, payment: PaymentMethod.CASH,        paid: PaymentStatus.PAID, ago: 6,  driverIndex: 1, rating: 4 },
    { number: "45YH875441", restaurantSlug: "golden-bamboo",       status: OrderStatus.DELIVERED, payment: PaymentMethod.PAYPAL,      paid: PaymentStatus.PAID, ago: 11, driverIndex: 2, rating: 5 },
    { number: "45YH875442", restaurantSlug: "oriental-restaurant", status: OrderStatus.ON_THE_WAY,payment: PaymentMethod.CREDIT_CARD, paid: PaymentStatus.PAID, ago: 0,  driverIndex: 0, rating: null },
    { number: "45YH875443", restaurantSlug: "saddleback-tavern",   status: OrderStatus.PREPARING, payment: PaymentMethod.CREDIT_CARD, paid: PaymentStatus.PAID, ago: 0,  driverIndex: 1, rating: null },
    { number: "45YH875444", restaurantSlug: "zen-garden-asian",    status: OrderStatus.DRAFT,     payment: PaymentMethod.CASH,        paid: PaymentStatus.PENDING, ago: 1, driverIndex: null, rating: null },
  ];

  for (const plan of orderPlan) {
    const restaurant = createdRestaurants.find((r) => r.slug === plan.restaurantSlug)!;
    const items = await prisma.menuItem.findMany({
      where: { restaurantId: restaurant.id, slug: { in: ["tarik-noodle", "tom-yam-koong"] } },
    });

    const lines = items.map((item, i) => ({
      menuItemId: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: i === 0 ? 1 : 2,
    }));

    const subtotal = money(lines.reduce((sum, l) => sum + l.price * l.quantity, 0));
    const shippingCost = 2.12;
    const discount = 4;
    const total = money(subtotal + shippingCost - discount);

    await prisma.order.create({
      data: {
        orderNumber: plan.number,
        userId: demoUser.id,
        restaurantId: restaurant.id,
        addressId: homeAddress.id,
        driverId: plan.driverIndex !== null ? drivers[plan.driverIndex].id : null,
        status: plan.status,
        paymentMethod: plan.payment,
        paymentStatus: plan.paid,
        subtotal,
        shippingCost,
        discount,
        total,
        distanceKm: 2.9,
        driverRating: plan.rating,
        createdAt: daysAgo(plan.ago),
        deliveredAt: plan.status === OrderStatus.DELIVERED ? daysAgo(plan.ago) : null,
        items: { create: lines },
      },
    });
  }

  // 11. Site content (Оновлено!)
  console.log("📄 Section content...");
  await prisma.stat.createMany({ data: STATS });
  await prisma.howItWorksStep.createMany({ data: HOW_IT_WORKS });
  await prisma.feature.createMany({ data: FEATURES });
  await prisma.teamMember.createMany({ data: TEAM });
  await prisma.partner.createMany({ data: PARTNERS });
  await prisma.testimonial.createMany({ data: TESTIMONIALS });
  await prisma.faq.createMany({ data: FAQS });

  // 12. Demo newsletter subscribers
  await prisma.newsletterSubscriber.createMany({
    data: [
      { email: "subscriber1@example.com", isConfirmed: true },
      { email: "subscriber2@example.com", isConfirmed: true },
    ],
  });

  console.log("\n✅ Done!");
  console.log(`   Cities: ${cities.length}`);
  console.log(`   Restaurants: ${createdRestaurants.length}`);
  console.log(`   Dishes: ${createdRestaurants.length * DISHES.length}`);
  console.log(`   Reviews: ${createdRestaurants.length * reviewers.length}`);
  console.log(`   Orders: ${orderPlan.length}`);
  console.log("\n   Admin login:  admin@mealmover.dev / password123");
  console.log("   Demo login:    demo@mealmover.dev  / password123");
  console.log(`   Admin id: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });