import Image from "next/image";
import portrait from "../../../public/images/rajesh-thosar-portrait.jpg";
import { site } from "@/lib/site";

/** Portrait in the arched frame used across the site. */
export function Portrait({ preload = false, className = "" }: { preload?: boolean; className?: string }) {
  return (
    <figure className={`relative ${className}`}>
      <div aria-hidden="true" className="arch absolute -inset-3 border border-brass/60 sm:-inset-4" />
      <div className="arch studio relative aspect-[4/5] overflow-hidden shadow-[0_40px_80px_-40px_rgba(11,26,48,0.6)]">
        <Image
          src={portrait}
          alt={`Portrait of ${site.name}, Advocate`}
          placeholder="blur"
          preload={preload}
          fetchPriority={preload ? "high" : undefined}
          sizes="(min-width: 1024px) 384px, 90vw"
          className="size-full object-cover object-top"
        />
      </div>
    </figure>
  );
}
