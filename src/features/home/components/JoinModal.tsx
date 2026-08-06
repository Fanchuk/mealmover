"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Enter your phone number"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  type: "courier" | "merchant";
  open: boolean;
  onClose: () => void;
}

export function JoinModal({ type, open, onClose }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  if (!open) return null;

  const title = type === "courier" ? "Join as Courier" : "Join as Merchant";

  function onSubmit(values: FormValues) {
    console.log(values);
    toast.success("Application submitted! We will contact you.");
    reset();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div
        className="relative w-full max-w-[440px] bg-white rounded-[24px] p-6 lg:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700">
          <X size={22} />
        </button>

        <h3 className="font-heading font-bold text-[24px] text-neutral-800 mb-6">{title}</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full h-[52px] px-5 rounded-full border border-neutral-200 outline-none font-heading text-[15px] focus:border-[#EF5B5B]"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-4">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full h-[52px] px-5 rounded-full border border-neutral-200 outline-none font-heading text-[15px] focus:border-[#EF5B5B]"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register("phone")}
              placeholder="Phone"
              className="w-full h-[52px] px-5 rounded-full border border-neutral-200 outline-none font-heading text-[15px] focus:border-[#EF5B5B]"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1 ml-4">{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            className="h-[52px] rounded-full bg-[#EF5B5B] text-white font-heading font-medium text-[16px] hover:bg-[#CD424E] transition-colors mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}