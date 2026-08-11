import { z } from "zod";

export const CheckoutFormSchema = z.object({
  addressId: z.string().min(1, "Select a delivery address"),
  paymentMethod: z.enum(["CREDIT_CARD", "CASH", "PAYPAL"]),
  note: z.string().max(300).optional(),
});

export const CheckoutSchema = z.object({
  restaurantId: z.string().min(1),
  addressTitle: z.string().min(1, "Select an address"),
  addressStreet: z.string().min(3),
  note: z.string().max(300).optional(),
  paymentMethod: z.enum(["CREDIT_CARD", "CASH", "PAYPAL"]),
  promoCode: z.string().optional(),
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    image: z.string(),
    price: z.number(),
    qty: z.number().min(1),
  })).min(1, "Cart is empty"),
  subtotal: z.number(),
  shippingCost: z.number(),
  discount: z.number(),
  total: z.number(),
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;
export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>;

export type CheckoutState = {
  ok: boolean;
  error?: string;
  orderNumber?: string;
  eta?: number;
};