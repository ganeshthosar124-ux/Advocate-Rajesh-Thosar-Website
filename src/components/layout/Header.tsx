"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, site, telHref } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Solid, compact header once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock page scroll, make the page behind inert (so keyboard focus
  // cannot reach it), close on Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const behind = document.querySelectorAll<HTMLElement>("main, footer, [data-quick-contact], [data-skip-link]");
    behind.forEach((el) => (el.inert = true));
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    desktop.addEventListener("change", onResize);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      behind.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const solid = scrolled || open;
  const desktopLinks = navLinks.filter((l) => l.href !== "/contact");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? "border-b border-white/10 bg-ink-900/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container
          className={`flex items-center justify-between gap-6 transition-[height] duration-500 ${solid ? "h-18" : "h-20 lg:h-24"}`}
        >
          <Logo tone="light" />
  
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {desktopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className="relative py-2 text-[0.9rem] font-medium tracking-wide text-ivory/80 transition-colors hover:text-ivory aria-[current=page]:text-ivory after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brass after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
  
          <div className="hidden items-center gap-5 lg:flex">
            <a href={telHref} className="flex items-center gap-2 text-sm font-medium text-ivory/80 hover:text-ivory">
              <PhoneIcon className="size-4 text-brass" />
              {site.contact.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="group relative inline-flex min-h-11 items-center overflow-hidden rounded-full border border-brass/70 px-6 text-sm font-semibold text-ivory transition-colors hover:text-ink-900"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-0 origin-left scale-x-0 bg-brass transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="relative">Contact</span>
            </Link>
          </div>
  
          <button
            ref={toggleRef}
            type="button"
            className="relative inline-flex size-11 items-center justify-center text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-px w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </Container>
      </header>

      {/* Rendered outside <header>: the header's backdrop-filter would otherwise
          become the containing block for this fixed-position overlay. */}
      <nav
        ref={menuRef}
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="stage grain fixed inset-x-0 bottom-0 top-18 z-[45] overflow-y-auto lg:hidden"
      >
        <Container className="relative z-10 flex min-h-full flex-col justify-between py-10">
          <ul>
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="border-b border-white/10 motion-safe:animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className="flex min-h-16 items-center justify-between font-serif text-4xl text-ivory aria-[current=page]:text-brass-light"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-xl text-brass">
                    0{i + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-2 text-sm text-ivory/75">
            <p className="eyebrow">Office</p>
            <p>
              {site.office.line1}, {site.office.line2}, {site.office.city} – {site.office.pincode}
            </p>
            <p>
              <a href={telHref} className="inline-block py-1 text-ivory">
                {site.contact.phoneDisplay}
              </a>
            </p>
          </div>
        </Container>
      </nav>
    </>
  );
}
