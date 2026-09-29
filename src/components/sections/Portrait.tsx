import Image from "next/image";
import portrait from "../../../public/images/rajesh-thosar-portrait.jpg";
import { site } from "@/lib/site";

export function Portrait({ priority = false, className = "" }: { priority?: boolean; className?: string }) {
  return (
    <figure className={`relative ${className}`}>
      {/* Offset brass frame behind the photograph */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 border border-brass sm:translate-x-4 sm:translate-y-4" />
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        <Image
          src={portrait}
          alt={`Portrait of ${site.name}`}
          placeholder="blur"
          priority={priority}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 90vw"
          className="size-full object-cover object-top"
        />
      </div>
    </figure>
  );
}
