import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: "Adv. R. A. Thosar",
    start_url: "/",
    display: "browser",
    background_color: "#faf7f0",
    theme_color: "#14213d",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
