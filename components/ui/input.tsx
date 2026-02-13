"use client";

import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`h-11 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm outline-none shadow-sm backdrop-blur focus:ring-2 focus:ring-emerald-200 ${className}`}
      {...props}
    />
  );
}

export default Input;
