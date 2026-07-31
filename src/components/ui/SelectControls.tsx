"use client";

import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

/* ============================================================
   SELECT CONTROLS — MealMover Design System
   Checkbox | Radio | Switch
   ============================================================ */

/* ----------------------------------------------------------
   CHECKBOX
   States: normal | hover | on-click | disabled
   Variants: selected | unselected | indeterminate
   
   Figma tokens:
     selected:     fill #EF5B5B, rx 5px, 16×16
     unselected:   border #424242 (normal) / #E0E0E0 (disabled)
     indeterminate: fill #EF5B5B, minus icon
     hover/click:  outer glow ring #FEE9DE / #FDCEBE
---------------------------------------------------------- */

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  indeterminate?: boolean;
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate, label, className, disabled, ...props }, ref) => (
    <label className={cn(
      "inline-flex items-center gap-2 cursor-pointer select-none font-heading text-[16px] font-light",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}>
      <span className="relative inline-flex items-center justify-center">
        {/* Hover/click glow ring */}
        <span className={cn(
          "absolute inset-[-7px] rounded-full transition-colors duration-150",
          !disabled && "peer-hover:bg-[#FEE9DE] peer-active:bg-[#FDCEBE]"
        )} />

        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />

        {/* Custom checkbox box */}
        <span className={cn(
          "relative z-10 w-4 h-4 rounded-[5px] flex items-center justify-center transition-all duration-150",
          // unselected normal
          "border border-neutral-800 bg-white",
          // selected
          "peer-checked:bg-[#EF5B5B] peer-checked:border-[#EF5B5B]",
          // indeterminate
          indeterminate && "bg-[#EF5B5B] border-[#EF5B5B]",
          // disabled
          "peer-disabled:border-[#E0E0E0] peer-disabled:bg-white",
          "peer-checked:peer-disabled:bg-[#E0E0E0] peer-checked:peer-disabled:border-[#E0E0E0]",
          // hover ring on wrapper
          "peer-hover:ring-4 peer-hover:ring-[#FEE9DE]",
          "peer-active:ring-4 peer-active:ring-[#FDCEBE]",
        )}>
          {/* Check icon */}
          <svg
            className={cn(
              "w-[10px] h-[10px] text-white transition-opacity",
              "opacity-0 peer-checked:opacity-100",
              indeterminate && "opacity-0"
            )}
            viewBox="0 0 12 12" fill="none"
          >
            <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {/* Indeterminate icon */}
          {indeterminate && (
            <svg className="w-[10px] h-[2px]" viewBox="0 0 10 2" fill="none">
              <path d="M1 1h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </span>

      {label && <span className={cn("text-neutral-900", disabled && "text-neutral-400")}>{label}</span>}
    </label>
  )
);
Checkbox.displayName = "Checkbox";


/* ----------------------------------------------------------
   RADIO
   States: normal | hover | on-click | disabled
   Variants: selected | unselected
   
   Figma tokens (SVG):
     selected normal:   outer ring #EF5B5B, inner fill #EF5B5B
     selected hover:    bg #FEE9DE + ring + fill
     selected click:    bg #FDCEBE + ring + fill
     unselected normal: outer ring #424242
     unselected hover:  bg #FEE9DE + ring
     unselected click:  bg #FDCEBE + ring
     disabled:          ring #E0E0E0, fill #E0E0E0
---------------------------------------------------------- */

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, disabled, ...props }, ref) => (
    <label className={cn(
      "inline-flex items-center gap-2 cursor-pointer select-none font-heading text-[16px] font-light",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}>
      <span className="relative inline-flex items-center justify-center w-[30px] h-[30px]">
        <input
          ref={ref}
          type="radio"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />

        {/* Glow background (hover/click) */}
        <span className={cn(
          "absolute inset-0 rounded-full transition-colors duration-150",
          !disabled && "peer-hover:bg-[#FEE9DE] peer-active:bg-[#FDCEBE]"
        )} />

        {/* Outer ring */}
        <span className={cn(
          "relative z-10 w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center transition-all duration-150",
          "border-neutral-800",
          "peer-checked:border-[#EF5B5B]",
          "peer-disabled:border-[#E0E0E0]",
        )}>
          {/* Inner dot — selected only */}
          <span className={cn(
            "w-[8px] h-[8px] rounded-full transition-all duration-150",
            "opacity-0 scale-0",
            "peer-checked:opacity-100 peer-checked:scale-100 bg-[#EF5B5B]",
            "peer-checked:peer-disabled:bg-[#E0E0E0]",
          )} />
        </span>
      </span>

      {label && <span className={cn("text-neutral-900", disabled && "text-neutral-400")}>{label}</span>}
    </label>
  )
);
Radio.displayName = "Radio";


/* ----------------------------------------------------------
   SWITCH (Switcher)
   States: normal | hover | on-click | disabled
   Inactive: bg #FDCEBE, knob left
   Active:   bg #EF5B5B, knob right
   Disabled: bg #E0E0E0
   
   Figma SVG: 48×24 pill, knob r=10 (white circle)
---------------------------------------------------------- */

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, className, disabled, ...props }, ref) => (
    <label className={cn(
      "inline-flex items-center gap-3 cursor-pointer select-none font-heading text-[16px] font-light",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}>
      <span className="relative inline-flex">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />

        {/* Track */}
        <span className={cn(
          "w-[48px] h-[24px] rounded-[15px] transition-colors duration-200",
          // inactive
          "bg-[#FDCEBE]",
          // active
          "peer-checked:bg-[#EF5B5B]",
          // disabled
          "peer-disabled:bg-[#E0E0E0]",
          // hover/click
          !disabled && "peer-hover:opacity-90 peer-active:opacity-80",
        )} />

        {/* Knob */}
        <span className={cn(
          "absolute top-[2px] left-[2px] w-[20px] h-[20px] rounded-full bg-white shadow-sm",
          "transition-transform duration-200",
          "peer-checked:translate-x-[24px]",
        )} />
      </span>

      {label && <span className={cn("text-neutral-900", disabled && "text-neutral-400")}>{label}</span>}
    </label>
  )
);
Switch.displayName = "Switch";