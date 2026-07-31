"use client";

import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

/* ============================================================
   FORM COMPONENTS — MealMover Design System
   Input | Select (Dropdown) | Textarea
   ============================================================ */

/* ----------------------------------------------------------
   SHARED TOKENS
   bg:       #F5F5F5  (neutral-100)
   border:   #EEEEEE  (neutral-200)
   radius input: 50px (pill)
   radius textarea: 20px
   padding: 14px 20px | h-[46px]
   error border: #FDA091 (error-300)
---------------------------------------------------------- */

const baseField = [
  "w-full font-heading text-[16px] font-light leading-auto",
  "bg-[#F5F5F5] border border-[#EEEEEE]",
  "text-neutral-900 placeholder:text-neutral-500",
  "transition-all duration-200 outline-none",
  "focus:border-[#EEEEEE] focus:ring-0",
  "hover:border-neutral-300",
  "disabled:opacity-50 disabled:cursor-not-allowed",
].join(" ");

const errorField = "border-[#FDA091] bg-[#F5F5F5] text-[#EF5B5B] placeholder:text-[#EF5B5B]";

/* ----------------------------------------------------------
   USER ICON SVG (for left/right icon slots)
---------------------------------------------------------- */
export const UserIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-4 h-4 text-neutral-500 flex-shrink-0", className)} viewBox="0 0 16 16" fill="none">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={cn("w-4 h-4 text-neutral-500 flex-shrink-0", className)} viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ============================================================
   INPUT
   States: inactive | activated | on-click | disabled | error
   Variants: no icon | right icon | left icon
   
   Box model (Figma):
     border-radius: 50px
     padding: 14px 20px
     height: 46px  (no icon / right icon)
     height: 52px  (left icon)
============================================================ */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  error?:     boolean;
  /** Helper text shown below on error */
  errorText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, error, errorText, className, ...props }, ref) => {
    const hasLeft  = Boolean(leftIcon);
    const hasRight = Boolean(rightIcon);

    return (
      <div className="flex flex-col gap-1">
        <div className="relative inline-flex items-center w-full">
          {/* Left icon */}
          {hasLeft && (
            <span className="absolute left-4 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            className={cn(
              baseField,
              "rounded-[50px] h-[46px]",
              "px-5",
              hasLeft  && "pl-10 h-[52px]",
              hasRight && "pr-10",
              error && errorField,
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {hasRight && (
            <span className="absolute right-4 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>

        {error && errorText && (
          <p className="text-[12px] text-[#EF5B5B] pl-4">{errorText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

/* ============================================================
   SELECT (Dropdown)
   States: normal | hover | on-click | disabled
   Variants: no icon | left icon
   
   Box model (Figma):
     border-radius: 50px
     padding: 14px 20px
     height: 46px (no icon) | 52px (left icon)
============================================================ */

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  leftIcon?: React.ReactNode;
  error?:    boolean;
  children:  React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ leftIcon, error, children, className, ...props }, ref) => {
    const hasLeft = Boolean(leftIcon);

    return (
      <div className="relative inline-flex items-center w-full">
        {/* Left icon */}
        {hasLeft && (
          <span className="absolute left-4 pointer-events-none z-10">
            {leftIcon}
          </span>
        )}

        <select
          ref={ref}
          className={cn(
            baseField,
            "rounded-[50px] h-[46px] appearance-none cursor-pointer",
            "px-5 pr-10",
            hasLeft && "pl-10 h-[52px]",
            error && errorField,
            className
          )}
          {...props}
        >
          {children}
        </select>

        {/* Chevron — always right */}
        <span className="absolute right-4 pointer-events-none">
          <ChevronIcon />
        </span>
      </div>
    );
  }
);
Select.displayName = "Select";

/* ============================================================
   TEXTAREA
   States: inactive | activated | on-click | disabled | error
   
   Box model (Figma):
     border-radius: 20px
     padding: 16px 24px
     min-height: 140px
     On-click: outer glow ring → ring-2 ring-neutral-200/35
============================================================ */

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, errorText, className, ...props }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      <textarea
        ref={ref}
        className={cn(
          baseField,
          "rounded-[20px] min-h-[140px] px-6 py-4 resize-none",
          "focus:ring-4 focus:ring-[#EEEEEE]/35",
          error && [errorField, "border-[#F9484E]"],
          className
        )}
        {...props}
      />
      {error && errorText && (
        <p className="text-[12px] text-[#EF5B5B] pl-2">{errorText}</p>
      )}
    </div>
  )
);
Textarea.displayName = "Textarea";