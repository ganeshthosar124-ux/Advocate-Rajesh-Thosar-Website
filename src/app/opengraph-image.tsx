import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.fullName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#14213d",
          color: "#faf7f0",
          fontFamily: "Georgia, serif",
          border: "16px solid #b08d57",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#d9bd8c", textTransform: "uppercase" }}>Advocate</div>
        <div style={{ fontSize: 96, marginTop: 20 }}>Rajesh Thosar</div>
        <div style={{ width: 120, height: 4, background: "#b08d57", marginTop: 32 }} />
        <div style={{ fontSize: 32, marginTop: 32, color: "rgba(250,247,240,0.85)" }}>{site.shortDescription}</div>
      </div>
    ),
    size,
  );
}
