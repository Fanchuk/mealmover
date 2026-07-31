"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

/* ============================================================
   AVATAR
   Circle: rounded-full | Square: rounded-xl
   Sizes: 80 | 64 | 48 | 40 | 32 | 28 | 24 (circle)
          87 | 64 | 48 | 40 | 32 | 28 | 24 (square)
============================================================ */

type AvatarSize = 80 | 64 | 48 | 40 | 32 | 28 | 24 | 87;
type AvatarShape = "circle" | "square";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
}

export function Avatar({ src, alt = "", size = 40, shape = "circle", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-neutral-200 flex-shrink-0",
        shape === "circle" ? "rounded-full" : "rounded-xl",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes={`${size}px`} />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-neutral-400">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-1/2 h-1/2">
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4Z"/>
          </svg>
        </span>
      )}
    </div>
  );
}

/* ============================================================
   CATEGORY CARD (Round Card)
   On Click: bg #EF5B5B, text white, icon bg white
   Normal:   bg white, text neutral-600, border neutral-200
   
   Figma: border-radius 50px, padding 4px 16px 4px 4px, h-54px
============================================================ */

interface CategoryCardProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryCard({ label, icon, active, onClick, className }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-3 rounded-[50px] h-[54px] pr-4 transition-all duration-200 font-heading text-[14px] font-medium",
        active
          ? "bg-[#EF5B5B] text-white pl-1"
          : "bg-white border border-neutral-200 text-neutral-600 pl-1 hover:border-[#EF5B5B] hover:text-[#EF5B5B]",
        className
      )}
    >
      {/* Icon circle */}
      <span className={cn(
        "w-[46px] h-[46px] rounded-full flex items-center justify-center flex-shrink-0",
        active ? "bg-white" : "bg-neutral-100"
      )}>
        {icon}
      </span>
      {label}
    </button>
  );
}

/* ============================================================
   RESTAURANT CARD — Big (General Card)
   Figma: w-248px, shadow 0 16px 40px 0 rgba(0,0,0,0.07)
          image top, heart button top-right
          name + rating + address + time + tags
============================================================ */

interface Tag {
  label: string;
}

interface RestaurantCardProps {
  id: string | number;
  name: string;
  image: string;
  rating: number;
  reviewCount?: string;
  address: string;
  deliveryTime: string;
  tags?: Tag[];
  isFavorite?: boolean;
  onFavorite?: () => void;
  className?: string;
}

export function RestaurantCard({
  id, name, image, rating, reviewCount = "1K+",
  address, deliveryTime, tags = [], isFavorite, onFavorite, className
}: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurants/${id}`}
      className={cn(
        "block w-[248px] bg-white rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1",
        "shadow-[0_16px_40px_0_rgba(0,0,0,0.07)]",
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full h-[140px]">
        <Image src={image} alt={name} fill className="object-cover" sizes="248px" />
        {/* Favorite button */}
        <button
          onClick={(e) => { e.preventDefault(); onFavorite?.(); }}
          className={cn(
            "absolute top-2 right-2 w-[31px] h-[31px] rounded-full flex items-center justify-center",
            "border border-neutral-200 bg-white/80 backdrop-blur-[4px] transition-colors",
            isFavorite ? "text-[#EF5B5B]" : "text-neutral-300 hover:text-[#EF5B5B]"
          )}
        >
          <svg viewBox="0 0 23 20" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3">
            <path d="M22.4 4.1C21.5 1.6 19.2 0 16.6 0c-2.2 0-4.2 1.2-5.2 3-1.1-1.8-3-3-5.3-3C3.5 0 1.2 1.6.3 4.1-.3 5.9-.1 7.8.9 9.5c2.7 4.8 10.5 9.4 10.5 9.4s7.7-4.6 10.5-9.4c1-1.7 1.2-3.6.5-5.4Z"/>
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        {/* Name + Rating */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-heading font-semibold text-[16px] leading-[157%] tracking-[0.04em] text-neutral-800 line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <svg className="w-3 h-3 text-[#FFCF27] fill-current" viewBox="0 0 12 12">
              <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4 6 1Z"/>
            </svg>
            <span className="font-heading font-medium text-[12px] text-[#EF5B5B]">{rating}</span>
            <span className="font-heading font-light text-[12px] text-neutral-600">/ 5.0</span>
            <span className="font-heading font-light text-[12px] text-neutral-400">({reviewCount})</span>
          </div>
        </div>

        {/* Address + Time */}
        <div className="flex items-center gap-3 mb-2">
          <span className="flex items-center gap-1 font-heading font-light text-[12px] text-neutral-600">
            <svg className="w-3 h-3 text-[#EF5B5B] flex-shrink-0" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0a4 4 0 0 0-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 0 0-4-4Zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
            </svg>
            {address}
          </span>
          <span className="flex items-center gap-1 font-heading font-light text-[12px] text-neutral-600">
            <svg className="w-3 h-3 text-[#EF5B5B] flex-shrink-0" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm.75 6.44L4.5 7.75 3.75 6.5l1.5-1V3h1.5v3.44Z"/>
            </svg>
            {deliveryTime}
          </span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className="font-heading font-light text-[10px] tracking-[0.04em] uppercase text-neutral-600 bg-neutral-100 rounded-[4px] px-1.5 py-1"
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

/* ============================================================
   MEAL CARD — Small
   Figma: w-143px, h-245px, shadow 0 16px 40px 0 rgba(0,0,0,0.07)
          rating badge on image (bottom-left), name, price, restaurant
============================================================ */

interface MealCardProps {
  id: string | number;
  name: string;
  image: string;
  price: number;
  rating?: number;
  reviewCount?: string;
  restaurantName?: string;
  className?: string;
}

export function MealCard({ id, name, image, price, rating = 4.9, reviewCount = "1k+", restaurantName, className }: MealCardProps) {
  return (
    <Link
      href={`/meals/${id}`}
      className={cn(
        "block w-[143px] bg-white rounded-2xl overflow-hidden transition-transform duration-200 hover:-translate-y-1",
        "shadow-[0_16px_40px_0_rgba(0,0,0,0.07)]",
        className
      )}
    >
      {/* Image */}
      <div className="relative w-full h-[143px]">
        <Image src={image} alt={name} fill className="object-cover" sizes="143px" />
        {/* Rating badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white rounded-[8px] px-1.5 py-1 shadow-[0_4px_12px_0_rgba(0,0,0,0.05)]">
          <svg className="w-2.5 h-2.5 text-[#FFCF27] fill-current" viewBox="0 0 12 12">
            <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4 6 1Z"/>
          </svg>
          <span className="font-heading font-medium text-[12px] text-[#EF5B5B]">{rating}</span>
          <span className="font-heading font-light text-[12px] text-neutral-600">/ 5.0</span>
          <span className="font-heading font-light text-[12px] text-neutral-400">({reviewCount})</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 text-center">
        <h3 className="font-heading font-semibold text-[16px] leading-[157%] tracking-[0.04em] text-neutral-800 mb-1 line-clamp-2">
          {name}
        </h3>
        <p className="font-heading font-semibold text-[16px] text-[#EF5B5B] mb-1">
          ${price.toFixed(2)}
        </p>
        {restaurantName && (
          <p className="flex items-center justify-center gap-1 font-heading font-light text-[12px] text-neutral-600">
            <svg className="w-3 h-3 text-[#EF5B5B] fill-current flex-shrink-0" viewBox="0 0 12 12">
              <path d="M6 0a4 4 0 0 0-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 0 0-4-4Zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
            </svg>
            {restaurantName}
          </p>
        )}
      </div>
    </Link>
  );
}

/* ============================================================
   BOTTOM NAVBAR (Mobile)
   Figma: w-375px h-77px, shadow 6px 0 25px 10px rgba(0,0,0,0.04)
   Center: big red circle button (delivery truck icon)
   Icons: compass, heart, bell (badge), cart (badge)
============================================================ */

interface BottomNavbarProps {
  cartCount?: number;
  notifCount?: number;
  activeTab?: "home" | "favorites" | "orders" | "notifications" | "cart";
  className?: string;
}

export function BottomNavbar({ cartCount = 0, notifCount = 0, activeTab, className }: BottomNavbarProps) {
  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around",
      "h-[77px] bg-white shadow-[6px_0_25px_10px_rgba(0,0,0,0.04)]",
      className
    )}>
      {/* Compass / Home */}
      <NavIcon active={activeTab === "home"} href="/">
        <svg viewBox="0 0 28 28" fill="currentColor" className="w-6 h-6">
          <path d="M19.4 10.44l-1.98 6.04a2 2 0 0 1-1.34 1.34l-6.04 1.98a.6.6 0 0 1-.76-.76l1.98-6.04a2 2 0 0 1 1.34-1.34l6.04-1.98a.6.6 0 0 1 .76.76ZM22.04 5.96a11.38 11.38 0 1 0 0 16.08 11.38 11.38 0 0 0 0-16.08Zm-8.04 9.54a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>
        </svg>
      </NavIcon>

      {/* Favorites */}
      <NavIcon active={activeTab === "favorites"} href="/favorites">
        <svg viewBox="0 0 23 20" fill="currentColor" className="w-5 h-4.5">
          <path d="M22.4 4.1C21.5 1.6 19.2 0 16.6 0c-2.2 0-4.2 1.2-5.2 3-1.1-1.8-3-3-5.3-3C3.5 0 1.2 1.6.3 4.1-.3 5.9-.1 7.8.9 9.5c2.7 4.8 10.5 9.4 10.5 9.4s7.7-4.6 10.5-9.4c1-1.7 1.2-3.6.5-5.4Z"/>
        </svg>
      </NavIcon>

      {/* Center — Delivery / Orders */}
      <div className="relative -mt-8">
        <Link href="/orders" className={cn(
          "flex items-center justify-center w-[60px] h-[60px] rounded-full bg-[#EF5B5B]",
          "border-[1.4px] border-white shadow-[0_0_18px_3px_rgba(239,91,91,0.24)] transition-transform hover:scale-105"
        )}>
          {/* Delivery truck SVG from Figma */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M8.17 21.87a3.21 3.21 0 1 0 0-6.41 3.21 3.21 0 0 0 0 6.41Z" fill="#fff"/>
            <path d="M19.83 21.87a3.21 3.21 0 1 0 0-6.41 3.21 3.21 0 0 0 0 6.41Z" fill="#fff"/>
            <path d="M23.59 13.1l.84-1.69a2.2 2.2 0 0 0-1.82-3.25h-1.96c-.04.41-.11.82-.27 1.2l-1.81 4.23c.4-.1.82-.17 1.25-.17 2.73 0 4.96 2.23 4.96 4.96 0 .15-.03.3-.05.45.38-.33.63-.81.63-1.35v-2.88a1.5 1.5 0 0 0-1.77-1.5Z" fill="#fff"/>
            <path d="M18.6 7.05a2.13 2.13 0 0 0-1.7-.92H3.5a.875.875 0 0 0 0 1.75h2.32l-.53 1.75H3.5a.875.875 0 0 0 0 1.75h1.27l-.53 1.75H3.5a.875.875 0 0 0 0 1.75h.22l-.72 2.39c-.15.5-.07 1.01.21 1.46.05-2.61 2.19-4.73 4.81-4.73 2.63 0 4.82 2.16 4.82 4.82 0 .24-.03.49-.07.73h.83c.34 0 .65-.2.79-.51l1.59-3.51 2.8-6.55c.27-.63.21-1.35-.18-1.94Z" fill="#fff"/>
          </svg>
        </Link>
      </div>

      {/* Notifications */}
      <NavIcon active={activeTab === "notifications"} href="/notifications" badge={notifCount}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 0 0-5-5.92V4a1 1 0 0 0-2 0v1.08A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2Z"/>
        </svg>
      </NavIcon>

      {/* Cart */}
      <NavIcon active={activeTab === "cart"} href="/cart" badge={cartCount}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM1 2h2l3.6 7.59L5.25 12a2 2 0 0 0 2 2H19v-2H7.42a.25.25 0 0 1-.25-.25l.03-.12.9-1.63H17a2 2 0 0 0 1.75-1.04l3.58-6.49A1 1 0 0 0 21.46 1H5.21L4.27 0H1v2Z"/>
        </svg>
      </NavIcon>
    </nav>
  );
}

/* Icon wrapper for BottomNavbar items */
function NavIcon({ children, active, href, badge }: {
  children: React.ReactNode;
  active?: boolean;
  href: string;
  badge?: number;
}) {
  return (
    <Link href={href} className="relative flex items-center justify-center w-10 h-10">
      <span className={cn(
        "transition-colors",
        active ? "text-[#EF5B5B]" : "text-neutral-300 hover:text-neutral-500"
      )}>
        {children}
      </span>
      {badge != null && badge > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-[15px] rounded-[10px] bg-[#FFCF27] border border-white flex items-center justify-center font-heading font-medium text-[10px] text-neutral-900 leading-none px-1">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </Link>
  );
}