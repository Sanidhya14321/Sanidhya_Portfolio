import { ImageResponse } from "next/og";

export const alt = "Sanidhya Vats — Full Stack Developer & ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", background: "#E8E4DC", color: "#1A1A1A", padding: 64, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>DELHI, INDIA <span>SANIDHYAVATS.ME</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 900, letterSpacing: -5, lineHeight: 1 }}>SANIDHYA VATS<span style={{ fontSize: 36, letterSpacing: 0, marginTop: 24 }}>FULL STACK DEVELOPER & ML ENGINEER</span></div>
      <div style={{ fontSize: 24, borderTop: "2px solid #2C1A0E", paddingTop: 24 }}>AGENTIC AI · SCALABLE SYSTEMS · COMMUNITY LEADERSHIP</div>
    </div>, size,
  );
}
