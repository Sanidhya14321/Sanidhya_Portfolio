"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  return (
    <span
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ "--shine-speed": `${speed}s` } as React.CSSProperties}
    >
      {text}
    </span>
  );
}
