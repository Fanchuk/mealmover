"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/src/features/cart/store";
import { CheckoutFormSchema, type CheckoutFormValues } from "../schema";
import { placeOrder } from "../services/checkoutActions";
import { haversineKm, shippingCost } from "../lib/delivery";
import { DeliveryAddress, type Address } from "./DeliveryAddress";
import { OrderSummary } from "./OrderSummary";
import { PaymentMethod } from "./PaymentMethod";
import { PaymentSummary } from "./PaymentSummary";

interface Restaurant {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export function CheckoutContent({
  addresses,
  restaurant,
}: {
  addresses: Address[];
  restaurant: Restaurant | null;
}) {
  const items = useCartStore((s) => s.items);
  const promo = useCartStore((s) => s.promo);
  const selectedSubtotal = useCartStore((s) => s.selectedSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const [pending, startTransition] = useTransition();

  const [localAddresses, setLocalAddresses] = useState<Address[]>(addresses);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      addressId: localAddresses.find((a) => a)?.id ?? "",
      paymentMethod: "CREDIT_CARD",
      note: "",
    },
  });

  const selectedAddressId = watch("addressId");
  const selectedAddress = localAddresses.find((a) => a.id === selectedAddressId);

  const subtotal = selectedSubtotal();
  const distanceKm =
    restaurant && selectedAddress?.lat && selectedAddress?.lng
      ? haversineKm(
          restaurant.lat,
          restaurant.lng,
          selectedAddress.lat,
          selectedAddress.lng
        )
      : 0;
  const shipping = distanceKm !== null ? shippingCost(distanceKm) : shippingCost(0);
  const discount = promo?.discount ?? 0;
  const total = Math.max(0, subtotal + shipping - discount);

  if (items.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-[600px] mx-auto px-4 text-center flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-neutral-100 flex items-center justify-center">
            <ShoppingCart size={40} className="text-neutral-300" />
          </div>
          <h1 className="font-heading font-bold text-[28px] text-neutral-800">
            Your cart is empty
          </h1>
          <p className="font-heading text-neutral-500">
            Add some dishes before checking out.
          </p>
          <Link
            href="/restaurants"
            className="mt-2 h-[52px] px-8 rounded-[50px] bg-[#EF5B5B] text-white font-heading font-medium flex items-center hover:bg-[#CD424E] transition-colors"
          >
            Browse restaurants
          </Link>
        </div>
      </section>
    );
  }

  function onSubmit(values: CheckoutFormValues) {
    const addr = localAddresses.find((a) => a.id === values.addressId);
    if (!addr) {
      toast.error("Please select an address.");
      return;
    }

    const restaurantId = items.find(i => i.restaurantId)?.restaurantId ?? restaurant?.id ?? "";
    if (!restaurantId) {
      toast.error("Restaurant not found.");
      return;
    }

    startTransition(async () => {
      clearCart();

      const res = await placeOrder(
        { ok: false },
        {
          restaurantId,
          addressTitle: addr.title,
          addressStreet: addr.street,
          note: values.note,
          paymentMethod: values.paymentMethod,
          promoCode: promo?.code,
          items: items
            .filter((i) => i.selected)
            .map((i) => ({
              id: i.id,
              name: i.name,
              image: i.image,
              price:
                i.basePrice +
                (i.size?.price ?? 0) +
                i.addons.reduce((s, a) => s + a.price, 0),
              qty: i.qty,
            })),
          subtotal,
          shippingCost: shipping,
          discount,
          total,
        }
      );

      if (res && !res.ok) toast.error(res.error ?? "Something went wrong.");
    });
  }

  const restaurantName = items[0]?.restaurantName ?? restaurant?.name ?? "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white py-8 lg:py-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <h1 className="font-heading font-semibold text-[34px] sm:text-[49px] leading-[124%] tracking-[0.01em] text-neutral-800">
          Last Step — Delivery &amp; Payment
        </h1>
        <p className="font-heading font-medium text-[26px] sm:text-[39px] leading-[123%] text-neutral-800 mt-2">
          {restaurantName}
        </p>

        <div className="w-full border-t border-dashed border-neutral-300 my-8 lg:my-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="flex flex-col gap-10 lg:gap-12">
            <DeliveryAddress
              addresses={localAddresses}
              onAdded={(a: Address) => setLocalAddresses((prev) => [...prev, a])}
              selectedId={selectedAddressId}
              onSelect={(id) => setValue("addressId", id)}
              error={errors.addressId?.message}
              noteRegister={register("note")}
            />
            <OrderSummary />
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <PaymentMethod
              selected={watch("paymentMethod")}
              onSelect={(m) => setValue("paymentMethod", m)}
            />
            <PaymentSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              distanceKm={distanceKm}
              lat={selectedAddress?.lat ?? restaurant?.lat ?? null}
              lng={selectedAddress?.lng ?? restaurant?.lng ?? null}
              pending={pending}
            />
          </div>
        </div>
      </div>
    </form>
  );
}