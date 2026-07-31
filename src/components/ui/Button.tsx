import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

/* ============================================================
   BUTTON — MealMover Design System
   
   Variants:  primary | secondary | tertiary
   Sizes:     lg | md | sm
   Special:   icon prefix circle (special prop)
   Ghost:     icon-only circle
   States:    normal | hover (CSS) | disabled
   ============================================================ */

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize    = "lg" | "md" | "sm";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  /** Shows the arrow icon circle on the left (Special column) */
  special?:  boolean;
  /** Shows only the arrow icon circle (Ghost column) */
  ghost?:    boolean;
  /** Trailing icon/chevron element (With Icon column) */
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
}

/* ----------------------------------------------------------
   SIZE TOKENS
   Large  → h-[60px]  text-[20px]  px-6  icon-circle: 44px
   Medium → h-[51px]  text-[18px]  px-5  icon-circle: 38px
   Small  → h-[31px]  text-[14px]  px-4  icon-circle: 26px
---------------------------------------------------------- */
const sizeMap: Record<ButtonSize, {
  btn:    string;
  text:   string;
  circle: string;
  icon:   string;
}> = {
  lg: {
    btn:    "h-[60px] px-6 gap-3",
    text:   "text-[20px] font-medium leading-auto",
    circle: "w-[44px] h-[44px]",
    icon:   "w-5 h-5",
  },
  md: {
    btn:    "h-[51px] px-5 gap-2.5",
    text:   "text-[18px] font-medium leading-auto",
    circle: "w-[38px] h-[38px]",
    icon:   "w-4 h-4",
  },
  sm: {
    btn:    "h-[31px] px-4 gap-2",
    text:   "text-[14px] font-medium leading-auto",
    circle: "w-[26px] h-[26px]",
    icon:   "w-3 h-3",
  },
};

/* ----------------------------------------------------------
   VARIANT TOKENS
---------------------------------------------------------- */
const variantMap: Record<ButtonVariant, {
  base:       string;
  hover:      string;
  disabled:   string;
  circle:     string;       // icon circle bg
  circleHov:  string;
  circleDisabled: string;
}> = {
  /* ---- PRIMARY: solid red fill ---- */
  primary: {
    base:     "bg-[#EF5B5B] text-white border border-[#EF5B5B]",
    hover:    "hover:bg-[#CD424E] hover:border-[#CD424E] hover:shadow-[0_4px_30px_-6px_rgba(239,91,91,0.75)]",
    disabled: "disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-400 disabled:shadow-none disabled:cursor-not-allowed",
    circle:        "bg-white text-[#EF5B5B]",
    circleHov:     "group-hover:bg-white group-hover:text-[#CD424E]",
    circleDisabled:"group-disabled:bg-neutral-200 group-disabled:text-neutral-400",
  },

  /* ---- SECONDARY: outlined red ---- */
  secondary: {
    base:     "bg-white text-[#EF5B5B] border border-neutral-200",
    hover:    "hover:border-[#EF5B5B] hover:shadow-[0_8px_20px_6px_rgba(239,91,91,0.08)]",
    disabled: "disabled:bg-white disabled:border-neutral-200 disabled:text-neutral-300 disabled:shadow-none disabled:cursor-not-allowed",
    circle:        "bg-[#EF5B5B] text-white",
    circleHov:     "group-hover:bg-[#CD424E]",
    circleDisabled:"group-disabled:bg-neutral-200 group-disabled:text-neutral-400",
  },

  /* ---- TERTIARY: no border, ghost fill ---- */
  tertiary: {
    base:     "bg-white text-[#EF5B5B] border border-transparent",
    hover:    "hover:shadow-[0_8px_20px_6px_rgba(0,0,0,0.05)] hover:border-neutral-100",
    disabled: "disabled:bg-white disabled:text-neutral-300 disabled:shadow-none disabled:cursor-not-allowed",
    circle:        "bg-[#EF5B5B] text-white",
    circleHov:     "group-hover:bg-[#CD424E]",
    circleDisabled:"group-disabled:bg-neutral-200 group-disabled:text-neutral-400",
  },
};

/* Arrow icon SVG */
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Chevron icon SVG */
const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ============================================================
   BUTTON COMPONENT
   ============================================================ */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size    = "md",
      special = false,
      ghost   = false,
      trailingIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const s = sizeMap[size];
    const v = variantMap[variant];

    /* ---- GHOST: icon-only circle ---- */
    if (ghost) {
      return (
        <button
          ref={ref}
          disabled={disabled}
          className={cn(
            "group inline-flex items-center justify-center rounded-full transition-all duration-200 font-heading",
            s.circle,
            variant === "primary"
              ? cn("bg-[#EF5B5B] text-white border border-[#EF5B5B]",
                   "hover:bg-[#CD424E] hover:border-[#CD424E] hover:shadow-[0_4px_30px_-6px_rgba(239,91,91,0.75)]",
                   "disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-400 disabled:cursor-not-allowed")
              : cn("bg-white text-[#EF5B5B] border",
                   variant === "secondary" ? "border-neutral-200 hover:border-[#EF5B5B] hover:shadow-[0_8px_20px_6px_rgba(239,91,91,0.08)]"
                                           : "border-transparent hover:shadow-[0_8px_20px_6px_rgba(0,0,0,0.05)]",
                   "disabled:text-neutral-300 disabled:border-neutral-200 disabled:cursor-not-allowed"),
            className
          )}
          {...props}
        >
          <ArrowRight className={s.icon} />
        </button>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "group inline-flex items-center justify-center rounded-[61px] font-heading transition-all duration-200 whitespace-nowrap select-none",
          s.btn,
          s.text,
          v.base,
          v.hover,
          v.disabled,
          className
        )}
        {...props}
      >
        {/* Special: icon circle on left */}
        {special && (
          <span className={cn(
            "inline-flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-200",
            s.circle,
            v.circle,
            v.circleHov,
            v.circleDisabled,
          )}>
            <ArrowRight className={s.icon} />
          </span>
        )}

        {/* Label */}
        {children && <span>{children}</span>}

        {/* Trailing: chevron icon (With Icon column) */}
        {trailingIcon && (
          <span className="inline-flex items-center">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

/* ============================================================
   CONVENIENCE EXPORTS — pre-configured chevron trailing icon
   ============================================================ */
export const ButtonWithIcon = forwardRef<HTMLButtonElement, Omit<ButtonProps, "trailingIcon">>(
  (props, ref) => (
    <Button
      ref={ref}
      trailingIcon={<ChevronDown className={sizeMap[props.size ?? "md"].icon} />}
      {...props}
    />
  )
);
ButtonWithIcon.displayName = "ButtonWithIcon";

export default Button;