"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { AddToCartStepper } from "./AddToCartStepper";

interface Props {
  id: string;
  name: string;
  desc: string;
  price: number;
  oldPrice: number;
  discount: string;
  image: string;
  restaurantId: string;
  restaurantName: string;
  onOpenModal: () => void;
}

export function MenuItemCard({ 
  id, 
  name, 
  desc, 
  price, 
  oldPrice, 
  discount, 
  image, 
  restaurantId, 
  restaurantName, 
  onOpenModal 
}: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <motion.div
      id={`dish-${name.toLowerCase().replace(/\s+/g, "-")}`}
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group border border-neutral-300 rounded-[30px] sm:rounded-[40px] p-4 flex gap-4 bg-white h-full hover:border-[#EF5B5B] hover:shadow-[0_16px_40px_-16px_rgba(239,91,91,0.3)] transition-colors scroll-mt-28"
    >
      <button 
        onClick={onOpenModal} 
        className="overflow-hidden rounded-[20px] flex-shrink-0 cursor-pointer block text-left" 
        aria-label={`Customize ${name}`}
      >
        <img
          ref={imageRef}
          src={image}
          alt={name}
          className="w-[120px] sm:w-[180px] h-[120px] sm:h-[180px] object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </button>
      <div className="flex flex-col gap-1.5 sm:gap-2 min-w-0 flex-1">
        <h3 className="font-heading font-medium text-[18px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800 line-clamp-2">{name}</h3>
        <p className="font-heading font-light text-[14px] sm:text-[20px] text-neutral-500 line-clamp-1">{desc}</p>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-heading font-semibold text-[20px] sm:text-[31px] leading-[123%] tracking-[0.01em] text-[#EF5B5B]">${price.toFixed(2)}</span>
          <span className="font-heading font-normal text-[15px] sm:text-[24px] line-through text-neutral-500">${oldPrice.toFixed(2)}</span>
        </div>
        <span className="self-start font-heading font-normal text-[14px] sm:text-[18px] text-[#D8AC1C] bg-[#FFF6CC] rounded-[20px] px-4 py-1">{discount}</span>
        <div className="mt-auto w-full pt-1">
          <AddToCartStepper 
            id={id} 
            name={name} 
            price={price} 
            image={image} 
            restaurantId={restaurantId}
            restaurantName={restaurantName}
            imageRef={imageRef} 
          />
        </div>
      </div>
    </motion.div>
  );
}