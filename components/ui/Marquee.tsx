"use client";



interface MarqueeProps {
  items: string[];
  speed?: number; // seconds for one full loop
  reverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Marquee({
  items,
  speed = 30,
  reverse = false,
  className = "",
  style = {},
}: MarqueeProps) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className={`marquee-track ${className}`}
      aria-hidden="true"
      style={style}
    >
      <div
        className={`marquee-inner ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              paddingRight: "0.5em",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
