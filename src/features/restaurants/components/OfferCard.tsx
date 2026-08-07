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
  image: string;
  restaurantId: string;
  restaurantName: string;
  onOpenModal: () => void;
}

export function OfferCard({ id, name, desc, price, oldPrice, image, restaurantId, restaurantName, onOpenModal }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group border border-neutral-300 rounded-[30px] overflow-hidden flex flex-col bg-white w-full max-w-[281px] hover:border-[#EF5B5B] hover:shadow-[0_16px_40px_-16px_rgba(239,91,91,0.35)] transition-colors"
    >
      <button onClick={onOpenModal} className="overflow-hidden block cursor-pointer" aria-label={`Customize ${name}`}>
        <img ref={imageRef} src={image} alt={name} className="w-full h-[200px] sm:h-[247px] object-cover transition-transform duration-500 group-hover:scale-110" />
      </button>
      <div className="p-5 flex flex-col gap-2">
        <h3 className="font-heading font-medium text-[20px] sm:text-[25px] leading-[140%] tracking-[0.02em] text-neutral-800">{name}</h3>
        <p className="font-heading font-light text-[16px] sm:text-[20px] text-neutral-500">{desc}</p>
        <div className="flex items-center gap-3">
          <span className="font-heading font-semibold text-[24px] sm:text-[31px] text-[#EF5B5B]">${price.toFixed(2)}</span>
          <span className="font-heading font-normal text-[18px] sm:text-[24px] line-through text-neutral-500">${oldPrice.toFixed(2)}</span>
        </div>
        <AddToCartStepper id={id} name={name} price={price} image={image} restaurantId={restaurantId} restaurantName={restaurantName} imageRef={imageRef} />
      </div>
    </motion.div>
  );
}