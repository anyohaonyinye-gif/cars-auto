import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Cars Auto, cars for sale in Accra";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#111318",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white",
        }}
      >
        <div style={{ color: "#C5A15B", fontSize: 24, letterSpacing: 4 }}>CARS AUTO</div>
        <div style={{ fontSize: 68, fontWeight: 600, marginTop: 24, lineHeight: 1.05, maxWidth: 900 }}>
          Find the car that moves you.
        </div>
        <div style={{ fontSize: 28, marginTop: 28, color: "#d5d7dc" }}>
          Brand-new and fairly used vehicles in Accra, Ghana.
        </div>
      </div>
    ),
    size,
  );
}
